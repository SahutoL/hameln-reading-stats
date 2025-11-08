import React, { useState, useEffect, useCallback, useMemo } from "react";
import { hamelnApiService } from "./services/hamelnApiService";
import {
  ReadingDataResponse,
  DailyData,
  CumulativeData,
  ProcessedYearlyData,
  MonthlyData,
  ProcessedData,
} from "./types";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Spinner from "./components/Spinner";
import ErrorMessage from "./components/ErrorMessage";
import { LogoIcon } from "./components/icons";
import LandingPage from "./components/LandingPage";
import Modal from "./components/Modal";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { calculateLevelData } from "./utils/levelHelper";

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

      // 1. If valid, recent cache exists, use it and skip API calls.
      if (isCacheValidAndRecent) {
        console.log("Using recent cache. No API fetch needed.");
        setReadingData(cachedData);
        setIsLoading(false);
        return;
      }

      // Display stale data first if available, while fetching in the background.
      if (cachedData) {
        setReadingData(cachedData);
      }

      // 2. If no cache exists, perform initial full fetch.
      if (!cachedData) {
        console.log("No cache found. Performing initial full data fetch...");
        const data = await hamelnApiService.getReadingData(token);
        setReadingData(data);
        localStorage.setItem("cachedReadingData", JSON.stringify(data));
        localStorage.setItem("lastFetchTimestamp", Date.now().toString());
      }
      // 3. If cache is stale, perform a partial update for the last two months.
      else {
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

        // Merge new data into a deep copy of the old cached data.
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
      // If token exists, user is logged in
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
          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;
          calendarData.set(
            dateStr,
            monthStats.daily_data[dayStr].daily_word_count
          );
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

    return {
      allMonthlyData: sortedAllMonthlyData,
      yearlyData,
      cumulativeData: cumulative,
      calendarData,
      levelData,
    };
  }, [filteredReadingData]);

  const renderContent = () => {
    if (!token) {
      return (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onOpenModal={setModalContent}
        />
      );
    }

    if (isLoading && !readingData) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Spinner />
          <p className="mt-4 text-lg">読書データを取得中...</p>
        </div>
      );
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={fetchReadingData} />;
    }

    if (processedData) {
      return <Dashboard processedData={processedData} />;
    }

    // This case handles when there is a token, but no data yet (e.g., initial load after login)
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        <Spinner />
        <p className="mt-4 text-lg">データを準備中...</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <header className="p-4 bg-surface/30 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700/50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoIcon className="h-8 w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-on-surface">
              Hameln Reading Stats
            </h1>
          </div>
          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 bg-surface/50 rounded-md hover:bg-red-500/20 hover:text-red-400 transition-colors border border-gray-700"
            >
              <span>ログアウト</span>
            </button>
          ) : (
            <button
              onClick={() => setView("app")}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-variant rounded-md hover:bg-primary transition-colors"
            >
              始める
            </button>
          )}
        </div>
      </header>

      <div className="flex-grow">
        {view === "landing" && !token ? (
          <LandingPage onStart={() => setView("app")} />
        ) : (
          <main className="container mx-auto p-4 md:p-6">
            {renderContent()}
          </main>
        )}
      </div>

      <footer className="w-full bg-surface/30 border-t border-gray-700/50 py-4">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Hameln Reading Stats. All Rights
            Reserved.
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

      <Modal
        isOpen={modalContent !== null}
        onClose={() => setModalContent(null)}
        title={modalContent === "terms" ? "利用規約" : "プライバシーポリシー"}
      >
        {modalContent === "terms" && <TermsOfService />}
        {modalContent === "privacy" && <PrivacyPolicy />}
      </Modal>
    </div>
  );
};

export default App;
