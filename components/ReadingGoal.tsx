import React, { useState, useEffect, useMemo } from 'react';
import { ReadingGoal, MonthlyData } from '../types';
import { TargetIcon, EditIcon, TrophyIcon } from './icons';

interface ReadingGoalProps {
  monthlyData: MonthlyData[];
}

const ReadingGoalComponent: React.FC<ReadingGoalProps> = ({ monthlyData }) => {
  const [goal, setGoal] = useState<ReadingGoal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  
  const currentMonthIdentifier = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }, []);

  // Goal carry-over and initialization logic
  useEffect(() => {
    const savedGoalStr = localStorage.getItem('readingGoal');
    if (savedGoalStr) {
      const savedGoal: ReadingGoal = JSON.parse(savedGoalStr);
      
      // Goal is from a previous month
      if (savedGoal.month < currentMonthIdentifier) {
        const carryOver = window.confirm(
          `先月の目標 (${savedGoal.value.toLocaleString()}文字) を今月の目標として引き継ぎますか？`
        );
        if (carryOver) {
          const newGoal = { value: savedGoal.value, month: currentMonthIdentifier };
          setGoal(newGoal);
          setEditValue(newGoal.value.toString());
          localStorage.setItem('readingGoal', JSON.stringify(newGoal));
        } else {
          localStorage.removeItem('readingGoal');
          setGoal(null); // Clear the goal if user declines
          setEditValue('');
        }
      } else if (savedGoal.month === currentMonthIdentifier) {
        // Goal is for the current month, load it
        setGoal(savedGoal);
        setEditValue(savedGoal.value.toString());
      } else {
        // Goal is from the future (e.g. clock change), clear it
        localStorage.removeItem('readingGoal');
      }
    }
  }, [currentMonthIdentifier]);
  
  const currentMonthStats = monthlyData.find(m => `${m.year}-${String(m.month).padStart(2, '0')}` === currentMonthIdentifier);
  const currentWordCount = currentMonthStats?.word_count || 0;

  const progress = goal ? Math.min((currentWordCount / goal.value) * 100, 100) : 0;
  const isGoalAchieved = progress >= 100;

  const handleSave = () => {
    const value = parseInt(editValue, 10);
    if (!isNaN(value) && value > 0) {
      const newGoal = { value, month: currentMonthIdentifier };
      setGoal(newGoal);
      localStorage.setItem('readingGoal', JSON.stringify(newGoal));
      setIsEditing(false);
    }
  };

  const presetGoals = [
      { label: '10万', value: 100000 },
      { label: '50万', value: 500000 },
      { label: '100万', value: 1000000 },
  ];

  const renderContent = () => {
    if (isEditing) {
      return (
        <div className="w-full text-center">
            <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-600/50 bg-gray-800/50 text-on-surface placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary rounded-md sm:text-sm mb-3 text-center"
                placeholder="目標文字数を入力"
                autoFocus
            />
            <div className="flex justify-center gap-2 mb-3">
                {presetGoals.map(({ label, value }) => (
                    <button 
                        key={value}
                        onClick={() => setEditValue(value.toString())}
                        className="px-3 py-1 text-xs font-medium rounded-full text-primary bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/30"
                    >
                        {label}
                    </button>
                ))}
            </div>
            <button onClick={handleSave} className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-primary-variant hover:bg-primary transition-colors">
                目標を保存
            </button>
        </div>
      );
    }
    
    if (goal) {
        if (isGoalAchieved) {
            return (
                <div className="w-full text-center p-4 bg-green-900/40 border border-green-500/50 rounded-lg animate-fade-in">
                    <TrophyIcon className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                    <p className="font-bold text-on-surface">目標達成おめでとうございます！</p>
                    <p className="text-xs text-gray-300 mt-1">
                        {goal.value.toLocaleString()} 文字
                    </p>
                </div>
            );
        }
      return (
        <div className="w-full">
            <div className="flex justify-between items-baseline mb-1 text-sm">
                <span className="font-medium text-gray-300">進捗</span>
                <span className="font-mono text-on-surface">{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-secondary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-400">
                {currentWordCount.toLocaleString()} / {goal.value.toLocaleString()} 文字
            </div>
        </div>
      );
    }

    return (
        <button onClick={() => setIsEditing(true)} className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-primary-variant/50 hover:bg-primary/80 transition-colors">
            今月の目標を設定する
        </button>
    );
  };

  return (
    <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
                <TargetIcon className="w-6 h-6 text-secondary"/>
                今月の目標
            </h2>
            {goal && !isEditing && (
                <button onClick={() => { setIsEditing(true); setEditValue(goal.value.toString()); }} className="text-gray-400 hover:text-white transition-colors">
                    <EditIcon className="w-5 h-5"/>
                </button>
            )}
        </div>
        <div className="flex-grow flex items-center justify-center">
            {renderContent()}
        </div>
    </div>
  );
};

export default ReadingGoalComponent;