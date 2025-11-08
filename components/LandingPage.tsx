
import React from 'react';
import { LogoIcon, ChartBarIcon, TrophyIcon, KeyIcon, BadgeCheckIcon } from './icons';

interface LandingPageProps {
  onStart: () => void;
}

const Feature: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex flex-col items-center text-center p-6 bg-surface/50 rounded-xl border border-gray-800 transform hover:-translate-y-2 transition-transform duration-300 h-full">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-on-surface">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <div className="container mx-auto px-4">
          <LogoIcon className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
            あなたの読書体験を、<br className="md:hidden" />もっと豊かに。
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            小説投稿サイト「ハーメルン」の読書データを連携し、あなたの読書傾向を美しいグラフや統計で可視化します。自分だけの読書記録を分析し、新たな発見を楽しみましょう。
          </p>
          <button
            onClick={onStart}
            className="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-primary-variant transition-colors shadow-lg shadow-primary/20 transform hover:scale-105 duration-300"
          >
            さっそく始める (無料)
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-surface/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-on-surface">主な機能</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Feature icon={<ChartBarIcon className="w-12 h-12" />} title="詳細な読書分析">
              年別、月別の読書文字数から、曜日ごとの読書傾向までを可視化。あなたの読書ペースやパターンを深く理解できます。
            </Feature>
            <Feature icon={<BadgeCheckIcon className="w-12 h-12" />} title="実績システム">
              「累計100万文字読了」などの目標を達成すると実績をアンロック。ゲーミフィケーション要素で読書のモチベーションを高めます。
            </Feature>
            <Feature icon={<KeyIcon className="w-12 h-12" />} title="簡単・安全な連携">
              ハーメルンのアカウント情報を入力するだけで、安全に読書データを連携。複雑な設定は一切不要で、すぐに利用を開始できます。
            </Feature>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;