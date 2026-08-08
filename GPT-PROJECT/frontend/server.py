
import os
import pickle
import json
from contextlib import nullcontext
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

import torch

# Paths - adjust if your Drive layout differs

FRONTEND_ROOT = os.path.dirname(os.path.abspath(__file__))
PALAKGPT_ROOT = os.path.dirname(FRONTEND_ROOT)          
NANOGPT_DIR = os.path.join(PALAKGPT_ROOT, "nanoGPT")     
OUT_DIR = os.path.join(NANOGPT_DIR, "out-shakespeare-char")
CKPT_PATH = os.path.join(OUT_DIR, "ckpt.pt")

# Make nanoGPT's model.py importable
import sys
sys.path.insert(0, NANOGPT_DIR)
from model import GPTConfig, GPT  # noqa: E402  (nanoGPT's model definitions)

# Generation settings - tweak as you like, or wire these to the request body

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
DTYPE = "bfloat16" if (DEVICE == "cuda" and torch.cuda.is_bf16_supported()) else "float16" if DEVICE == "cuda" else "float32"
SEED = 1337

MAX_NEW_TOKENS = 300
TEMPERATURE = 0.8
TOP_K = 200

torch.manual_seed(SEED)
if DEVICE == "cuda":
    torch.cuda.manual_seed(SEED)

device_type = "cuda" if "cuda" in DEVICE else "cpu"
ptdtype = {"float32": torch.float32, "bfloat16": torch.bfloat16, "float16": torch.float16}[DTYPE]
ctx = nullcontext() if device_type == "cpu" else torch.amp.autocast(device_type=device_type, dtype=ptdtype)



# Load model + tokenizer once at startup, for every available checkpoint

MODEL_REGISTRY = {
    "shakespeare": {
        "label": "Shakespeare (English)",
        "out_dir": os.path.join(NANOGPT_DIR, "out-shakespeare-char"),
    },
    "hindi": {
        "label": "Multilingual (Hindi/JP/FR demo)",
        "out_dir": os.path.join(NANOGPT_DIR, "out-hindi-char"),
    },
}

def load_model(ckpt_path):
    print(f"Loading checkpoint from {ckpt_path} ...")
    checkpoint = torch.load(ckpt_path, map_location=DEVICE)

    gptconf = GPTConfig(**checkpoint["model_args"])
    model = GPT(gptconf)

    state_dict = checkpoint["model"]
    unwanted_prefix = "_orig_mod."
    for k, v in list(state_dict.items()):
        if k.startswith(unwanted_prefix):
            state_dict[k[len(unwanted_prefix):]] = state_dict.pop(k)
    model.load_state_dict(state_dict)

    model.eval()
    model.to(DEVICE)
    print("Model loaded.")
    return model, checkpoint


def load_tokenizer(checkpoint):
    """Prefer the char-level meta.pkl used during training; fall back to GPT-2 BPE."""
    meta_path = None
    if "config" in checkpoint and "dataset" in checkpoint["config"]:
        candidate = os.path.join(NANOGPT_DIR, "data", checkpoint["config"]["dataset"], "meta.pkl")
        if os.path.exists(candidate):
            meta_path = candidate

    if meta_path:
        print(f"Using char-level tokenizer from {meta_path}")
        with open(meta_path, "rb") as f:
            meta = pickle.load(f)
        stoi, itos = meta["stoi"], meta["itos"]

        def encode(s):
            return [stoi[c] for c in s if c in stoi]

        def decode(tokens):
            return "".join(itos[t] for t in tokens)

        return encode, decode

    print("meta.pkl not found — falling back to GPT-2 BPE tokenizer (tiktoken)")
    import tiktoken
    enc = tiktoken.get_encoding("gpt2")
    encode = lambda s: enc.encode(s, allowed_special={"<|endoftext|>"})
    decode = lambda tokens: enc.decode(tokens)
    return encode, decode


