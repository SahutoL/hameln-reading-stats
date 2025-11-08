import React from "react";
import { AchievementCategory } from "../types";
import Achievements from "./Achievements";

interface AchievementsPageProps {
  achievementsByCategory: AchievementCategory[];
}

const AchievementsPage: React.FC<AchievementsPageProps> = ({
  achievementsByCategory,
}) => {
  const { totalUnlocked, totalAchievements, overallProgress } =
    React.useMemo(() => {
      if (!achievementsByCategory)
        return { totalUnlocked: 0, totalAchievements: 0, overallProgress: 0 };
      const totalUnlocked = achievementsByCategory.reduce(
        (sum, cat) => sum + cat.unlockedCount,
        0
      );
      const totalAchievements = achievementsByCategory.reduce(
        (sum, cat) => sum + cat.totalCount,
        0
      );
      const overallProgress =
        totalAchievements > 0 ? (totalUnlocked / totalAchievements) * 100 : 0;
      return { totalUnlocked, totalAchievements, overallProgress };
    }, [achievementsByCategory]);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface">
          実績一覧
        </h1>
        <p className="text-gray-400 mt-1">あなたの読書の軌跡</p>
      </div>

      <div className="bg-surface-glass backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-on-surface mb-2">総合達成率</h2>
        <div className="flex justify-between items-baseline mb-1 text-sm">
          <span className="font-medium text-gray-300">
            {totalUnlocked} / {totalAchievements} 個
          </span>
          <span className="font-mono text-on-surface">
            {overallProgress.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      <Achievements achievementsByCategory={achievementsByCategory} />
    </div>
  );
};

export default AchievementsPage;
