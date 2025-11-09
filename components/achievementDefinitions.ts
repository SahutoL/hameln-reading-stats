import { Achievement } from "../types";

interface AchievementDefinition {
  name: string;
  metric: string;
  achievements: Achievement[];
}

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    name: "累計読了文字数",
    metric: "totalWords",
    achievements: [
      {
        name: "読書家デビュー",
        description: "累計10万文字を読了",
        value: 100000,
        tier: "bronze",
      },
      {
        name: "本の虫",
        description: "累計100万文字を読了",
        value: 1000000,
        tier: "silver",
      },
      {
        name: "読書王",
        description: "累計1000万文字を読了",
        value: 10000000,
        tier: "gold",
      },
      {
        name: "読書の達人",
        description: "累計2500万文字を読了",
        value: 25000000,
        tier: "platinum",
      },
      {
        name: "書籍の探求者",
        description: "累計5000万文字を読了",
        value: 50000000,
        tier: "diamond",
      },
      {
        name: "活字の海を往く者",
        description: "累計1億文字を読了",
        value: 100000000,
        tier: "special",
      },
      {
        name: "図書館の主",
        description: "累計2億文字を読了",
        value: 200000000,
        tier: "special",
      },
      {
        name: "銀河系読書家",
        description: "累計5億文字を読了",
        value: 500000000,
        tier: "special",
      },
    ],
  },
  {
    name: "連続読書日数",
    metric: "longestStreak",
    achievements: [
      {
        name: "三日坊主卒業",
        description: "3日間連続で読書",
        value: 3,
        tier: "bronze",
      },
      {
        name: "週刊読書家",
        description: "7日間連続で読書",
        value: 7,
        tier: "silver",
      },
      {
        name: "皆勤賞",
        description: "30日間連続で読書",
        value: 30,
        tier: "gold",
      },
      {
        name: "努力家",
        description: "100日間連続で読書",
        value: 100,
        tier: "platinum",
      },
      {
        name: "年間読書家",
        description: "365日間連続で読書",
        value: 365,
        tier: "diamond",
      },
      {
        name: "生涯の伴侶",
        description: "730日間連続で読書",
        value: 730,
        tier: "special",
      },
    ],
  },
  {
    name: "月間読了文字数",
    metric: "maxMonthlyWords",
    achievements: [
      {
        name: "ロケットスタート",
        description: "月間10万文字を達成",
        value: 100000,
        tier: "bronze",
      },
      {
        name: "ブーストダッシュ",
        description: "月間50万文字を達成",
        value: 500000,
        tier: "silver",
      },
      {
        name: "月間ミリオン",
        description: "月間100万文字を達成",
        value: 1000000,
        tier: "gold",
      },
      {
        name: "超音速読書",
        description: "月間250万文字を達成",
        value: 2500000,
        tier: "platinum",
      },
      {
        name: "ワープドライブ",
        description: "月間500万文字を達成",
        value: 5000000,
        tier: "diamond",
      },
      {
        name: "ハイパースペース",
        description: "月間1000万文字を達成",
        value: 10000000,
        tier: "special",
      },
      {
        name: "異次元読書",
        description: "月間2000万文字を達成",
        value: 20000000,
        tier: "special",
      },
    ],
  },
  {
    name: "累計読了作品数",
    metric: "totalBooks",
    achievements: [
      {
        name: "初めの一歩",
        description: "累計10作品を読了",
        value: 10,
        tier: "bronze",
      },
      {
        name: "コレクター",
        description: "累計50作品を読了",
        value: 50,
        tier: "silver",
      },
      {
        name: "ライブラリアン",
        description: "累計100作品を読了",
        value: 100,
        tier: "gold",
      },
      {
        name: "書庫の管理人",
        description: "累計250作品を読了",
        value: 250,
        tier: "platinum",
      },
      {
        name: "読書ソムリエ",
        description: "累計500作品を読了",
        value: 500,
        tier: "diamond",
      },
      {
        name: "千の物語",
        description: "累計1000作品を読了",
        value: 1000,
        tier: "special",
      },
    ],
  },
];
