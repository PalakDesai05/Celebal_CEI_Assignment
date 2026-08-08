import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Send,
  List,
  UserCircle,
  LogOut
} from 'lucide-react';

export default function EmployeeSidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Submit Expense', path: '/employee/dashboard/submit', icon: Send },
    { name: 'My Expenses', path: '/employee/dashboard/expenses', icon: List },
    { name: 'Profile', path: '/employee/dashboard/profile', icon: UserCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex shadow-sm z-10 transition-all duration-300">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">ERMS Portal</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <NavLink 
          to="/login"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </NavLink>
      </div>
    </aside>
  );
}
