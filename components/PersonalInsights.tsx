
import React from 'react';
import { PersonalInsightsData } from '../types';
import { BookIcon, WordIcon, CalendarIcon, TrophyIcon, ChartBarIcon } from './icons';

interface PersonalInsightsProps {
    data: PersonalInsightsData;
}

const InsightItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number; unit?: string }> = ({ icon, label, value, unit }) => (
    <li className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 text-gray-300">
            {icon}
            <span>{label}</span>
        </div>
        <div className="font-semibold text-on-surface">
            {typeof value === 'number' ? value.toLocaleString() : value}
            {unit && <span className="ml-1 text-xs text-gray-400">{unit}</span>}
        </div>
    </li>
);

const PersonalInsights: React.FC<PersonalInsightsProps> = ({ data }) => {
    const { bestDayOfWeek, bestMonth, dailyAverage, avgBooksPerMonth, avgWordsPerBook, bestYear } = data;

    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg border border-gray-700 h-full">
            <h2 className="text-2xl font-bold text-on-surface mb-4 flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6 text-secondary" />
                パーソナルインサイト
            </h2>
            <ul className="space-y-4">
                <InsightItem 
                    icon={<CalendarIcon className="w-5 h-5 text-red-400"/>}
                    label="最も読書した曜日"
                    value={bestDayOfWeek}
                />
                <InsightItem 
                    icon={<TrophyIcon className="w-5 h-5 text-yellow-400"/>}
                    label="ピーク月"
                    value={bestMonth.month}
                    unit={`(${bestMonth.words.toLocaleString()}文字)`}
                />
                <InsightItem 
                    icon={<TrophyIcon className="w-5 h-5 text-yellow-400"/>}
                    label="ピーク年"
                    value={bestYear.year}
                    unit={`(${bestYear.words.toLocaleString()}文字)`}
                />
                 <InsightItem 
                    icon={<WordIcon className="w-5 h-5 text-blue-400"/>}
                    label="1日の平均読書文字数"
                    value={dailyAverage}
                    unit="文字"
                />
                <InsightItem 
                    icon={<BookIcon className="w-5 h-5 text-primary"/>}
                    label="月平均の読了作品数"
                    value={avgBooksPerMonth}
                    unit="作品"
                />
                 <InsightItem 
                    icon={<WordIcon className="w-5 h-5 text-green-400"/>}
                    label="1作品あたりの平均文字数"
                    value={avgWordsPerBook}
                    unit="文字"
                />
            </ul>
        </div>
    );
};

export default PersonalInsights;
