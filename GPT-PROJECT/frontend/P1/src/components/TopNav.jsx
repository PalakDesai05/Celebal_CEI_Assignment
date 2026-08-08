import React, { useState } from 'react';
import { Search, Bell, Settings as SettingsIcon, Menu } from 'lucide-react';

export default function TopNav() {
  const [query, setQuery] = useState('');
  
  // Hardcoded unified dummy data to power dynamic search without API fetches
  const dummyUsers = [
    { id: 1, name: "Rahul Sharma", email: "rahul@test.com" },
    { id: 2, name: "Priya Mehta", email: "priya@test.com" }
  ];
  const dummyExpenses = [
    { id: 1, name: "Rahul Sharma", amount: 2000, category: "Travel" },
    { id: 2, name: "Priya Mehta", amount: 5000, category: "Food" }
  ];

  const filteredUsers = query.trim() ? dummyUsers.filter(u => 
    u.name.toLowerCase().includes(query.toLowerCase()) || 
    u.email.toLowerCase().includes(query.toLowerCase())
  ) : [];

  const filteredExpenses = query.trim() ? dummyExpenses.filter(e => 
    e.name.toLowerCase().includes(query.toLowerCase()) || 
    e.category.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 relative">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-slate-500 hover:text-slate-700">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Search users or expenses locally..."
          />
          
          {/* SYNCHRONOUS SEARCH DROPDOWN */}
          {query.trim() && (
            <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-y-auto z-50">
              <div className="p-2">
                <div className="px-2 py-1 mt-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Users ({filteredUsers.length})
                </div>
                {filteredUsers.map(u => (
                  <div key={u.id} className="p-2 hover:bg-slate-50 rounded cursor-pointer text-sm">
                    <span className="font-semibold text-slate-800">{u.name}</span>
                    <span className="text-slate-500 ml-2 text-xs">{u.email}</span>
                  </div>
                ))}

                <div className="px-2 py-1 mt-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Expenses ({filteredExpenses.length})
                </div>
                {filteredExpenses.map(e => (
                  <div key={e.id} className="p-2 hover:bg-slate-50 rounded cursor-pointer text-sm flex justify-between">
                    <div>
                      <span className="font-semibold text-slate-800">{e.name}</span>
                      <span className="text-slate-500 ml-2 text-xs">({e.category})</span>
                    </div>
                    <span className="text-emerald-600 font-bold">${e.amount.toFixed(2)}</span>
                  </div>
                ))}
                
                {(filteredUsers.length === 0 && filteredExpenses.length === 0) && (
                  <div className="text-sm text-slate-500 p-3 text-center">No results found for "{query}"</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-500 rounded-full hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-500 rounded-full hover:bg-slate-100 transition-colors">
          <SettingsIcon className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
