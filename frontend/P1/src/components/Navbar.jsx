import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle placeholder */}
        <button className="md:hidden text-slate-500 hover:text-slate-700">
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Search Bar */}
        <div className="hidden sm:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm text-slate-700 w-64 placeholder-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-700">John Admin</p>
            <p className="text-xs text-slate-500">System Administrator</p>
          </div>
          <img 
            src="https://ui-avatars.com/api/?name=John+Admin&background=eff6ff&color=2563eb" 
            alt="Profile" 
            className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
