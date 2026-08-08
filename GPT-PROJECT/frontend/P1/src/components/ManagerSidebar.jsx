import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare,
  BarChart2,
  History,
  UserCircle,
  LogOut
} from 'lucide-react';

export default function ManagerSidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/manager/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Pending Approvals', path: '/manager/dashboard/approvals', icon: CheckSquare },
    { name: 'Team Expenses', path: '/manager/dashboard/team-expenses', icon: BarChart2 },
    { name: 'Approval History', path: '/manager/dashboard/history', icon: History },
    { name: 'Profile', path: '/manager/dashboard/profile', icon: UserCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex shadow-sm z-10 transition-all duration-300">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">Manager Portal</span>
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
                  ? 'bg-orange-50 text-orange-700' 
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
