# RAG based Document Question Answering System

A simple Retrieval-Augmented Generation (RAG) pipeline that retrieves relevant
information from a document and uses an LLM to answer questions about it.

## Files
- `RAG_Document_QA.ipynb` – main notebook (run this in Google Colab)
- `sample_doc.txt` – sample document used for testing
- `requirements.txt` – dependencies

## How to run
1. Open `RAG_Document_QA.ipynb` in Google Colab
2. Upload `sample_doc.txt` (or your own PDF/TXT file) to the Colab session
3. Run all cells in order

## Pipeline
Document → Chunking → Embeddings (all-MiniLM-L6-v2) → FAISS vector store →
Retriever (top-3) → LLM (flan-t5-base) → Answer

## Tech used
LangChain, FAISS, HuggingFace Transformers, Sentence-Transformers
