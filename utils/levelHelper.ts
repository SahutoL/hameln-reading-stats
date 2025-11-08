import { LevelData } from "../types";

// Constants for level calculation
// Formula: required_exp_for_next = A * (current_level - 1)^2 + B
// B = 1000 (EXP for level 2)
// To reach level 60 at ~100,000,000 EXP, A is approx 1503.
const A_FACTOR = 1503;
const B_FACTOR = 1000;

export const calculateLevelData = (totalExp: number): LevelData => {
  if (totalExp < 0) totalExp = 0;

  let level = 1;
  let totalExpForNextLevel = B_FACTOR; // Exp to reach level 2
  let cumulativeExpForCurrentLevel = 0;

  while (totalExp >= totalExpForNextLevel) {
    level++;
    cumulativeExpForCurrentLevel = totalExpForNextLevel;
    const requiredExp = Math.floor(
      A_FACTOR * Math.pow(level - 1, 2) + B_FACTOR
    );
    totalExpForNextLevel += requiredExp;
  }

  const requiredExpForNextLevel =
    totalExpForNextLevel - cumulativeExpForCurrentLevel;
  const expIntoCurrentLevel = totalExp - cumulativeExpForCurrentLevel;

  const progress =
    requiredExpForNextLevel > 0
      ? (expIntoCurrentLevel / requiredExpForNextLevel) * 100
      : 100;

  return {
    level,
    progress: Math.min(100, progress),
    currentLevelExp: cumulativeExpForCurrentLevel,
    totalExpForNextLevel: totalExpForNextLevel,
    expIntoCurrentLevel: expIntoCurrentLevel,
    requiredExpForNextLevel: requiredExpForNextLevel,
  };
};
