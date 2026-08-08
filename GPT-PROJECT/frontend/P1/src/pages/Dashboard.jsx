import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, LogOut } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="text-center space-y-6">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h2>
      <p className="text-gray-600">
        You have successfully logged in to the Expense Reimbursement Management System.
      </p>
      
      <div className="pt-6 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          <LogOut className="mr-2 h-4 w-4 text-gray-500" />
          Log out
        </button>
      </div>
    </div>
  );
}
