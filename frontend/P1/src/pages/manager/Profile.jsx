import React from 'react';
import { User, Mail, Briefcase, Phone, Users } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Manager Profile</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-orange-600 h-32 relative"></div>
        <div className="px-6 pb-6 relative">
          <div className="absolute -top-12 left-6">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
               <span className="text-3xl font-bold text-slate-400">MR</span>
            </div>
          </div>
          
          <div className="pt-16 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Michael Ross</h2>
              <p className="text-slate-500 font-medium">Head of Engineering</p>
            </div>
            <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              Edit Settings
            </button>
          </div>

          <div className="mt-8 space-y-4 max-w-lg text-sm">
            <div className="flex items-center text-slate-600">
              <Mail className="w-5 h-5 mr-4 text-slate-400" />
              michael.ross@company.com
            </div>
            <div className="flex items-center text-slate-600">
              <Users className="w-5 h-5 mr-4 text-slate-400" />
              12 Team Members
            </div>
            <div className="flex items-center text-slate-600">
              <Briefcase className="w-5 h-5 mr-4 text-slate-400" />
              Engineering Department
            </div>
            <div className="flex items-center text-slate-600">
              <Phone className="w-5 h-5 mr-4 text-slate-400" />
              +1 (415) 555-8899
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
