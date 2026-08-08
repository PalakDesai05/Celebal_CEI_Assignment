import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * A wrapper to protect routes from unauthorized or strictly cross-role access.
 * Expects a `role` prop (e.g., "admin", "employee", "manager").
 */
export default function ProtectedRoute({ role, children }) {
  const userStr = localStorage.getItem('user');
  
  // If no user object is found, kick back to login
  if (!userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    
    // If user's stored role doesn't match the route's required role, kick to login
    // Alternatively, we could kick them to their respective dashboard instead of login
    if (user.role !== role) {
      if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
      if (user.role === 'manager') return <Navigate to="/manager/dashboard" replace />;
      if (user.role === 'employee') return <Navigate to="/employee/dashboard" replace />;
      
      // Fallback
      return <Navigate to="/login" replace />;
    }

    // Role authorized, render children routes
    return children;

  } catch (error) {
    // If localStorage user object is malformed, clear & kick
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }
}
