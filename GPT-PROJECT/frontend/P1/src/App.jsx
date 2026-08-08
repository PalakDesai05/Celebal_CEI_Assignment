import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Dash Components
import AdminLayout from './components/AdminLayout';
import AdminDashboardHome from './pages/DashboardHome';
import AdminUsers from './pages/Users';
import AdminExpenses from './pages/Expenses';
import AdminApprovalFlow from './pages/ApprovalFlow';
import AdminRules from './pages/Rules';
import AdminReports from './pages/Reports';

// Employee Dash Components
import EmployeeLayout from './components/EmployeeLayout';
import EmployeeDashboard from './pages/employee/Dashboard';
import SubmitExpense from './pages/employee/SubmitExpense';
import MyExpenses from './pages/employee/MyExpenses';
import EmployeeProfile from './pages/employee/Profile';

// Manager Dash Components
import ManagerLayout from './components/ManagerLayout';
import ManagerDashboard from './pages/manager/Dashboard';
import PendingApprovals from './pages/manager/PendingApprovals';
import TeamExpenses from './pages/manager/TeamExpenses';
import ApprovalHistory from './pages/manager/ApprovalHistory';
import ManagerProfile from './pages/manager/Profile';

function App() {
  return (
    <Routes>
      {/* Auth Layout Route */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin Dashboard Nested Routes */}
      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboardHome />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="expenses" element={<AdminExpenses />} />
        <Route path="approval-flow" element={<AdminApprovalFlow />} />
        <Route path="rules" element={<AdminRules />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>

      {/* Legacy Route Fallback mapping /dashboard to /admin/dashboard */}
      <Route path="/dashboard/*" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Employee Dashboard Stateful Route */}
      <Route path="/employee/dashboard" element={
        <ProtectedRoute role="employee">
          <EmployeeLayout />
        </ProtectedRoute>
      } />

      {/* Manager Dashboard Nested Routes */}
      <Route path="/manager/dashboard" element={
        <ProtectedRoute role="manager">
          <ManagerLayout />
        </ProtectedRoute>
      }>
        <Route index element={<ManagerDashboard />} />
        <Route path="approvals" element={<PendingApprovals />} />
        <Route path="team-expenses" element={<TeamExpenses />} />
        <Route path="history" element={<ApprovalHistory />} />
        <Route path="profile" element={<ManagerProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
