import React, { useState, useMemo } from "react";
import { ProcessedYearlyData } from "../types";
import { CrownIcon } from "./icons";
import Modal from "./Modal";

interface PersonalStatsProps {
  yearlyData: ProcessedYearlyData[];
}

// Helper functions
const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
const daysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate();
const monthNames = [
  "",
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

const InlineBar: React.FC<{ percentage: number }> = ({ percentage }) => (
  <div className="w-full bg-surface rounded-full h-1.5">
    <div
      className="bg-primary h-1.5 rounded-full"
      style={{ width: `${percentage}%`, transition: "width 0.5s ease-in-out" }}
    ></div>
  </div>
);

const PersonalStats: React.FC<PersonalStatsProps> = ({ yearlyData }) => {
  const [modalData, setModalData] = useState<ProcessedYearlyData | null>(null);

  const processedYearlyData = useMemo(() => {
    if (!yearlyData) return [];
    const maxYearlyWords = Math.max(0, ...yearlyData.map((y) => y.word_count));

    return yearlyData.map((yearData) => {
      const daysInYear = isLeapYear(yearData.year) ? 366 : 365;
      const avgWordsPerDayYear =
        yearData.word_count > 0
          ? Math.round(yearData.word_count / daysInYear)
          : 0;
      const maxMonthlyWords = Math.max(
        0,
        ...yearData.monthly_data.map((m) => m.word_count)
      );

      const processedMonthlyData = yearData.monthly_data.map((monthData) => {
        const numDays = daysInMonth(monthData.year, monthData.month);
        const avgWordsPerDayMonth =
          monthData.word_count > 0
            ? Math.round(monthData.word_count / numDays)
            : 0;
        return {
          ...monthData,
          avgWordsPerDay: avgWordsPerDayMonth,
          isBest:
            monthData.word_count > 0 &&
            monthData.word_count === maxMonthlyWords,
        };
      });

      return {
        ...yearData,
        avgWordsPerDay: avgWordsPerDayYear,
        yearlyBarPercentage:
          maxYearlyWords > 0 ? (yearData.word_count / maxYearlyWords) * 100 : 0,
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
      {processedYearlyData.map((year) => (
        <div
          key={year.year}
          className="bg-surface/50 rounded-lg border border-gray-700/50 overflow-hidden transition-all duration-300 cursor-pointer hover:bg-surface/80 hover:border-primary/50"
          onClick={() => setModalData(year)}
          role="button"
        >
          <div className="flex items-center p-4">
            <div className="w-1/4 md:w-1/5 font-bold text-lg text-on-surface">
              {year.year}年
            </div>
            <div className="w-3/4 md:w-4/5 px-2 md:px-4 space-y-2">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-300">
                <div>
                  <div className="text-sm font-semibold text-on-surface">
                    {year.book_count.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">作品</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-on-surface">
                    {year.word_count.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">文字</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-on-surface">
                    {year.chapter_count.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">話</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-on-surface">
                    {year.avgWordsPerDay.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">文字/日</div>
                </div>
              </div>
              <InlineBar percentage={year.yearlyBarPercentage} />
            </div>
          </div>
        </div>
      ))}
      <Modal
        isOpen={modalData !== null}
        onClose={() => setModalData(null)}
        title={modalData ? `${modalData.year}年 月別詳細データ` : ""}
      >
        {modalData && (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[400px]">
              <thead>
                <tr className="border-b border-gray-700 text-sm text-gray-400">
                  <th className="p-3">月</th>
                  <th className="p-3 text-right">文字数</th>
                  <th className="p-3 text-right">作品数</th>
                  <th className="p-3 text-right">話数</th>
                  <th className="p-3 text-right whitespace-nowrap">文字/日</th>
                </tr>
              </thead>
              <tbody>
                {modalData.monthly_data
                  .slice()
                  .sort((a, b) => a.month - b.month)
                  .map((month) => (
                    <tr
                      key={month.month}
                      className={`border-b border-gray-800 last:border-b-0 ${
                        month.isBest ? "bg-primary/10" : ""
                      }`}
                    >
                      <td className="p-3 font-medium flex items-center gap-2">
                        {month.isBest && (
                          <CrownIcon className="w-5 h-5 text-yellow-400" />
                        )}
                        {monthNames[month.month]}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {month.word_count.toLocaleString()}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {month.book_count.toLocaleString()}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {month.chapter_count.toLocaleString()}
                      </td>
                      {/* FIX: Use nullish coalescing operator to safely access the optional 'avgWordsPerDay' property and prevent potential runtime errors. */}
                      <td className="p-3 text-right font-mono">
                        {(month.avgWordsPerDay ?? 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PersonalStats;
