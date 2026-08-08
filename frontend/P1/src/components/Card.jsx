import React from 'react';

export default function Card({ title, value, subtitle, icon: Icon, gradientFrom, gradientTo }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          {subtitle && <p className="text-white/70 text-xs mt-2">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      {/* Decorative background circle */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
}
