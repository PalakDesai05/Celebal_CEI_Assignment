# Celebal Technologies — CEI Internship Assignments

This repository contains my weekly assignments and side projects completed during my internship at **Celebal Technologies**, covering machine learning, deep learning, and agentic AI system design.

**Author:** Palak Desai
**Program:** B.Tech Information Technology, Sanjivani College of Engineering, Kopargaon
**Internship:** Celebal Technologies (CEI)

---

## Repository Structure

```
├── Celebal_CEI_Assignment/     # Main internship assignment folder
├── GPT-PROJECT/                 # Mini GPT-2 style language model built from scratch
├── Country-data.csv             # Dataset for country socioeconomic clustering/classification
├── Project                      # nanoGPT-based project
├── README.md                    # This file
├── week1_PalakDesai.ipynb
├── week2_PalakDesai.ipynb
├── Week3_PalakDesai.ipynb
├── week4_PalakDesai.ipynb
├── week5_PalakDesai.ipynb
├── week6_PalakDesai.ipynb       # Denoising Autoencoder on MNIST
├── week7_PalakDesai.ipynb       # RAG-based Document Q&A system
├── app.ipynb                    # Companion app notebook for week 7
├── requirements.txt             # Dependencies for the RAG pipeline (week 7)
├── sample_doc.txt               # Sample document used to test the RAG pipeline
└── week8_PalakDesai.ipynb       # Agentic AI pipeline (single-agent system)
```

---

## Weekly Assignments

| Week | Notebook | Topic |
|------|----------|-------|
| 1 | `week1_PalakDesai.ipynb` | Foundational exercises — Python, Linear Algebra, Statistics & Probability |
| 2 | `week2_PalakDesai.ipynb` | End-to-end ML pipeline on sales/price data |
| 3 | `Week3_PalakDesai.ipynb` | Customer Intelligence System — classification, ensemble methods & clustering (uses `Country-data.csv`) |
| 4 | `week4_PalakDesai.ipynb` | Image classification model on CIFAR-10 |
| 5 | `week5_PalakDesai.ipynb` | Text generation using RNN/LSTM |
| 6 | `week6_PalakDesai.ipynb` | Denoising Autoencoder trained on MNIST — learns to reconstruct clean images from noisy input |
| 7 | `week7_PalakDesai.ipynb`, `app.ipynb` | RAG-based Document Question Answering system — LangChain + FAISS + HuggingFace (`all-MiniLM-L6-v2` embeddings, `flan-t5-base` LLM) |
| 8 | `week8_PalakDesai.ipynb` | Agentic AI pipeline — single-agent system with conditional routing (calculator, keyword extractor, word counter tools), retry logic, logging, and JSON-structured output |

---

## Side Projects

### GPT-PROJECT
A mini GPT-2 style language model built from scratch (inspired by Andrej Karpathy's "Let's build GPT"), trained on Google Colab (T4 GPU), with a FastAPI backend and a browser-based playground frontend for interacting with the trained model.

### Project (nanoGPT)
A nanoGPT-based implementation — _add a short description of what this specific project does or how it differs from GPT-PROJECT._

---

## Tech Stack

- **Languages:** Python, JavaScript
- **ML/DL:** PyTorch/TensorFlow, scikit-learn, XGBoost
- **GenAI/NLP:** LangChain, FAISS, HuggingFace Transformers, Sentence-Transformers
- **Backend:** FastAPI
- **Environment:** Google Colab (T4 GPU)

---

## How to Run

Each week's notebook is self-contained. To run any of them:

1. Open the notebook in [Google Colab](https://colab.research.google.com/)
2. Run all cells in order
3. For week 7 (RAG pipeline), also upload `sample_doc.txt` and install dependencies from `requirements.txt`
4. For `GPT-PROJECT`, see its own folder for backend/frontend setup instructions

---


