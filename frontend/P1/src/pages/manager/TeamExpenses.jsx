import React, { useState } from 'react';
import Table from '../../components/Table';
import { Filter } from 'lucide-react';

const TEAM_EXPENSES = [
  { id: 'E-001', name: 'Alice Smith', amount: 150.00, status: 'Pending', date: '2023-11-20' },
  { id: 'E-002', name: 'Charlie Brown', amount: 1200.00, status: 'Pending', date: '2023-11-19' },
  { id: 'E-003', name: 'Alice Smith', amount: 45.00, status: 'Approved', date: '2023-11-15' },
  { id: 'E-004', name: 'David Lee', amount: 320.00, status: 'Rejected', date: '2023-11-10' },
  { id: 'E-005', name: 'Charlie Brown', amount: 15.00, status: 'Approved', date: '2023-11-05' },
];

export default function TeamExpenses() {
  const [filter, setFilter] = useState('All');

  const filtered = TEAM_EXPENSES.filter(exp => filter === 'All' || exp.status === filter);

  const columns = [
    { title: 'Employee Name' },
    { title: 'Amount' },
    { title: 'Status' },
    { title: 'Date' },
  ];

  const renderRow = (item) => {
    let statusClass = 'bg-yellow-100 text-yellow-800';
    if (item.status === 'Approved') statusClass = 'bg-emerald-100 text-emerald-800';
    if (item.status === 'Rejected') statusClass = 'bg-red-100 text-red-800';

    return (
      <React.Fragment>
        <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.name}</td>
        <td className="px-6 py-4 text-sm font-semibold text-slate-800">${item.amount.toFixed(2)}</td>
        <td className="px-6 py-4">
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusClass}`}>
            {item.status}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
      </React.Fragment>
    );
  };

  const tabs = ['All', 'Pending', 'Approved', 'Rejected'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Team Expenses</h1>
        <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                filter === tab 
                  ? 'bg-slate-100 text-slate-800 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <Table columns={columns} data={filtered} keyExtractor={(i) => i.id} renderRow={renderRow} />
    </div>
  );
}
