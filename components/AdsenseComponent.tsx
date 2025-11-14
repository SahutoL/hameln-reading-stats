import React from 'react';
import { ExternalLinkIcon } from './icons';

const AffiliateBanner: React.FC = () => {
  return (
    <div className="w-full my-6 animate-fade-in">
      <div className="bg-surface-glass backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="/youware-icon-240.png"
            alt="YouWare icon"
            className="w-16 h-16 rounded-lg"
          />
        </div>
        <div className="flex-grow text-center sm:text-left">
          <p className="text-xs text-secondary font-semibold uppercase tracking-wider">開発者のおすすめツール</p>
          <h3 className="text-xl font-bold text-on-surface mt-1">
            YouWare
          </h3>
          <p className="text-sm text-gray-400 mt-1 max-w-lg">
            生産性を向上させるためのユーティリティツール。あなたのデジタルライフをより快適にします。
          </p>
        </div>
        <div className="flex-shrink-0 w-full sm:w-auto">
          <a
            href="https://www.youware.com/?via=greef"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-background bg-secondary rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <span>詳しく見る</span>
            <ExternalLinkIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AffiliateBanner;
