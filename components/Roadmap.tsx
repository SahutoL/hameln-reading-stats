import React from "react";
import { ClipboardDocumentListIcon, TrophyIcon } from "./icons";

const roadmapItems = [
  {
    status: "開発中",
    title: "ランキング機能",
    description:
      "読書文字数やレベルを他のユーザーと競い合えるランキング機能を追加予定です。週間、月間、総合ランキングなどを実装します。",
    icon: <TrophyIcon className="w-6 h-6 text-primary" />,
    statusColor: "text-blue-300 bg-blue-900/50 border border-blue-500/50",
  },
  // Example of a 'planned' item
  // {
  //   status: '計画中',
  //   title: '読書記録の詳細化',
  //   description: '各作品ごとの読了日や感想を記録できる機能を追加予定です。',
  //   icon: <BookIcon className="w-6 h-6 text-purple-400" />,
  //   statusColor: 'text-purple-300 bg-purple-900/50 border border-purple-500/50'
  // }
];

const RoadmapItem: React.FC<{
  item: (typeof roadmapItems)[0];
  isLast: boolean;
}> = ({ item, isLast }) => (
  <div className="relative flex items-start">
    {/* Timeline line and dot */}
    <div className="flex flex-col items-center mr-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface flex items-center justify-center border-2 border-primary/30">
        {item.icon}
      </div>
      {!isLast && <div className="w-0.5 h-full bg-gray-700/50 mt-2"></div>}
    </div>

    {/* Content */}
    <div className="flex-grow pb-10 pt-2">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-bold text-on-surface">{item.title}</h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${item.statusColor}`}
        >
          {item.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-400">{item.description}</p>
    </div>
  </div>
);

const Roadmap: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
        <ClipboardDocumentListIcon className="w-7 h-7 text-secondary" />
        今後のアップデート予定
      </h2>
      <div className="relative">
        {roadmapItems.map((item, index) => (
          <RoadmapItem
            key={index}
            item={item}
            isLast={index === roadmapItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
