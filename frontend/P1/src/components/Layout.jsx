import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black ring-opacity-5">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
