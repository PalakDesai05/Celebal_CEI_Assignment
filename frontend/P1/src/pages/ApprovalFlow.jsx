import React, { useState } from 'react';
import { Check, X, ArrowRight, GitMerge } from 'lucide-react';

export default function ApprovalFlow() {
  // Hardcoded Pipeline
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      amount: 2000,
      category: "Travel",
      manager: "Pending",
      finance: "Pending",
      director: "Pending",
      currentStage: "manager" // Tracks active tier: manager -> finance -> director -> approved
    },
    {
      id: 2,
      name: "Arjun Singh",
      amount: 850,
      category: "Office Supplies",
      manager: "Approved",
      finance: "Pending",
      director: "Pending",
      currentStage: "finance"
    }
  ]);

  const STAGES = ['manager', 'finance', 'director'];

  const handleApprove = (id) => {
    setExpenses(prev => prev.map(exp => {
      if (exp.id === id) {
        // Find current stage index
        const idx = STAGES.indexOf(exp.currentStage);
        if (idx === -1) return exp; // Already rejected or fully approved
        
        const stageName = STAGES[idx];
        const updated = { ...exp, [stageName]: "Approved" };
        
        // Progress stage pointer
        if (idx < STAGES.length - 1) {
          updated.currentStage = STAGES[idx + 1];
        } else {
          updated.currentStage = "approved"; // completed pipeline
        }
        
        return updated;
      }
      return exp;
    }));
  };

  const handleReject = (id) => {
    setExpenses(prev => prev.map(exp => {
      if (exp.id === id && STAGES.includes(exp.currentStage)) {
        return { 
          ...exp, 
          [exp.currentStage]: "Rejected", 
          currentStage: "rejected" 
        };
      }
      return exp;
    }));
  };

  const getStageColor = (status) => {
    if (status === 'Approved') return 'bg-emerald-100 text-emerald-800';
    if (status === 'Rejected') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800'; // Pending
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
          <GitMerge className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operational Approval Flow</h1>
          <p className="text-sm text-slate-500">Mutate state locally to progress instances through the simulated pipeline.</p>
        </div>
      </div>

      <div className="space-y-4">
        {expenses.map(exp => (
          <div key={exp.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col lg:flex-row gap-6 justify-between items-center transition-all hover:shadow-md">
            
            {/* Identity Block */}
            <div className="flex-1 w-full border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-slate-800 text-lg">{exp.name}</h3>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-semibold">EXP-{exp.id}</span>
              </div>
              <div className="text-slate-500 text-sm">
                <span className="font-semibold text-slate-700">${exp.amount.toFixed(2)}</span> • {exp.category}
              </div>
            </div>

            {/* Pipeline Visualizer */}
            <div className="flex flex-1 items-center justify-between gap-2 max-w-lg w-full text-xs font-medium">
              <div className={`flex flex-col items-center gap-2 p-3 rounded-lg border flex-1 ${getStageColor(exp.manager)}`}>
                <span className="uppercase tracking-wider opacity-75 text-[10px]">Manager</span>
                <span className="font-bold">{exp.manager}</span>
              </div>
              
              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
              
              <div className={`flex flex-col items-center gap-2 p-3 rounded-lg border flex-1 ${getStageColor(exp.finance)}`}>
                 <span className="uppercase tracking-wider opacity-75 text-[10px]">Finance</span>
                 <span className="font-bold">{exp.finance}</span>
              </div>
              
              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
              
              <div className={`flex flex-col items-center gap-2 p-3 rounded-lg border flex-1 ${getStageColor(exp.director)}`}>
                <span className="uppercase tracking-wider opacity-75 text-[10px]">Director</span>
                <span className="font-bold">{exp.director}</span>
              </div>
            </div>

            {/* Local Action Controls */}
            <div className="flex items-center gap-3 shrink-0">
              {STAGES.includes(exp.currentStage) ? (
                <>
                  <button 
                    onClick={() => handleReject(exp.id)}
                    className="flex justify-center flex-1 items-center px-4 py-2 hover:bg-red-50 text-red-600 rounded-lg text-sm font-semibold transition"
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </button>
                  <button 
                    onClick={() => handleApprove(exp.id)}
                    className="flex justify-center flex-1 items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition shadow-sm"
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </button>
                </>
              ) : (
                <div className="px-6 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-500 capitalize w-full text-center">
                  Pipeline {exp.currentStage}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
