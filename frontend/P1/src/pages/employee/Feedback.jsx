import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

export default function Feedback({ feedbacks, setFeedbacks }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleFeedback = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter feedback");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name: name.trim() ? name : "Anonymous",
      message,
      date: new Date().toLocaleString()
    };

    setFeedbacks((prev) => [newFeedback, ...prev]);

    alert("Feedback submitted");
    setMessage("");
    setName("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Review & Feedback</h1>
          <p className="text-sm text-slate-500">Provide direct communication logged locally to your state machine.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Form Container */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-800 mb-4">Submit Feedback</h3>
           <form onSubmit={handleFeedback} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name (Optional)</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="Anonymous" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Feedback Message</label>
                <textarea 
                  required
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32" 
                  placeholder="What's on your mind?" 
                />
              </div>
              <button type="submit" className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                 <Send className="w-4 h-4" /> Send Feedback
              </button>
           </form>
        </div>

        {/* List Container */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-[500px] overflow-y-auto">
           <h3 className="text-lg font-bold text-slate-800 mb-4">Past Feedbacks ({feedbacks.length})</h3>
           
           {feedbacks.length === 0 ? (
             <div className="text-slate-400 text-sm italic text-center py-12">No feedbacks recorded in active state.</div>
           ) : (
             <div className="space-y-4">
               {feedbacks.map((fb) => (
                 <div key={fb.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                   <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-700 text-sm">{fb.name}</span>
                      <small className="text-xs text-slate-400 font-medium">{fb.date}</small>
                   </div>
                   <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{fb.message}</p>
                 </div>
               ))}
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
