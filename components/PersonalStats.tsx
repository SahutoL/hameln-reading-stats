
import React, { useState, useMemo } from 'react';
import { ProcessedYearlyData } from '../types';
import { ChevronDownIcon, CrownIcon } from './icons';

interface PersonalStatsProps {
    yearlyData: ProcessedYearlyData[];
}

// Helper functions
const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
const monthNames = ["", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

const InlineBar: React.FC<{ percentage: number }> = ({ percentage }) => (
    <div className="w-full bg-surface rounded-full h-1.5">
        <div 
            className="bg-primary h-1.5 rounded-full" 
            style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in-out' }}
        ></div>
    </div>
);

const PersonalStats: React.FC<PersonalStatsProps> = ({ yearlyData }) => {
    const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

    const toggleYear = (year: number) => {
        const newSet = new Set(expandedYears);
        if (newSet.has(year)) {
            newSet.delete(year);
        } else {
            newSet.add(year);
        }
        setExpandedYears(newSet);
    };

    const processedYearlyData = useMemo(() => {
        const maxYearlyWords = Math.max(0, ...yearlyData.map(y => y.word_count));
        
        return yearlyData.map(yearData => {
            const daysInYear = isLeapYear(yearData.year) ? 366 : 365;
            const avgWordsPerDayYear = yearData.word_count > 0 ? Math.round(yearData.word_count / daysInYear) : 0;
            const maxMonthlyWords = Math.max(0, ...yearData.monthly_data.map(m => m.word_count));
            
            const processedMonthlyData = yearData.monthly_data.map(monthData => {
                const numDays = daysInMonth(monthData.year, monthData.month);
                const avgWordsPerDayMonth = monthData.word_count > 0 ? Math.round(monthData.word_count / numDays) : 0;
                return {
                    ...monthData,
                    avgWordsPerDay: avgWordsPerDayMonth,
                    isBest: monthData.word_count > 0 && monthData.word_count === maxMonthlyWords
                };
            }).sort((a,b) => b.month - a.month);

            return {
                ...yearData,
                avgWordsPerDay: avgWordsPerDayYear,
                yearlyBarPercentage: maxYearlyWords > 0 ? (yearData.word_count / maxYearlyWords) * 100 : 0,
                monthly_data: processedMonthlyData,
                maxMonthlyWords,
            };
        });
    }, [yearlyData]);

    if (!yearlyData || yearlyData.length === 0) {
        return <p>データがありません。</p>;
    }

    return (
        <div className="space-y-2">
            {processedYearlyData.map(year => {
                const isExpanded = expandedYears.has(year.year);
                return (
                    <div key={year.year} className="bg-surface/50 rounded-lg border border-gray-700/50 overflow-hidden">
                        <div 
                            className="flex items-center p-4 cursor-pointer hover:bg-surface/80 transition-colors"
                            onClick={() => toggleYear(year.year)}
                            role="button"
                            aria-expanded={isExpanded}
                            aria-controls={`details-${year.year}`}
                        >
                            <div className="w-1/5 font-bold text-lg text-on-surface">{year.year}年</div>
                            <div className="w-3/5 px-4 space-y-2">
                                <div className="text-sm grid grid-cols-4 gap-2 text-gray-300">
                                    <div>{year.book_count.toLocaleString()} <span className="text-xs text-gray-500">作品</span></div>
                                    <div>{year.chapter_count.toLocaleString()} <span className="text-xs text-gray-500">話</span></div>
                                    <div>{year.word_count.toLocaleString()} <span className="text-xs text-gray-500">文字</span></div>
                                    <div>{year.avgWordsPerDay.toLocaleString()} <span className="text-xs text-gray-500">文字/日</span></div>
                                </div>
                                <InlineBar percentage={year.yearlyBarPercentage} />
                            </div>
                            <div className="w-1/5 flex justify-end">
                                <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        {isExpanded && (
                            <div id={`details-${year.year}`} className="bg-surface/30 px-4 pb-2 animate-fade-in">
                                <div className="divide-y divide-gray-700/50">
                                    {year.monthly_data.map(month => (
                                        <div key={month.month} className="flex items-center py-3">
                                            <div className="w-1/5 flex items-center gap-2 pl-2">
                                                {month.isBest && <CrownIcon className="w-5 h-5 text-yellow-400" />}
                                                <span className="font-semibold text-gray-300">{monthNames[month.month]}</span>
                                            </div>
                                            <div className="w-4/5 px-4 space-y-2">
                                                 <div className="text-xs grid grid-cols-4 gap-2 text-gray-400">
                                                    <div>{month.book_count.toLocaleString()} <span className="text-gray-500">作品</span></div>
                                                    <div>{month.chapter_count.toLocaleString()} <span className="text-gray-500">話</span></div>
                                                    <div>{month.word_count.toLocaleString()} <span className="text-gray-500">文字</span></div>
                                                    <div>{month.avgWordsPerDay.toLocaleString()} <span className="text-gray-500">文字/日</span></div>
                                                </div>
                                                <InlineBar percentage={year.maxMonthlyWords > 0 ? (month.word_count / year.maxMonthlyWords) * 100 : 0} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PersonalStats;
