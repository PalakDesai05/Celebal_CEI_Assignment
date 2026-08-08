import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';

export default function SubmitExpense({ setExpenses }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !category || !file) {
      alert("All fields required");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount,
      category,
      fileName: file.name,
      status: "Pending",
      date: new Date().toLocaleDateString()
    };

    setExpenses((prev) => [newExpense, ...prev]);

    setSuccessMsg("Expense submitted");
    alert("Expense submitted");

    // Reset
    setTitle("");
    setAmount("");
    setCategory("");
    setFile(null);

    // clear success message after delay
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Submit New Expense</h1>
          <p className="text-sm text-slate-500">Attach receipts mapping explicitly into standard pipeline logic natively.</p>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 transition-all">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Expense Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Client Dinner"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="" disabled>Select a category</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Office">Office</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Upload Receipt</label>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors relative cursor-pointer">
            <input 
              type="file" 
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <UploadCloud className="w-10 h-10 text-slate-400 mb-3" />
            <p className="text-sm text-slate-600 font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG or PDF</p>
          </div>
        </div>

        {file && (
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-sm font-medium text-slate-700 truncate">Selected File: {file.name}</p>
            </div>
            
            {file.type.startsWith("image/") && (
              <div className="mt-3 relative rounded-lg overflow-hidden border border-slate-200 bg-white inline-block">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="Receipt Preview" 
                  className="max-h-48 w-auto object-contain p-2"
                />
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-slate-100">
          <button type="submit" className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-center">
            Submit Expense
          </button>
        </div>
      </form>
    </div>
  );
}
