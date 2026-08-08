import React from 'react';
import Table from '../../components/Table';
import { History as HistoryIcon } from 'lucide-react';

export default function ApprovalHistory() {
  const history = [
    { id: 1, name: 'Alice Smith', amount: 45.00, decision: 'Approved', date: '2023-11-16', note: 'Within budget.' },
    { id: 2, name: 'David Lee', amount: 320.00, decision: 'Rejected', date: '2023-11-11', note: 'Needs better receipt.' },
    { id: 3, name: 'Charlie Brown', amount: 15.00, decision: 'Approved', date: '2023-11-06', note: 'Auto-approved.' },
  ];

  const columns = [
    { title: 'Employee' },
    { title: 'Decision' },
    { title: 'Amount' },
    { title: 'Date' },
    { title: 'Note' },
  ];

  const renderRow = (item) => (
    <React.Fragment>
      <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.name}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          item.decision === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.decision}
        </span>
      </td>
      <td className="px-6 py-4 text-sm font-semibold text-slate-800">${item.amount.toFixed(2)}</td>
      <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
      <td className="px-6 py-4 text-sm text-slate-500 italic">{item.note}</td>
    </React.Fragment>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 text-blue-800 rounded-lg"><HistoryIcon className="w-6 h-6" /></div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Approval History</h1>
          <p className="text-sm text-slate-500">A log of your past decisions.</p>
        </div>
      </div>

      <Table columns={columns} data={history} keyExtractor={i => i.id} renderRow={renderRow} />
    </div>
  );
}
