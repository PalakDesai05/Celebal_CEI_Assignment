import React from 'react';
import { Database } from 'lucide-react';

export default function MyExpenses({ expenses }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Expenses</h1>
          <p className="text-sm text-slate-500">Locally scoped simulation tracking your submitted receipts.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {(!expenses || expenses.length === 0) ? (
          <div className="py-12 flex flex-col items-center text-center text-slate-500">
            <Database className="w-12 h-12 text-slate-300 mb-2" />
            <p>No expenses submitted recently.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">File Name</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{exp.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{exp.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">${parseFloat(exp.amount).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{exp.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${exp.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'}`}>
                         {exp.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 truncate max-w-[200px]">{exp.fileName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
