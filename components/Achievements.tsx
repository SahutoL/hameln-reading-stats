
import React, { useState } from 'react';
import { BadgeCheckIcon, TrophyIcon } from './icons';
import { Achievement, AchievementCategory } from '../types';
import Modal from './Modal';

interface AchievementItemProps {
  achievement: Achievement;
  unlocked: boolean;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement, unlocked }) => (
  <div className={`flex items-center p-3 rounded-lg transition-all duration-300 ${unlocked ? 'bg-green-900/30' : 'bg-surface/50'}`}>
    <BadgeCheckIcon className={`w-6 h-6 mr-3 flex-shrink-0 ${unlocked ? 'text-green-400' : 'text-gray-600'}`} />
    <div>
      <h4 className={`font-semibold ${unlocked ? 'text-on-surface' : 'text-gray-500'}`}>{achievement.name}</h4>
      <p className="text-sm text-gray-400">{achievement.description}</p>
    </div>
  </div>
);

const AchievementCategoryCard: React.FC<{ category: AchievementCategory, onCategoryClick: (category: AchievementCategory) => void }> = ({ category, onCategoryClick }) => {
    const { nextAchievement, latestAchievement } = category;
    const isComplete = !nextAchievement.achievement;

    return (
        <div 
            className={`bg-surface p-4 rounded-xl border border-gray-700/50 flex flex-col gap-3 transition-all duration-300 hover:border-primary hover:-translate-y-1 cursor-pointer ${isComplete ? 'border-yellow-400/50' : ''}`}
            onClick={() => onCategoryClick(category)}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {category.icon}
                    <h3 className="text-lg font-bold text-on-surface">{category.name}</h3>
                </div>
                <div className="text-sm font-medium text-gray-400">
                    {category.unlockedCount} / {category.totalCount}
                </div>
            </div>

            <div className="flex-grow space-y-2">
                {latestAchievement && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <BadgeCheckIcon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>最新の実績: <span className="font-semibold text-on-surface">{latestAchievement.name}</span></span>
                    </div>
                )}
            </div>

            <div className="mt-auto">
                 {isComplete ? (
                    <div className="text-center mt-1">
                        <div className="w-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full h-2 mb-2 shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-yellow-300 font-semibold flex items-center gap-1">
                                <TrophyIcon className="w-4 h-4" />
                                コンプリート！
                            </p>
                            <p className="text-xs text-gray-400">
                                現在: {category.currentValue.toLocaleString()}
                            </p>
                        </div>
                    </div>
                 ) : (
                    <>
                        <div className="text-xs text-gray-400 mb-1 flex justify-between">
                            <span>次の目標: {nextAchievement.achievement!.name}</span>
                            <span>{category.currentValue.toLocaleString()} / {nextAchievement.achievement!.value.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${nextAchievement.progress}%` }}></div>
                        </div>
                    </>
                 )}
            </div>
        </div>
    );
};

interface AchievementsProps {
  achievementsByCategory: AchievementCategory[];
}

const Achievements: React.FC<AchievementsProps> = ({ achievementsByCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | null>(null);

  if (!achievementsByCategory) return null;
  
  const handleCategoryClick = (category: AchievementCategory) => {
    setSelectedCategory(category);
  };
  
  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-on-surface mb-4">実績</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievementsByCategory.map((cat) => (
          <AchievementCategoryCard key={cat.name} category={cat} onCategoryClick={handleCategoryClick} />
        ))}
      </div>
      
      <Modal 
        isOpen={selectedCategory !== null} 
        onClose={handleCloseModal}
        title={selectedCategory ? `${selectedCategory.name} の実績` : ''}
      >
        {selectedCategory && (
            <div className="space-y-2">
                <p className="text-sm text-gray-400 pb-2 mb-2 border-b border-gray-700">
                    達成状況: {selectedCategory.unlockedCount} / {selectedCategory.totalCount}
                </p>
                {selectedCategory.achievements.map((ach) => (
                    <AchievementItem 
                        key={ach.name} 
                        achievement={ach} 
                        unlocked={selectedCategory.currentValue >= ach.value} 
                    />
                ))}
            </div>
        )}
      </Modal>
    </div>
  );
};

export default Achievements;