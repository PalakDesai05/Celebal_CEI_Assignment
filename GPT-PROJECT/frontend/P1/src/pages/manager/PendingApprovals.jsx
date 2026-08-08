import React, { useState } from 'react';
import Table from '../../components/Table';
import { X, Check } from 'lucide-react';

export default function PendingApprovals() {
  const [approvals, setApprovals] = useState([
    { id: 1, name: 'Alice Smith', amount: 150.00, category: 'Meals', date: '2023-11-20' },
    { id: 2, name: 'Charlie Brown', amount: 1200.00, category: 'Travel', date: '2023-11-19' },
  ]);
  const [activeModal, setActiveModal] = useState(null); // { type: 'Approve'|'Reject', item }
  const [comment, setComment] = useState('');

  const handleAction = (type, item) => {
    setActiveModal({ type, item });
  };

  const submitAction = () => {
    setApprovals(approvals.filter(a => a.id !== activeModal.item.id));
    setActiveModal(null);
    setComment('');
  };

  const columns = [
    { title: 'Employee Name' },
    { title: 'Date' },
    { title: 'Category' },
    { title: 'Amount' },
    { title: 'Actions', className: 'text-right' },
  ];

  const renderRow = (item) => (
    <React.Fragment>
      <td className="px-6 py-4 text-sm font-medium text-slate-800">{item.name}</td>
      <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
      <td className="px-6 py-4 text-sm text-slate-500">{item.category}</td>
      <td className="px-6 py-4 text-sm font-semibold text-slate-800">${item.amount.toFixed(2)}</td>
      <td className="px-6 py-4 text-right space-x-2">
        <button 
          onClick={() => handleAction('Approve', item)}
          className="px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-medium text-xs rounded-lg transition"
        >
          Approve
        </button>
        <button 
          onClick={() => handleAction('Reject', item)}
          className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 font-medium text-xs rounded-lg transition"
        >
          Reject
        </button>
      </td>
    </React.Fragment>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Pending Approvals</h1>
      <p className="text-sm text-slate-500">Expenses awaiting your managerial review.</p>

      {approvals.length > 0 ? (
        <Table columns={columns} data={approvals} keyExtractor={(i) => i.id} renderRow={renderRow} />
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-200">
          <Check className="w-12 h-12 mx-auto text-emerald-500 mb-3" />
          <h3 className="text-lg font-bold text-slate-800">All caught up!</h3>
          <p className="text-slate-500 mt-1">There are no pending expenses to review.</p>
        </div>
      )}

      {/* Modal View */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                {activeModal.type} Expense
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                You are about to {activeModal.type.toLowerCase()} <strong>{activeModal.item.name}</strong>'s expense of ${activeModal.item.amount.toFixed(2)}.
              </p>
              
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Add an optional comment
              </label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3" 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Reason for action..."
              ></textarea>
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setActiveModal(null)} 
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={submitAction} 
                className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition ${
                  activeModal.type === 'Approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm {activeModal.type}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
