import React, { useState } from "react";
import {
  ClipboardDocumentListIcon,
  TrophyIcon,
  UserIcon,
  CogIcon,
  PaintBrushIcon,
  BellIcon,
} from "./icons";
import Modal from "./Modal";

interface RoadmapItemData {
  status: "開発中" | "計画中";
  title: string;
  description: string;
  longDescription: React.ReactNode;
  icon: React.ReactNode;
  statusColor: string;
}

const roadmapItems: RoadmapItemData[] = [
  {
    status: "開発中",
    title: "ランキング機能",
    description:
      "読書データをもとに、他ユーザーとの順位を表示する機能を追加します。",
    longDescription: (
      <>
        <h4 className="font-bold text-lg text-on-surface mb-2">概要：</h4>
        <p className="mb-4">
          読書文字数、レベル、実績ポイントなどを集計し、月・年・総合単位でのランキングを表示します。
        </p>
        <h4 className="font-bold text-lg text-on-surface mb-2">目的：</h4>
        <p>
          利用者が進捗を比較しやすくし、継続利用や行動データの可視化を促すことを目的としています。
        </p>
      </>
    ),
    icon: <TrophyIcon className="w-6 h-6 text-yellow-400" />,
    statusColor: "text-blue-300 bg-blue-900/50 border border-blue-500/50",
  },
  {
    status: "計画中",
    title: "ユーザープロフィールページ",
    description: "読書統計や取得データを集約した個人ページを実装します。",
    longDescription: (
      <>
        <h4 className="font-bold text-lg text-on-surface mb-2">概要：</h4>
        <p className="mb-4">
          総読書文字数、現在のレベル、称号、連続読書記録などを一覧で表示するページを追加します。
          個人の読書履歴を一元的に管理できるようにします。
        </p>
        <h4 className="font-bold text-lg text-on-surface mb-2">目的：</h4>
        <p>
          利用者が自身の読書履歴を簡潔に把握し、データの推移を確認できるようにすることを目的とします。
        </p>
      </>
    ),
    icon: <UserIcon className="w-6 h-6 text-green-400" />,
    statusColor: "text-purple-300 bg-purple-900/50 border border-purple-500/50",
  },
  {
    status: "計画中",
    title: "ダッシュボードのカスタマイズ機能",
    description:
      "ダッシュボード上のウィジェットを自由に配置できる機能を追加します。",
    longDescription: (
      <>
        <h4 className="font-bold text-lg text-on-surface mb-2">概要：</h4>
        <p className="mb-4">
          表示項目（目標、カレンダー、統計グラフなど）をドラッグ＆ドロップで並び替え可能にします。
          不要な要素を非表示にすることもできるようにします。
        </p>
        <h4 className="font-bold text-lg text-on-surface mb-2">目的：</h4>
        <p>
          利用者ごとの閲覧傾向に合わせた画面構成を可能にし、操作効率を改善します。
        </p>
      </>
    ),
    icon: <CogIcon className="w-6 h-6 text-gray-400" />,
    statusColor: "text-purple-300 bg-purple-900/50 border border-purple-500/50",
  },
  {
    status: "計画中",
    title: "テーマ設定機能",
    description: "ライトテーマおよびアクセントカラー変更機能を追加します。",
    longDescription: (
      <>
        <h4 className="font-bold text-lg text-on-surface mb-2">概要：</h4>
        <p className="mb-4">
          現在のダークテーマに加え、ライトテーマを選択可能にします。
          また、主要アクセントカラーを複数の候補から切り替えられるようにします。
        </p>
        <h4 className="font-bold text-lg text-on-surface mb-2">目的：</h4>
        <p>
          使用環境や照明条件に応じた画面調整を可能にし、視認性と利便性を向上させます。
        </p>
      </>
    ),
    icon: <PaintBrushIcon className="w-6 h-6 text-pink-400" />,
    statusColor: "text-purple-300 bg-purple-900/50 border border-purple-500/50",
  },
  {
    status: "計画中",
    title: "PWA機能の強化",
    description: "プッシュ通知によるリマインダー機能を追加します。",
    longDescription: (
      <>
        <h4 className="font-bold text-lg text-on-surface mb-2">概要：</h4>
        <p className="mb-4">
          Webプッシュ通知を利用し、連続読書記録の途切れや目標未達成を検知した際に通知を送信します。
        </p>
        <h4 className="font-bold text-lg text-on-surface mb-2">目的：</h4>
        <p>
          利用者が継続的にサービスを利用できるようにし、目標達成率を維持することを目的とします。
        </p>
      </>
    ),
    icon: <BellIcon className="w-6 h-6 text-red-400" />,
    statusColor: "text-purple-300 bg-purple-900/50 border border-purple-500/50",
  },
];

const RoadmapItem: React.FC<{
  item: RoadmapItemData;
  isLast: boolean;
  onClick: () => void;
}> = ({ item, isLast, onClick }) => (
  <div
    className="relative flex items-start group cursor-pointer"
    onClick={onClick}
  >
    {/* Timeline line and dot */}
    <div className="flex flex-col items-center mr-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface flex items-center justify-center border-2 border-primary/30 group-hover:border-primary transition-colors duration-300">
        {item.icon}
      </div>
      {!isLast && <div className="w-0.5 h-full bg-gray-700/50 mt-2"></div>}
    </div>

    {/* Content */}
    <div className="flex-grow pb-10 pt-2 transform group-hover:translate-x-1 transition-transform duration-300">
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
  const [selectedItem, setSelectedItem] = useState<RoadmapItemData | null>(
    null
  );

  return (
    <>
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
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>
      <Modal
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || ""}
      >
        {selectedItem && selectedItem.longDescription}
      </Modal>
    </>
  );
};

export default Roadmap;
