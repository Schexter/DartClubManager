/**
 * StatsCard Component - Modern Design System
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 * Version: 3.0
 */

import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  change,
  icon,
  trend = 'neutral',
}) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-500',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          
          {change && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              <span className={`font-medium ${trendColors[trend]}`}>
                {trendIcons[trend]} {change.value > 0 ? '+' : ''}{change.value}%
              </span>
              <span className="text-gray-500">{change.label}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
