import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../components/Card';

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Manager Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          title="Pending Approvals" 
          value="8" 
          subtitle="4 require urgent review"
          icon={Clock}
          gradientFrom="from-amber-400"
          gradientTo="to-orange-500"
        />
        <Card 
          title="Approved (This Month)" 
          value="$12,450" 
          subtitle="Across 24 reports"
          icon={CheckCircle}
          gradientFrom="from-emerald-500"
          gradientTo="to-emerald-600"
        />
        <Card 
          title="Rejected (This Month)" 
          value="$840" 
          subtitle="Across 3 reports"
          icon={XCircle}
          gradientFrom="from-red-500"
          gradientTo="to-red-600"
        />
      </div>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Team Overview</h3>
        <p className="text-slate-500 text-sm">Your engineering team has submitted 25% fewer expenses this quarter than last year.</p>
      </div>
    </div>
  );
}
