import React, { useState } from 'react';

export default function Rules() {
  const [rules, setRules] = useState({
    autoApproveSmall: true,
    requireReceipts: true,
    cfoMandatory: false,
    sixtyPercentRule: true,
    notifyOnReject: true,
  });

  const toggleRule = (key) => {
    setRules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const RuleItem = ({ id, title, description }) => (
    <div className="flex items-center justify-between py-5 border-b border-slate-100 last:border-0">
      <div className="pr-8">
        <h3 className="text-sm font-medium text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <button
        onClick={() => toggleRule(id)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
          rules[id] ? 'bg-blue-600' : 'bg-slate-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            rules[id] ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Rules Configuration</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage global policies and automated system behaviors.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-2">
          <RuleItem 
            id="sixtyPercentRule"
            title="60% Approval Rule"
            description="Automatically approve expenses that are under 60% of their allocated category budget."
          />
          <RuleItem 
            id="cfoMandatory"
            title="CFO Mandatory Approval"
            description="Require specific sign-off from the CFO for any single expense exceeding $10,000."
          />
          <RuleItem 
            id="autoApproveSmall"
            title="Auto-Approve Micro Expenses"
            description="Automatically push through expenses under $25 without manager confirmation."
          />
          <RuleItem 
            id="requireReceipts"
            title="Strict Receipt Enforcement"
            description="Block submission of any expense claim that lacks an attached digitized receipt."
          />
        </div>
      </div>
    </div>
  );
}
