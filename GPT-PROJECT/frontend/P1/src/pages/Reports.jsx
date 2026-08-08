import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Reports() {
  // Extracted offline Analytics Simulation
  const [data] = useState({
    total: 7000,
    categories: {
      Travel: 2000,
      Food: 5000
    }
  });

  const pieData = Object.keys(data.categories).map(key => ({
    name: key,
    value: data.categories[key]
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Company Analytics (Simulated)</h1>
          <p className="text-sm text-slate-500">Static aggregations parsed locally via static Recharts hydration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Total Expenditures</h3>
          <p className="text-5xl font-extrabold text-blue-600 my-4">${data.total.toFixed(2)}</p>
          <div className="h-0.5 w-full bg-slate-100 mb-4 max-w-xs"></div>
          <p className="text-sm text-slate-500 max-w-xs block mx-auto">This metric aggregates the sum of active expenses loaded in the static config.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">Spending by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
