import React, { useState, useMemo } from "react";
import { ProcessedYearlyData } from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CrownIcon, BookIcon, ChapterIcon, WordIcon } from "./icons";

interface YearlyReportProps {
  yearlyData: ProcessedYearlyData[];
}

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

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-surface/50 p-4 rounded-lg flex items-center gap-4">
    <div className="text-primary">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-bold text-on-surface">{value}</p>
    </div>
  </div>
);

const YearlyReport: React.FC<YearlyReportProps> = ({ yearlyData }) => {
  const availableYears = useMemo(
    () => yearlyData.map((y) => y.year),
    [yearlyData]
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    availableYears[0] || new Date().getFullYear()
  );

  const selectedYearData = useMemo(() => {
    return yearlyData.find((y) => y.year === selectedYear);
  }, [selectedYear, yearlyData]);

  const chartData = useMemo(() => {
    if (!selectedYearData) return [];
    const monthMap = new Map<number, number>();
    selectedYearData.monthly_data.forEach((m) =>
      monthMap.set(m.month, m.word_count)
    );

    const data = [];
    for (let i = 1; i <= 12; i++) {
      data.push({ name: `${i}月`, 文字数: monthMap.get(i) || 0 });
    }
    return data;
  }, [selectedYearData]);

  const { peakMonth, averageWordsPerDay } = useMemo(() => {
    if (!selectedYearData) return { peakMonth: "N/A", averageWordsPerDay: 0 };

    let peak = { month: 0, words: 0 };
    selectedYearData.monthly_data.forEach((m) => {
      if (m.word_count > peak.words) {
        peak = { month: m.month, words: m.word_count };
      }
    });

    const isLeap = (year: number) =>
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const daysInYear = isLeap(selectedYearData.year) ? 366 : 365;
    const avg = Math.round(selectedYearData.word_count / daysInYear);

    return {
      peakMonth:
        peak.month > 0
          ? `${monthNames[peak.month]} (${peak.words.toLocaleString()}文字)`
          : "N/A",
      averageWordsPerDay: avg,
    };
  }, [selectedYearData]);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface">
            年次レポート
          </h1>
          <p className="text-gray-400 mt-1">年ごとの読書活動を振り返る</p>
        </div>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="appearance-none w-full md:w-auto bg-surface text-on-surface py-2 pl-3 pr-10 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}年
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {selectedYearData ? (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="bg-surface-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              {selectedYear}年 サマリー
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="総読了文字数"
                value={selectedYearData.word_count.toLocaleString()}
                icon={<WordIcon className="w-7 h-7" />}
              />
              <StatCard
                title="総読了作品数"
                value={selectedYearData.book_count.toLocaleString()}
                icon={<BookIcon className="w-7 h-7" />}
              />
              <StatCard
                title="総読了話数"
                value={selectedYearData.chapter_count.toLocaleString()}
                icon={<ChapterIcon className="w-7 h-7" />}
              />
              <StatCard
                title="ピーク月"
                value={peakMonth}
                icon={<CrownIcon className="w-7 h-7" />}
              />
            </div>
          </div>

          {/* Chart */}
          <div className="bg-surface-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">月間トレンド</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis
                    stroke="#9ca3af"
                    tickFormatter={(v) => `${Number(v) / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30, 30, 36, 0.8)",
                      border: "1px solid #ffffff20",
                      color: "#fff",
                    }}
                    formatter={(v: number) => v.toLocaleString()}
                  />
                  <Bar dataKey="文字数" fill="#bb86fc" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-surface-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">月別詳細データ</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700 text-sm text-gray-400">
                    <th className="p-3">月</th>
                    <th className="p-3 text-right">文字数</th>
                    <th className="p-3 text-right">作品数</th>
                    <th className="p-3 text-right">話数</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((monthData, index) => {
                    const monthDetail = selectedYearData.monthly_data.find(
                      (m) => m.month === index + 1
                    );
                    const isPeak =
                      monthDetail &&
                      monthDetail.word_count > 0 &&
                      peakMonth.startsWith(monthNames[index + 1]);
                    return (
                      <tr
                        key={index}
                        className={`border-b border-gray-800 ${
                          isPeak ? "bg-primary/10" : ""
                        }`}
                      >
                        <td className="p-3 font-medium flex items-center gap-2">
                          {isPeak && (
                            <CrownIcon className="w-5 h-5 text-yellow-400" />
                          )}
                          {monthData.name}
                        </td>
                        <td className="p-3 text-right font-mono">
                          {monthDetail?.word_count.toLocaleString() || 0}
                        </td>
                        <td className="p-3 text-right font-mono">
                          {monthDetail?.book_count.toLocaleString() || 0}
                        </td>
                        <td className="p-3 text-right font-mono">
                          {monthDetail?.chapter_count.toLocaleString() || 0}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-surface-glass rounded-2xl">
          <p>選択された年のデータがありません。</p>
        </div>
      )}
    </div>
  );
};

export default YearlyReport;
