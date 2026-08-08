import React, { useState } from 'react';
import Table from '../components/Table';
import { UserPlus, Shield, X, CheckCircle } from 'lucide-react';

export default function Users() {
  // Strictly mock data initializing state
  const [users, setUsers] = useState([
    { id: 1, employeeId: "EMP-001", name: "Rahul Sharma", email: "rahul@test.com", role: "employee" },
    { id: 2, employeeId: "MNG-001", name: "Priya Mehta", email: "priya@test.com", role: "manager" }
  ]);
  
  const [activeModal, setActiveModal] = useState(null); // 'employee' or 'manager'
  const [formData, setFormData] = useState({ employeeId: '', name: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleOpenModal = (type) => {
    setActiveModal(type);
    setFormData({ employeeId: '', name: '', email: '', password: '' });
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate simulated user object
    const newUser = {
      id: users.length + 1,
      ...formData,
      role: activeModal
    };

    // Push into React State array (No Backend)
    setUsers(prev => [...prev, newUser]);
    
    // UI Success Feedback
    setSuccessMessage(`${activeModal === 'manager' ? 'Manager' : 'Employee'} added successfully!`);
    setFormData({ employeeId: '', name: '', email: '', password: '' });

    setTimeout(() => {
      setActiveModal(null);
      setSuccessMessage('');
    }, 1500);
  };

  const columns = [
    { title: 'Employee ID' },
    { title: 'Name' },
    { title: 'Role' },
    { title: 'Email' }
  ];

  const renderRow = (user) => (
    <React.Fragment>
      <td className="px-6 py-4 text-sm font-medium text-slate-500">{user.employeeId}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs mr-3">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm font-medium text-slate-900">{user.name}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.role === 'manager' ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'
        }`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
        {user.email}
      </td>
    </React.Fragment>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Total Active Employees: <span className="font-bold text-slate-700">{users.length}</span></p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => handleOpenModal('employee')} className="inline-flex items-center px-3 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
            <UserPlus className="w-4 h-4 mr-2" /> Add Employee
          </button>
          <button onClick={() => handleOpenModal('manager')} className="inline-flex items-center px-3 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
            <Shield className="w-4 h-4 mr-2" /> Add Manager
          </button>
        </div>
      </div>

      <Table 
        columns={columns} 
        data={users} 
        keyExtractor={(item) => item.id} 
        renderRow={renderRow} 
      />

      {/* Synchronous Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 capitalize">
                Add New {activeModal}
              </h2>
              
              {successMessage && (
                <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Employee ID</label>
                  <input required type="text" value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="EMP-1001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border rounded-lg text-slate-700 hover:bg-slate-50 font-medium">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
