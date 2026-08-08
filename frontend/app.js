

const examples = [
  "ROMEO:",
  "To be, or not to be,",
  "First Citizen:"
];

const chatWindow = document.getElementById('chatWindow');
const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const examplePrompts = document.getElementById('examplePrompts');
const modelSelect = document.getElementById('modelSelect');

// Renders the clickable example-prompt chips in the sidebar.
function renderExamples() {
  examplePrompts.innerHTML = examples
    .map((example) => `<button class="chip" data-example="${example}">${example}</button>`)
    .join('');

  examplePrompts.querySelectorAll('.chip').forEach((button) => {
    button.addEventListener('click', () => {
      promptInput.value = button.dataset.example;
      promptInput.focus();
    });
  });
}

function appendMessage(text, role = 'assistant') {
  const message = document.createElement('div');
  message.className = `message ${role}`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function setLoadingState(isLoading) {
  generateBtn.disabled = isLoading;
  generateBtn.textContent = isLoading ? 'Generating...' : 'Generate';
}


function createOfflineNotice() {
  return '[offline demo mode - backend unavailable. Start server.py and reload.]';
}

async function generateReply(prompt, mode, modelKey) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, mode, model: modelKey }),
    });
    if (!response.ok) throw new Error('Backend unavailable');
    const data = await response.json();
    return data.reply || data.message || 'No reply returned.';
  } catch (error) {
    return createOfflineNotice();
  }
}

async function handleGenerate() {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    promptInput.focus();
    return;
  }
  appendMessage(prompt, 'user');
  promptInput.value = '';
  setLoadingState(true);
  const mode = modeSelect.value;
  const modelKey = modelSelect.value;
  const reply = await generateReply(prompt, mode, modelKey);
  appendMessage(reply, 'assistant');
  setLoadingState(false);
}

function clearChat() {
  chatWindow.innerHTML = '';
  appendMessage('Give me an opening line and I\u2019ll continue it in the style I learned from Shakespeare.', 'assistant');
}

async function loadModelInfo(modelKey) {
  try {
    const url = modelKey ? `/api/info?model=${encodeURIComponent(modelKey)}` : '/api/info';
    const res = await fetch(url);
    if (!res.ok) return;
    const info = await res.json();

    // Populate dropdown once, on first load
    if (modelSelect.options.length === 0 && Array.isArray(info.models)) {
      modelSelect.innerHTML = info.models
        .map((m) => `<option value="${m.key}">${m.label}</option>`)
        .join('');
      modelSelect.value = info.default;
    }

    const c = info.current;
    if (c) {
      document.getElementById('statArch').textContent = c.architecture ?? '—';
      document.getElementById('statParams').textContent = c.params ?? '—';
      document.getElementById('statTokenizer').textContent = c.tokenizer ?? '—';
      document.getElementById('statData').textContent = c.dataset ?? '—';
    }
  } catch (e) {
    // backend not running yet - ignore
  }
}
modelSelect.addEventListener('change', () => loadModelInfo(modelSelect.value));
generateBtn.addEventListener('click', handleGenerate);
clearBtn.addEventListener('click', clearChat);
promptInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleGenerate();
  }
});

renderExamples();
clearChat();
loadModelInfo();