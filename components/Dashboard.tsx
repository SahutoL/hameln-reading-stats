import React, { useMemo } from "react";
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
import {
  ProcessedData,
  AchievementCategory,
  ComparisonData,
  PersonalInsightsData,
} from "../types";
import StatCard from "./StatCard";
import ReadingGoal from "./ReadingGoal";
import ActivityCalendar from "./ActivityCalendar";
import Achievements from "./Achievements";
import ReadingTrends from "./ReadingTrends";
import ComparisonStats from "./ComparisonStats";
import PersonalInsights from "./PersonalInsights";
import PersonalStats from "./PersonalStats";
import {
  BookIcon,
  ChapterIcon,
  WordIcon,
  InformationCircleIcon,
  CalendarIcon,
  TargetIcon,
} from "./icons";
import { ACHIEVEMENT_DEFINITIONS } from "./achievementDefinitions";
import LevelProgress from "./LevelProgress";
import Roadmap from "./Roadmap";

interface DashboardProps {
  processedData: ProcessedData;
}

const Dashboard: React.FC<DashboardProps> = ({ processedData }) => {
  const {
    allMonthlyData,
    yearlyData,
    cumulativeData,
    calendarData,
    levelData,
  } = processedData;

  const chartData = useMemo(
    () =>
      allMonthlyData
        .slice(0, 12)
        .reverse()
        .map((m) => ({
          name: `${m.year}/${m.month}`,
          文字数: m.word_count,
          作品数: m.book_count,
          話数: m.chapter_count,
        })),
    [allMonthlyData]
  );

  const {
    achievementsByCategory,
    readingTrendsData,
    comparisonData,
    personalInsightsData,
    longestStreak,
  } = useMemo(() => {
    // --- Longest Streak ---
    const sortedDates = Array.from(calendarData.keys()).sort();
    let currentLongestStreak = 0;
    if (sortedDates.length > 0) {
      let currentStreak = 1;
      currentLongestStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const diffDays =
          (new Date(sortedDates[i]).getTime() -
            new Date(sortedDates[i - 1]).getTime()) /
          (1000 * 60 * 60 * 24);
        currentStreak = diffDays === 1 ? currentStreak + 1 : 1;
        currentLongestStreak = Math.max(currentLongestStreak, currentStreak);
      }
    }

    // --- Comparison Data Calculation ---
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const prevMonthDate = new Date(now);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    const prevMonthYear = prevMonthDate.getFullYear();
    const prevMonth = prevMonthDate.getMonth() + 1;

    const thisMonthData = allMonthlyData.find(
      (d) => d.year === currentYear && d.month === currentMonth
    );
    const prevMonthData = allMonthlyData.find(
      (d) => d.year === prevMonthYear && d.month === prevMonth
    );
    const thisYearData = yearlyData.find((d) => d.year === currentYear);
    const prevYearData = yearlyData.find((d) => d.year === currentYear - 1);

    const calcComparison = (
      current: number,
      previous: number
    ): { percentage: number; direction: "up" | "down" | "same" } => {
      if (previous === 0) {
        return {
          percentage: current > 0 ? 100 : 0,
          direction: current > 0 ? "up" : "same",
        };
      }
      const percentage = Math.abs(
        Math.round(((current - previous) / previous) * 100)
      );
      const direction: "up" | "down" | "same" =
        current > previous ? "up" : current < previous ? "down" : "same";
      return { percentage, direction };
    };

    const monthlyComp = calcComparison(
      thisMonthData?.word_count || 0,
      prevMonthData?.word_count || 0
    );
    const yearlyComp = calcComparison(
      thisYearData?.word_count || 0,
      prevYearData?.word_count || 0
    );

    const datesFor30Days: { date: Date; words: number }[] = [];
    calendarData.forEach((words, dateStr) =>
      datesFor30Days.push({ date: new Date(dateStr), words })
    );

    const today = new Date();
    const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
    const sixtyDaysAgo = new Date(new Date().setDate(today.getDate() - 60));

    const current30DaysWords = datesFor30Days
      .filter((d) => d.date > thirtyDaysAgo && d.date <= today)
      .reduce((sum, d) => sum + d.words, 0);
    const previous30DaysWords = datesFor30Days
      .filter((d) => d.date > sixtyDaysAgo && d.date <= thirtyDaysAgo)
      .reduce((sum, d) => sum + d.words, 0);
    const last30DaysComp = calcComparison(
      current30DaysWords,
      previous30DaysWords
    );

    const finalComparisonData: ComparisonData = {
      monthly: {
        current: thisMonthData?.word_count || 0,
        previous: prevMonthData?.word_count || 0,
        ...monthlyComp,
      },
      yearly: {
        current: thisYearData?.word_count || 0,
        previous: prevYearData?.word_count || 0,
        ...yearlyComp,
      },
      last30days: {
        current: current30DaysWords,
        previous: previous30DaysWords,
        ...last30DaysComp,
      },
    };

    // --- Personal Insights Calculation ---
    const dayCounts: { [day: number]: number } = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    calendarData.forEach(
      (words, dateStr) => (dayCounts[new Date(dateStr).getDay()] += words)
    );
    const maxDayIndex = Object.keys(dayCounts).reduce((a, b) =>
      dayCounts[Number(a)] > dayCounts[Number(b)] ? a : b
    );
    const dayNames = [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ];

    const activeDays = calendarData.size;
    const totalWords = cumulativeData.word_count;

    let bestMonthInfo = { month: "N/A", words: 0 };
    if (allMonthlyData.length > 0) {
      const best = allMonthlyData.reduce((prev, current) =>
        prev.word_count > current.word_count ? prev : current
      );
      bestMonthInfo = {
        month: `${best.year}年${best.month}月`,
        words: best.word_count,
      };
    }

    const totalMonthsWithReading = allMonthlyData.length;
    let bestYearInfo = { year: 0, words: 0 };
    if (yearlyData.length > 0) {
      const best = yearlyData.reduce((prev, current) =>
        prev.word_count > current.word_count ? prev : current
      );
      bestYearInfo = { year: best.year, words: best.word_count };
    }

    const finalPersonalInsightsData: PersonalInsightsData = {
      bestDayOfWeek: dayNames[Number(maxDayIndex)],
      bestMonth: bestMonthInfo,
      dailyAverage: activeDays > 0 ? Math.round(totalWords / activeDays) : 0,
      avgBooksPerMonth:
        totalMonthsWithReading > 0
          ? parseFloat(
              (cumulativeData.book_count / totalMonthsWithReading).toFixed(1)
            )
          : 0,
      avgWordsPerBook:
        cumulativeData.book_count > 0
          ? Math.round(cumulativeData.word_count / cumulativeData.book_count)
          : 0,
      bestYear: bestYearInfo,
      longestStreak: currentLongestStreak,
    };

    // --- Achievements Calculation ---
    const { book_count: totalBooks } = cumulativeData;
    const maxMonthlyWords = Math.max(
      0,
      ...allMonthlyData.map((m) => m.word_count)
    );
    const metrics = {
      totalWords,
      longestStreak: currentLongestStreak,
      maxMonthlyWords,
      totalBooks,
    };
    const categoryIcons: { [key: string]: React.ReactNode } = {
      累計読了文字数: <WordIcon className="w-6 h-6 text-yellow-400" />,
      連続読書日数: <CalendarIcon className="w-6 h-6 text-red-400" />,
      月間読了文字数: <TargetIcon className="w-6 h-6 text-secondary" />,
      累計読了作品数: <BookIcon className="w-6 h-6 text-primary" />,
    };

    const finalAchievements: AchievementCategory[] =
      ACHIEVEMENT_DEFINITIONS.map((cat) => {
        const currentValue = metrics[cat.metric as keyof typeof metrics];
        const unlockedAchievements = cat.achievements.filter(
          (ach) => currentValue >= ach.value
        );
        const latestAchievement =
          unlockedAchievements.length > 0
            ? unlockedAchievements[unlockedAchievements.length - 1]
            : null;
        const next = cat.achievements.find((ach) => currentValue < ach.value);
        const lastUnlockedValue = latestAchievement
          ? latestAchievement.value
          : 0;
        const progress = next
          ? Math.min(
              Math.max(
                ((currentValue - lastUnlockedValue) /
                  (next.value - lastUnlockedValue)) *
                  100,
                0
              ),
              100
            )
          : 100;

        return {
          name: cat.name,
          icon: categoryIcons[cat.name],
          achievements: cat.achievements,
          currentValue,
          unlockedCount: unlockedAchievements.length,
          totalCount: cat.achievements.length,
          nextAchievement: { achievement: next || null, progress },
          latestAchievement,
        };
      });

    // --- Reading trends calculation ---
    const dayCountsTrend: number[] = Array(7).fill(0);
    calendarData.forEach(
      (words, dateStr) => (dayCountsTrend[new Date(dateStr).getDay()] += words)
    );
    const trendsData = dayNames.map((day, index) => ({
      day,
      文字数: dayCountsTrend[index],
    }));

    return {
      achievementsByCategory: finalAchievements,
      readingTrendsData: trendsData,
      comparisonData: finalComparisonData,
      personalInsightsData: finalPersonalInsightsData,
      longestStreak: currentLongestStreak,
    };
  }, [cumulativeData, calendarData, allMonthlyData, yearlyData]);

  const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = "",
  }) => (
    <div
      className={`bg-surface-glass backdrop-blur-md border border-gray-700/50 rounded-xl shadow-lg p-4 md:p-6 ${className}`}
    >
      {children}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
        読書データダッシュボード
      </h1>

      <div className="flex items-center gap-2 text-sm text-gray-400 bg-surface/50 p-3 rounded-lg border border-gray-700/50">
        <InformationCircleIcon className="w-5 h-5 text-primary" />
        <span>
          ※このダッシュボードに表示されるデータは、読書データAPIの仕様に基づき、約3日前のものとなります。
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="累計読了作品数"
          value={cumulativeData.book_count.toLocaleString()}
          icon={<BookIcon className="w-8 h-8 text-primary" />}
          unit="作品"
        />
        <StatCard
          title="累計読了話数"
          value={cumulativeData.chapter_count.toLocaleString()}
          icon={<ChapterIcon className="w-8 h-8 text-secondary" />}
          unit="話"
        />
        <StatCard
          title="累計読了文字数"
          value={cumulativeData.word_count.toLocaleString()}
          icon={<WordIcon className="w-8 h-8 text-yellow-400" />}
          unit="文字"
        />
        <StatCard
          title="最長連続読書日数"
          value={longestStreak.toLocaleString()}
          icon={<CalendarIcon className="w-8 h-8 text-red-400" />}
          unit="日"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <LevelProgress data={levelData} />
        </Card>
        <Card className="flex flex-col">
          <ReadingGoal monthlyData={allMonthlyData} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComparisonStats data={comparisonData} />
        <PersonalInsights data={personalInsightsData} />
      </div>

      <Card>
        <h2 className="text-xl md:text-2xl font-bold text-on-surface mb-4">
          月間読書量推移 (直近12ヶ月)
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `${Number(value) / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2d2d2d",
                  border: "1px solid #555",
                  color: "#fff",
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="文字数" fill="#bb86fc" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl md:text-2xl font-bold text-on-surface mb-4">
          アクティビティカレンダー (直近1年)
        </h2>
        <ActivityCalendar data={calendarData} />
      </Card>

      <Card>
        <Achievements achievementsByCategory={achievementsByCategory} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <ReadingTrends data={readingTrendsData} />
        </Card>
        <Card>
          <h2 className="text-xl md:text-2xl font-bold text-on-surface mb-4">
            個人データ詳細
          </h2>
          <PersonalStats yearlyData={yearlyData} />
        </Card>
      </div>

      <Card>
        <Roadmap />
      </Card>
    </div>
  );
};

export default Dashboard;
