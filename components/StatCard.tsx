import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  unit: string;
  accentColor: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  unit,
  accentColor,
  delay = 0,
}) => {
  const style = {
    animationDelay: `${delay}ms`,
    animationFillMode: "backwards",
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="bg-surface-glass backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-white/10 relative overflow-hidden animate-fade-in"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor}`}></div>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-on-surface flex items-baseline">
            {value}
            <span className="text-base font-normal text-gray-400 ml-1.5">
              {unit}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
