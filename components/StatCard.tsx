
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  unit: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, unit }) => {
  return (
    <div className="bg-surface p-6 rounded-xl shadow-lg border border-gray-700 flex items-center space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-on-surface flex items-baseline">
            {value}
            <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default StatCard;
