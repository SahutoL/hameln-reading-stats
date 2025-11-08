import React from "react";
import { LevelData } from "../types";
import { TrophyIcon } from "./icons";

interface LevelProgressProps {
  data: LevelData;
}

const LevelProgress: React.FC<LevelProgressProps> = ({ data }) => {
  const { level, progress, expIntoCurrentLevel, requiredExpForNextLevel } =
    data;

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2 mb-4">
        <TrophyIcon className="w-6 h-6 text-yellow-400" />
        読書レベル
      </h2>
      <div className="flex-grow flex flex-col justify-center">
        <div className="flex justify-between items-end mb-2">
          <span className="text-4xl font-bold text-primary">Lv. {level}</span>
          <p className="text-sm text-gray-400">
            {expIntoCurrentLevel.toLocaleString()} /{" "}
            {requiredExpForNextLevel.toLocaleString()} EXP
          </p>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 shadow-inner">
          <div
            className="bg-gradient-to-r from-primary-variant to-primary h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-end"
            style={{ width: `${progress}%` }}
          >
            {progress > 10 && (
              <span className="text-xs font-bold text-white pr-2">
                {progress.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
        <p className="text-right text-xs text-gray-400 mt-1">
          次のレベルまであと{" "}
          {Math.max(
            0,
            requiredExpForNextLevel - expIntoCurrentLevel
          ).toLocaleString()}{" "}
          EXP
        </p>
      </div>
    </div>
  );
};

export default LevelProgress;
