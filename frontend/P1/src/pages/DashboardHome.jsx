import React, { useState } from 'react';
import { Users, Receipt, CircleDollarSign } from 'lucide-react';

export default function DashboardHome() {
  // Hardcoded dummy metrics ensuring dashboard looks active without API
  const [metrics] = useState({
    totalEmployees: 12,
    totalExpenses: 7000,
    pendingRequests: 5
  });

  const cards = [
    { title: 'Total Employees', value: metrics.totalEmployees, bg: 'bg-blue-500', icon: Users },
    { title: 'Total Expenses', value: `$${metrics.totalExpenses}`, bg: 'bg-indigo-500', icon: CircleDollarSign },
    { title: 'Pending Requests', value: metrics.pendingRequests, bg: 'bg-orange-500', icon: Receipt },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className={`${card.bg} text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
            <div className="relative z-10">
              <p className="text-white/80 font-medium pb-2 text-sm uppercase tracking-wide">{card.title}</p>
              <p className="text-4xl font-bold">{card.value}</p>
            </div>
            <card.icon className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 group-hover:scale-110 transition-transform" />
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">System Alerts</h3>
        <p className="text-slate-500 text-sm">Offline Mock Data instantiated successfully. You are viewing simulated metrics.</p>
      </div>
    </div>
  );
}
