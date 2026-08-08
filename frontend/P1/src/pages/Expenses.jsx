import React, { useState } from 'react';
import Table from '../components/Table';
import { Eye, Filter } from 'lucide-react';

export default function Expenses() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      amount: 2000,
      category: "Travel",
      status: "pending",
      receipt: "https://via.placeholder.com/400x500?text=Rahul+Travel+Receipt"
    },
    {
      id: 2,
      name: "Priya Mehta",
      amount: 5000,
      category: "Food",
      status: "approved",
      receipt: "https://via.placeholder.com/400x500?text=Priya+Food+Receipt"
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('all'); 
  const [viewReceiptUrl, setViewReceiptUrl] = useState(null);

  // Directly derive filtered states dynamically from primary array
  const filteredExpenses = expenses.filter(exp => 
    activeTab === 'all' ? true : exp.status === activeTab
  );

  const columns = [
    { title: 'Expense ID' },
    { title: 'Employee' },
    { title: 'Amount' },
    { title: 'Category' },
    { title: 'Status' },
    { title: 'Receipt', className: 'text-center' }
  ];

  const renderRow = (exp) => {
    let statusColor = "bg-yellow-100 text-yellow-800";
    if (exp.status === 'approved') statusColor = "bg-emerald-100 text-emerald-800";
    if (exp.status === 'rejected') statusColor = "bg-red-100 text-red-800";

    return (
      <React.Fragment>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">EXP-{exp.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{exp.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">${exp.amount.toFixed(2)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{exp.category}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${statusColor}`}>
            {exp.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <button 
            onClick={() => setViewReceiptUrl(exp.receipt)}
            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-1.5 rounded-lg transition-colors inline-block"
            title="View Receipt"
          >
            <Eye className="w-5 h-5" />
          </button>
        </td>
      </React.Fragment>
    );
  };

  const tabs = ['all', 'pending', 'approved', 'rejected'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Expense Monitoring</h1>
          <p className="mt-1 text-sm text-slate-500">Track and view local simulated expense submissions.</p>
        </div>

        <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all capitalize ${
                activeTab === tab 
                  ? 'bg-slate-100 text-slate-800 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center gap-2 text-slate-700 font-medium">
          <Filter className="w-5 h-5 text-slate-400" /> Filtered View: <span className="capitalize">{activeTab}</span>
        </div>
        
        {filteredExpenses.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No expenses found matching "{activeTab}".</div>
        ) : (
          <Table columns={columns} data={filteredExpenses} keyExtractor={e => e.id} renderRow={renderRow} />
        )}
      </div>

      {/* RECEIPT MODAL */}
      {viewReceiptUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4" onClick={() => setViewReceiptUrl(null)}>
          <div className="bg-white p-2 rounded-xl shadow-2xl max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 mb-2">
              <h3 className="font-bold text-slate-800 text-lg">Expense Receipt Snapshot</h3>
              <button onClick={() => setViewReceiptUrl(null)} className="text-slate-400 hover:text-slate-700 transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="px-4 pb-4">
              <img src={viewReceiptUrl} alt="Receipt" className="w-full h-auto rounded-lg border border-slate-200 object-contain max-h-[60vh]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
