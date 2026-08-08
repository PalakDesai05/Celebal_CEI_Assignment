import React from 'react';
import { Receipt, Clock, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../components/Card';

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">My Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          title="Total Expenses" 
          value="$3,450" 
          subtitle="YTD Total"
          icon={Receipt}
          gradientFrom="from-blue-500"
          gradientTo="to-blue-600"
        />
        <Card 
          title="Pending" 
          value="$450" 
          subtitle="2 reports waiting"
          icon={Clock}
          gradientFrom="from-amber-400"
          gradientTo="to-orange-500"
        />
        <Card 
          title="Approved" 
          value="$2,800" 
          subtitle="Processed & Paid"
          icon={CheckCircle}
          gradientFrom="from-emerald-500"
          gradientTo="to-emerald-600"
        />
        <Card 
          title="Rejected" 
          value="$200" 
          subtitle="Requires revision"
          icon={XCircle}
          gradientFrom="from-red-500"
          gradientTo="to-red-600"
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Updates</h3>
        <p className="text-slate-500 text-sm">Your expense report "Client Dinner NYC" was approved by your manager today.</p>
      </div>
    </div>
  );
}
