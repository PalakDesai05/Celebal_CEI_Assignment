import React, { useState } from 'react';
import Navbar from './Navbar';
import EmployeeDashboard from '../pages/employee/Dashboard';
import SubmitExpense from '../pages/employee/SubmitExpense';
import MyExpenses from '../pages/employee/MyExpenses';
import Feedback from '../pages/employee/Feedback';
import { LayoutDashboard, FilePlus, Database, MessageSquare, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeLayout() {
  const [activePage, setActivePage] = useState("dashboard");
  const [expenses, setExpenses] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'submit', label: 'Submit Expense', icon: FilePlus },
    { id: 'expenses', label: 'My Expenses', icon: Database },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen overflow-hidden font-sans">
      
      {/* LOCAL SIDEBAR */}
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col h-screen shrink-0 transition-transform md:translate-x-0 -translate-x-full absolute md:relative z-30">
        <div className="p-6 border-b border-white/10 flex items-center justify-center">
            <h2 className="text-2xl font-black text-white tracking-tight">ERMS <span className="text-emerald-400">Pro</span></h2>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-left ${
                activePage === item.id
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors font-medium text-left">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
           {activePage === "dashboard" && <EmployeeDashboard />}
           {activePage === "submit" && <SubmitExpense setExpenses={setExpenses} />}
           {activePage === "expenses" && <MyExpenses expenses={expenses} />}
           {activePage === "feedback" && <Feedback feedbacks={feedbacks} setFeedbacks={setFeedbacks} />}
        </main>
      </div>

    </div>
  );
}
