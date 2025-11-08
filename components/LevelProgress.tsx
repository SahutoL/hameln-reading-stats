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
      <h2 className="text-xl font-bold text-on-surface flex items-center gap-2 mb-4">
        <TrophyIcon className="w-6 h-6 text-yellow-400" />
        読書レベル
      </h2>
      <div className="flex-grow flex flex-col justify-center">
        <div className="flex justify-between items-end mb-2">
          <span className="text-4xl font-bold text-primary">Lv. {level}</span>
          <p className="text-sm text-gray-400 font-mono">
            {expIntoCurrentLevel.toLocaleString()} /{" "}
            {requiredExpForNextLevel.toLocaleString()}
          </p>
        </div>
        <div className="w-full bg-black/30 rounded-full h-3.5 shadow-inner">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-3.5 rounded-full transition-all duration-500 ease-out relative"
            style={
              {
                width: `${progress}%`,
                boxShadow: `0 0 10px 0px ${
                  progress > 5 ? "var(--tw-shadow-color)" : "transparent"
                }`,
                "--tw-shadow-color": "rgba(187, 134, 252, 0.5)",
              } as React.CSSProperties
            }
          >
            {progress > 15 && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white/90">
                {progress.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
        <p className="text-right text-xs text-gray-400 mt-1 font-mono">
          Next:{" "}
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
