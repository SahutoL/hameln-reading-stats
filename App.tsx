import React, { useState, useEffect, useCallback, useMemo } from "react";
import { hamelnApiService } from "./services/hamelnApiService";
import {
  ReadingDataResponse,
  DailyData,
  CumulativeData,
  ProcessedYearlyData,
  MonthlyData,
  ProcessedData,
  AchievementCategory,
  PersonalInsightsData,
} from "./types";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Spinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMessage";
import LandingPage from "./components/LandingPage";
import Modal from "./components/Modal";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { calculateLevelData } from "./utils/levelHelper";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import YearlyReport from "./components/YearlyReport";
import AchievementsPage from "./components/AchievementsPage";
import { ACHIEVEMENT_DEFINITIONS } from "./components/achievementDefinitions";
import {
  BookIcon,
  CalendarIcon,
  TargetIcon,
  WordIcon,
} from "./components/icons";

type View = "dashboard" | "yearly-report" | "achievements";

// 3 days ago filter
const getFilteredData = (
  data: ReadingDataResponse | null
): ReadingDataResponse | null => {
  if (!data) return null;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 3);
  cutoffDate.setHours(23, 59, 59, 999);

  const filteredData = JSON.parse(JSON.stringify(data));

  for (const yearStr in filteredData.data) {
    const year = parseInt(yearStr, 10);
    for (const monthStr in filteredData.data[yearStr]) {
      const month = parseInt(monthStr, 10);
      const monthData = filteredData.data[yearStr][monthStr];

      let newBookCount = 0;
      let newChapterCount = 0;
      let newWordCount = 0;

      const newDailyData: { [day: string]: DailyData } = {};

      for (const dayStr in monthData.daily_data) {
        const day = parseInt(dayStr, 10);
        const entryDate = new Date(year, month - 1, day);

        if (entryDate <= cutoffDate) {
          const daily = monthData.daily_data[dayStr];
          newDailyData[dayStr] = daily;
          newBookCount += daily.daily_book_count;
          newChapterCount += daily.daily_chapter_count;
          newWordCount += daily.daily_word_count;
        }
      }

      monthData.daily_data = newDailyData;
      monthData.book_count = newBookCount;
      monthData.chapter_count = newChapterCount;
      monthData.word_count = newWordCount;
    }
  }
  return filteredData;
};

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("hameln_token")
  );
  const [readingData, setReadingData] = useState<ReadingDataResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"landing" | "app">("landing");
  const [modalContent, setModalContent] = useState<"terms" | "privacy" | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("dashboard");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "");
      switch (hash) {
        case "yearly-report":
          setCurrentView("yearly-report");
          break;
        case "achievements":
          setCurrentView("achievements");
          break;
        case "dashboard":
        case "":
          setCurrentView("dashboard");
          break;
        default:
          window.location.hash = "/dashboard";
          setCurrentView("dashboard");
          break;
      }
      setIsSidebarOpen(false); // Close sidebar on navigation
    };

    window.addEventListener("hashchange", handleHashChange, false);
    // Initial load check
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange, false);
    };
  }, []);

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem("hameln_token", newToken);
    setToken(newToken);
    setError(null);
    localStorage.removeItem("cachedReadingData");
    localStorage.removeItem("lastFetchTimestamp");
    setView("app");
  };

  const handleLogout = () => {
    localStorage.removeItem("hameln_token");
    localStorage.removeItem("cachedReadingData");
    localStorage.removeItem("lastFetchTimestamp");
    setToken(null);
    setReadingData(null);
    window.location.hash = "";
    setView("landing");
  };

  const fetchReadingData = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    try {
      const cachedDataStr = localStorage.getItem("cachedReadingData");
      const lastFetchStr = localStorage.getItem("lastFetchTimestamp");
      const cachedData: ReadingDataResponse | null = cachedDataStr
        ? JSON.parse(cachedDataStr)
        : null;
      const lastFetch = lastFetchStr ? parseInt(lastFetchStr, 10) : 0;
      const threeDays = 3 * 24 * 60 * 60 * 1000;
      const isCacheValidAndRecent =
        cachedData && lastFetch && Date.now() - lastFetch < threeDays;

      if (isCacheValidAndRecent) {
        console.log("Using recent cache. No API fetch needed.");
        setReadingData(cachedData);
        setIsLoading(false);
        return;
      }

      if (cachedData) {
        setReadingData(cachedData);
      }

      if (!cachedData) {
        console.log("No cache found. Performing initial full data fetch...");
        const data = await hamelnApiService.getReadingData(token);
        setReadingData(data);
        localStorage.setItem("cachedReadingData", JSON.stringify(data));
        localStorage.setItem("lastFetchTimestamp", Date.now().toString());
      } else {
        console.log(
          "Cache is stale. Performing partial update for recent months..."
        );
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;

        const prevMonthDate = new Date(today);
        prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
        const prevMonthYear = prevMonthDate.getFullYear();
        const prevMonth = prevMonthDate.getMonth() + 1;

        const [currentMonthData, prevMonthData] = await Promise.all([
          hamelnApiService.getMonthReadingData(
            token,
            currentYear,
            currentMonth
          ),
          hamelnApiService.getMonthReadingData(token, prevMonthYear, prevMonth),
        ]);

        const updatedData = JSON.parse(JSON.stringify(cachedData));

        if (
          currentMonthData.data[currentYear] &&
          currentMonthData.data[currentYear][currentMonth]
        ) {
          if (!updatedData.data[currentYear])
            updatedData.data[currentYear] = {};
          updatedData.data[currentYear][currentMonth] =
            currentMonthData.data[currentYear][currentMonth];
        }
        if (
          prevMonthData.data[prevMonthYear] &&
          prevMonthData.data[prevMonthYear][prevMonth]
        ) {
          if (!updatedData.data[prevMonthYear])
            updatedData.data[prevMonthYear] = {};
          updatedData.data[prevMonthYear][prevMonth] =
            prevMonthData.data[prevMonthYear][prevMonth];
        }

        setReadingData(updatedData);
        localStorage.setItem("cachedReadingData", JSON.stringify(updatedData));
        localStorage.setItem("lastFetchTimestamp", Date.now().toString());
      }
    } catch (err: any) {
      setError(err.message);
      if (
        err.message.includes("401") ||
        err.message.toLowerCase().includes("token")
      ) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setView("app");
      fetchReadingData();
    } else {
      setView("landing");
    }
  }, [token, fetchReadingData]);

  const filteredReadingData = useMemo(
    () => getFilteredData(readingData),
    [readingData]
  );

  const processedData: ProcessedData | null = useMemo(() => {
    if (!filteredReadingData) {
      return null;
    }

    const flattenedData: MonthlyData[] = [];
    const calendarData: Map<string, number> = new Map();

    for (const yearStr in filteredReadingData.data) {
      const year = parseInt(yearStr, 10);
      const yearData = filteredReadingData.data[yearStr];
      for (const monthStr in yearData) {
        const month = parseInt(monthStr, 10);
        const monthStats = yearData[monthStr];
        if (monthStats.word_count > 0) {
          flattenedData.push({ year, month, ...monthStats });
        }
        for (const dayStr in monthStats.daily_data) {
          const day = parseInt(dayStr, 10);
          const dailyData = monthStats.daily_data[dayStr];
          if (dailyData.daily_word_count > 0) {
            const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
              day
            ).padStart(2, "0")}`;
            calendarData.set(dateStr, dailyData.daily_word_count);
          }
        }
      }
    }

    const sortedAllMonthlyData = flattenedData.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });

    const dataByYear: { [year: number]: ProcessedYearlyData } = {};
    const cumulative: CumulativeData = {
      book_count: 0,
      chapter_count: 0,
      word_count: 0,
    };

    for (const yearStr in filteredReadingData.data) {
      for (const monthStr in filteredReadingData.data[yearStr]) {
        const month = filteredReadingData.data[yearStr][monthStr];
        cumulative.book_count += month.book_count;
        cumulative.chapter_count += month.chapter_count;
        cumulative.word_count += month.word_count;
      }
    }

    const levelData = calculateLevelData(cumulative.word_count);

    sortedAllMonthlyData.forEach((month) => {
      if (!dataByYear[month.year]) {
        dataByYear[month.year] = {
          year: month.year,
          book_count: 0,
          chapter_count: 0,
          word_count: 0,
          monthly_data: [],
        };
      }
      dataByYear[month.year].book_count += month.book_count;
      dataByYear[month.year].chapter_count += month.chapter_count;
      dataByYear[month.year].word_count += month.word_count;
      dataByYear[month.year].monthly_data.push(month);
    });

    const yearlyData = Object.values(dataByYear).sort(
      (a, b) => b.year - a.year
    );

    // --- Longest Streak Calculation ---
    const sortedDates = Array.from(calendarData.keys()).sort();
    let longestStreak = 0;
    if (sortedDates.length > 0) {
      let currentStreak = 1;
      longestStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const diffDays =
          (new Date(sortedDates[i]).getTime() -
            new Date(sortedDates[i - 1]).getTime()) /
          (1000 * 60 * 60 * 24);
        currentStreak = Math.round(diffDays) === 1 ? currentStreak + 1 : 1;
        longestStreak = Math.max(longestStreak, currentStreak);
      }
    }

    // --- Achievements Calculation ---
    const { book_count: totalBooks, word_count: totalWords } = cumulative;
    const maxMonthlyWords = Math.max(
      0,
      ...sortedAllMonthlyData.map((m) => m.word_count)
    );
    const metrics = { totalWords, longestStreak, maxMonthlyWords, totalBooks };
    const categoryIcons: { [key: string]: React.ReactNode } = {
      累計読了文字数: <WordIcon className="w-6 h-6 text-yellow-400" />,
      連続読書日数: <CalendarIcon className="w-6 h-6 text-red-400" />,
      月間読了文字数: <TargetIcon className="w-6 h-6 text-secondary" />,
      累計読了作品数: <BookIcon className="w-6 h-6 text-primary" />,
    };

    const achievementsByCategory: AchievementCategory[] =
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

    return {
      allMonthlyData: sortedAllMonthlyData,
      yearlyData,
      cumulativeData: cumulative,
      calendarData,
      levelData,
      achievementsByCategory,
      longestStreak,
    };
  }, [filteredReadingData]);

  const renderCurrentView = () => {
    if (!processedData) return null;
    switch (currentView) {
      case "yearly-report":
        return <YearlyReport yearlyData={processedData.yearlyData} />;
      case "achievements":
        return (
          <AchievementsPage
            achievementsByCategory={processedData.achievementsByCategory}
          />
        );
      case "dashboard":
      default:
        return <Dashboard processedData={processedData} />;
    }
  };

  const renderContent = () => {
    if (view === "landing" && !token) {
      return (
        <div className="flex flex-col min-h-screen aurora-background">
          <header className="p-4 bg-transparent fixed top-0 left-0 right-0 z-10">
            <div className="container mx-auto flex items-center justify-end">
              <button
                onClick={() => setView("app")}
                className="px-5 py-2 text-sm font-medium text-white bg-primary/80 rounded-full hover:bg-primary transition-colors backdrop-blur-sm"
              >
                ログイン
              </button>
            </div>
          </header>
          <main className="flex-grow">
            <LandingPage onStart={() => setView("app")} />
          </main>
        </div>
      );
    }

    if (!token) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center aurora-background p-4">
          <Login
            onLoginSuccess={handleLoginSuccess}
            onOpenModal={setModalContent}
          />
        </div>
      );
    }

    return (
      <div className="flex h-screen aurora-background font-sans">
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            aria-hidden="true"
          ></div>
        )}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
          currentView={currentView}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <div className="flex-1 overflow-y-auto">
            <main className="flex-grow container mx-auto p-4 md:p-6">
              {isLoading && !readingData && (
                <div className="flex flex-col items-center justify-center h-full">
                  <Spinner />
                  <p className="mt-4 text-lg">読書データを取得中...</p>
                </div>
              )}
              {error && (
                <ErrorMessage message={error} onRetry={fetchReadingData} />
              )}
              {processedData && renderCurrentView()}
            </main>
            <footer className="w-full bg-transparent py-4 mt-auto">
              <div className="container mx-auto text-center text-gray-500 text-sm">
                <p>
                  &copy; {new Date().getFullYear()} Hameln Reading Stats. All
                  Rights Reserved.
                </p>
                <div className="mt-2 space-x-4">
                  <button
                    onClick={() => setModalContent("terms")}
                    className="hover:text-primary transition-colors"
                  >
                    利用規約
                  </button>
                  <span>|</span>
                  <button
                    onClick={() => setModalContent("privacy")}
                    className="hover:text-primary transition-colors"
                  >
                    プライバシーポリシー
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      <Modal
        isOpen={modalContent !== null}
        onClose={() => setModalContent(null)}
        title={modalContent === "terms" ? "利用規約" : "プライバシーポリシー"}
      >
        {modalContent === "terms" && <TermsOfService />}
        {modalContent === "privacy" && <PrivacyPolicy />}
      </Modal>
    </>
  );
};

export default App;