LOADED = {}
for key, info in MODEL_REGISTRY.items():
    ckpt_path = os.path.join(info["out_dir"], "ckpt.pt")
    if not os.path.exists(ckpt_path):
        print(f"Skipping '{key}': no checkpoint at {ckpt_path}")
        continue
    model, checkpoint = load_model(ckpt_path)
    encode, decode = load_tokenizer(checkpoint)
    LOADED[key] = {"model": model, "checkpoint": checkpoint, "encode": encode, "decode": decode}

DEFAULT_MODEL_KEY = next(iter(LOADED)) if LOADED else None


def generate_reply(prompt: str, mode: str = "creative", model_key: str = None) -> str:
    if not prompt.strip():
        return "Please enter a prompt."

    model_key = model_key if model_key in LOADED else DEFAULT_MODEL_KEY
    if model_key is None:
        return "No model loaded on the server."

    entry = LOADED[model_key]
    MODEL, ENCODE, DECODE = entry["model"], entry["encode"], entry["decode"]

    mode_params = {
        "creative": dict(temperature=1.0, top_k=200),
        "concise": dict(temperature=0.5, top_k=50),
        "technical": dict(temperature=0.7, top_k=100),
    }
    params = mode_params.get(mode, mode_params["creative"])

    ids = ENCODE(prompt)
    if not ids:
        return "Couldn't encode that prompt with the model's tokenizer — try different text."

    x = torch.tensor(ids, dtype=torch.long, device=DEVICE)[None, ...]

    with torch.no_grad():
        with ctx:
            y = MODEL.generate(
                x,
                MAX_NEW_TOKENS,
                temperature=params["temperature"],
                top_k=params["top_k"],
            )

    full_text = DECODE(y[0].tolist())
    completion = full_text[len(prompt):] if full_text.startswith(prompt) else full_text
    return completion.strip() or full_text.strip()


# HTTP server

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FRONTEND_ROOT, **kwargs)

    def do_GET(self):
        if self.path.startswith("/api/info"):
            from urllib.parse import urlparse, parse_qs
            qs = parse_qs(urlparse(self.path).query)
            requested = qs.get("model", [DEFAULT_MODEL_KEY])[0]
            model_key = requested if requested in LOADED else DEFAULT_MODEL_KEY

            entry = LOADED.get(model_key)
            if entry is None:
                info = {"models": [], "default": None, "current": None}
            else:
                model_args = entry["checkpoint"].get("model_args", {})
                dataset_name = entry["checkpoint"].get("config", {}).get("dataset", model_key)
                n_params = sum(p.numel() for p in entry["model"].parameters())
                info = {
                    "models": [{"key": k, "label": MODEL_REGISTRY[k]["label"]} for k in LOADED],
                    "default": DEFAULT_MODEL_KEY,
                    "current": {
                        "key": model_key,
                        "architecture": f"{model_args.get('n_layer', '?')} layers . "
                                         f"{model_args.get('n_head', '?')} heads . "
                                         f"{model_args.get('n_embd', '?')} dim",
                        "params": f"{n_params / 1e6:.2f}M",
                        "tokenizer": "character-level",
                        "dataset": dataset_name.replace("_", " ").title(),
                    },
                }
            body = json.dumps(info).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def do_POST(self):
        if self.path == "/api/generate":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length).decode("utf-8")
            payload = json.loads(body or "{}")
            prompt = payload.get("prompt", "")
            mode = payload.get("mode", "creative")
            model_key = payload.get("model")

            try:
                reply_text = generate_reply(prompt, mode, model_key)
                status = 200
            except Exception as e:
                reply_text = f"Generation error: {e}"
                status = 500

            reply = {"reply": reply_text}
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(reply).encode("utf-8"))
            return
        self.send_error(404)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))
    ThreadingHTTPServer.allow_reuse_address = True
    print(f"Serving frontend at http://localhost:{port}")
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()