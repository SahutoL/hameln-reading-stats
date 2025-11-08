
import React, { useMemo } from 'react';
import { MonthlyData, CalendarData } from '../types';
import { BulbIcon } from './icons';

interface InsightCardProps {
    allMonthlyData: MonthlyData[];
    calendarData: CalendarData;
}

const InsightCard: React.FC<InsightCardProps> = ({ allMonthlyData, calendarData }) => {

  const { bestDayOfWeek, streak, bestMonth, dailyAverage } = useMemo(() => {
    const dayCounts: { [day: number]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    let currentStreak = 0;
    let longestStreak = 0;
    
    const sortedDates = Array.from(calendarData.keys()).sort();
    
    if (calendarData.size > 0) {
        sortedDates.forEach((dateStr, index) => {
            const [year, month, day] = dateStr.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            dayCounts[date.getDay()] += calendarData.get(dateStr) || 0;
            
            if (index === 0) {
                currentStreak = 1;
            } else {
                const prevDateStr = sortedDates[index - 1];
                const [prevYear, prevMonth, prevDay] = prevDateStr.split('-').map(Number);
                const prevDate = new Date(prevYear, prevMonth - 1, prevDay);
                
                const diffTime = Math.abs(date.getTime() - prevDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    currentStreak++;
                } else {
                    longestStreak = Math.max(longestStreak, currentStreak);
                    currentStreak = 1;
                }
            }
        });
        longestStreak = Math.max(longestStreak, currentStreak);
    }

    const maxDayIndex = Object.keys(dayCounts).reduce((a, b) => dayCounts[Number(a)] > dayCounts[Number(b)] ? a : b);
    const dayNames = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    const bestDay = dayNames[Number(maxDayIndex)];

    const activeDays = calendarData.size;
    const totalWords = Array.from(calendarData.values()).reduce((sum, count) => sum + count, 0);
    const avg = activeDays > 0 ? Math.round(totalWords / activeDays) : 0;
    
    let bestMonthInfo = { month: 'N/A', words: 0 };
    if (allMonthlyData.length > 0) {
        const best = allMonthlyData.reduce((prev, current) => (prev.word_count > current.word_count) ? prev : current);
        bestMonthInfo = { month: `${best.year}年${best.month}月`, words: best.word_count };
    }

    return { bestDayOfWeek: bestDay, streak: longestStreak, bestMonth: bestMonthInfo, dailyAverage: avg };
  }, [allMonthlyData, calendarData]);

  return (
    <div className="bg-surface-glass backdrop-blur-md border border-gray-700/50 rounded-xl shadow-lg p-6 flex flex-col justify-center text-center transform hover:scale-105 transition-transform duration-300">
      <BulbIcon className="w-10 h-10 text-yellow-400 mb-3" />
      <h3 className="text-sm font-medium text-gray-400 mb-2">パーソナルインサイト</h3>
      <div className="font-semibold text-on-surface text-sm space-y-2">
        <p>最も読書したのは<span className="text-secondary text-base">{bestDayOfWeek}</span>です。</p>
        <p>最長の連続読書日数は<span className="text-secondary text-base">{streak}</span>日です！</p>
        <p>ピーク月は<span className="text-secondary text-base">{bestMonth.month}</span>でした。</p>
        <p>平均<span className="text-secondary text-base">{dailyAverage.toLocaleString()}</span>文字/日読んでいます。</p>
      </div>
    </div>
  );
};

export default InsightCard;
