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
    const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set([yearlyData?.[0]?.year]));

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
        if (!yearlyData) return [];
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
                    <div key={year.year} className="bg-surface/50 rounded-lg border border-gray-700/50 overflow-hidden transition-all duration-300">
                        <div 
                            className="flex items-center p-4 cursor-pointer hover:bg-surface/80 transition-colors"
                            onClick={() => toggleYear(year.year)}
                            role="button"
                            aria-expanded={isExpanded}
                            aria-controls={`details-${year.year}`}
                        >
                            <div className="w-1/4 md:w-1/5 font-bold text-lg text-on-surface">{year.year}年</div>
                            <div className="w-2/4 md:w-3/5 px-2 md:px-4 space-y-2">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-300">
                                    <div>
                                        <div className="text-sm font-semibold text-on-surface">{year.book_count.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">作品</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-on-surface">{year.chapter_count.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">話</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-on-surface">{year.word_count.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">文字</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-on-surface">{year.avgWordsPerDay.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">文字/日</div>
                                    </div>
                                </div>
                                <InlineBar percentage={year.yearlyBarPercentage} />
                            </div>
                            <div className="w-1/4 md:w-1/5 flex justify-end">
                                <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        <div
                            className={`transition-all duration-500 ease-in-out grid ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                            <div id={`details-${year.year}`} className="overflow-hidden">
                                <div className="bg-surface/30 px-4 pb-2 pt-2 border-t border-gray-700/50">
                                    <div className="divide-y divide-gray-700/50">
                                        {year.monthly_data.map(month => (
                                            <div key={month.month} className="flex items-center py-3">
                                                <div className="w-1/4 md:w-1/5 flex items-center gap-2 pl-2">
                                                    {month.isBest && <span title="この年のベストパフォーマンス月"><CrownIcon className="w-5 h-5 text-yellow-400 flex-shrink-0" /></span>}
                                                    <span className="font-semibold text-gray-300">{monthNames[month.month]}</span>
                                                </div>
                                                <div className="w-3/4 md:w-4/5 px-2 md:px-4 space-y-2">
                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-400">
                                                        <div>
                                                            <div className="text-xs font-semibold text-on-surface">{month.book_count.toLocaleString()}</div>
                                                            <div className="text-xs text-gray-500">作品</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-semibold text-on-surface">{month.chapter_count.toLocaleString()}</div>
                                                            <div className="text-xs text-gray-500">話</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-semibold text-on-surface">{month.word_count.toLocaleString()}</div>
                                                            <div className="text-xs text-gray-500">文字</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-semibold text-on-surface">{month.avgWordsPerDay.toLocaleString()}</div>
                                                            <div className="text-xs text-gray-500">文字/日</div>
                                                        </div>
                                                    </div>
                                                    <InlineBar percentage={year.maxMonthlyWords > 0 ? (month.word_count / year.maxMonthlyWords) * 100 : 0} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PersonalStats;