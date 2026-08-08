import React from 'react';
import { Outlet } from 'react-router-dom';
import ManagerSidebar from './ManagerSidebar';
import Navbar from './Navbar';

export default function ManagerLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
