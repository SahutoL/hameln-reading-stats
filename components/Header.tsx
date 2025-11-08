import React from "react";
import { LogoIcon, MenuIcon } from "./icons";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="lg:hidden flex items-center justify-between p-4 bg-surface-glass/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <LogoIcon className="h-7 w-7 text-primary" />
        <span className="font-bold text-lg">Hameln Stats</span>
      </div>
      <button
        onClick={onMenuClick}
        className="text-gray-300 hover:text-white"
        aria-label="Open sidebar menu"
      >
        <MenuIcon className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;
