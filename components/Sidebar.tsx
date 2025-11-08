import React from "react";
import { LogoIcon, DashboardIcon, LogoutIcon, XIcon } from "./icons";

interface SidebarProps {
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}> = ({ icon, label, active }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? "bg-primary/20 text-on-surface"
        : "text-gray-400 hover:bg-white/10 hover:text-on-surface"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ onLogout, isOpen, onClose }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface-glass backdrop-blur-xl border-r border-white/10 p-4 flex flex-col transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 mb-6">
        <div className="flex items-center gap-3">
          <LogoIcon className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold text-on-surface whitespace-nowrap">
            Hameln Stats
          </h1>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-gray-400 hover:text-white"
          aria-label="Close sidebar"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <NavItem
              icon={<DashboardIcon className="w-6 h-6" />}
              label="ダッシュボード"
              active
            />
          </li>
          {/* Future navigation items can be added here */}
        </ul>
      </nav>

      {/* Footer / Logout */}
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors rounded-lg"
        >
          <LogoutIcon className="w-6 h-6" />
          <span className="font-medium">ログアウト</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
