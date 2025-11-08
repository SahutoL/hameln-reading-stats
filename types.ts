export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface DailyData {
  daily_book_count: number;
  daily_chapter_count: number;
  daily_word_count: number;
}

// APIから返される各月の統計データ
export interface MonthlyStats {
  book_count: number;
  chapter_count: number;
  word_count: number;
  daily_data: { [day: string]: DailyData };
}

// アプリケーション内部で扱いやすいようにフラット化した月別データ
export interface MonthlyData extends MonthlyStats {
  year: number;
  month: number;
  // FIX: Add optional properties to fix type errors in PersonalStats.tsx where monthly data is augmented with additional properties.
  isBest?: boolean;
  avgWordsPerDay?: number;
}

// APIレスポンス全体の型定義
export interface ReadingDataResponse {
  data: {
    [year: string]: {
      [month: string]: MonthlyStats;
    };
  };
  fetched_at: string;
  cache_info: {
    cached: string;
    cached_at?: string;
  } | null;
}

export interface ApiErrorResponse {
  error: {
    code: number;
    message: string;
  };
  timestamp: string;
}

export interface ProcessedYearlyData {
  year: number;
  book_count: number;
  chapter_count: number;
  word_count: number;
  monthly_data: MonthlyData[];
}

export interface CumulativeData {
  book_count: number;
  chapter_count: number;
  word_count: number;
}

// For Reading Goal
export interface ReadingGoal {
  value: number; // The target word count
  month: string; // YYYY-MM format
}

// For Activity Calendar
export type CalendarData = Map<string, number>; // Map from "YYYY-MM-DD" to word_count

// For Level System
export interface LevelData {
  level: number;
  progress: number; // 0 to 100
  currentLevelExp: number; // Total EXP required to reach the current level
  totalExpForNextLevel: number; // Total EXP required to reach the next level
  expIntoCurrentLevel: number; // EXP gained since the last level up
  requiredExpForNextLevel: number; // EXP needed to get from current level to next
}

// For Dashboard Prop
export interface ProcessedData {
  allMonthlyData: MonthlyData[];
  yearlyData: ProcessedYearlyData[];
  cumulativeData: CumulativeData;
  calendarData: CalendarData;
  levelData: LevelData;
  // FIX: Add achievementsByCategory to the ProcessedData interface to resolve a type error in App.tsx.
  achievementsByCategory: AchievementCategory[];
}

// For Comparison Stats
export interface ComparisonData {
  monthly: {
    current: number;
    previous: number;
    percentage: number;
    direction: "up" | "down" | "same";
  };
  yearly: {
    current: number;
    previous: number;
    percentage: number;
    direction: "up" | "down" | "same";
  };
  last30days: {
    current: number;
    previous: number;
    percentage: number;
    direction: "up" | "down" | "same";
  };
}

// For Personal Insights
export interface PersonalInsightsData {
  bestDayOfWeek: string;
  bestMonth: {
    month: string;
    words: number;
  };
  dailyAverage: number;
  avgBooksPerMonth: number;
  avgWordsPerBook: number;
  bestYear: {
    year: number;
    words: number;
  };
  longestStreak: number;
}

// For new Achievements system
export interface Achievement {
  name: string;
  description: string;
  value: number;
}

export interface NextAchievement {
  achievement: Achievement | null;
  progress: number; // 0 to 100
}

export interface AchievementCategory {
  name: string;
  icon: React.ReactNode;
  achievements: Achievement[];
  currentValue: number;
  unlockedCount: number;
  totalCount: number;
  nextAchievement: NextAchievement;
  latestAchievement: Achievement | null;
}
