
import React from 'react';
import { useApp } from '../store';
import { NAV_ITEMS } from '../constants';
import { AppRoute } from '../types';
import { Moon, Sun, Bell, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeRoute: string;
  onNavigate: (route: AppRoute) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRoute, onNavigate }) => {
  const { isDarkMode, toggleDarkMode, notifications } = useApp();
  const unreadCount = notifications.length;

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto bg-gray-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 shadow-2xl relative">
      {/* Header */}
      <header className="sticky top-0 z-[100] h-16 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(AppRoute.HOME)}>
          <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </div>
          <span className="font-extrabold text-xl tracking-tight">Tube<span className="text-red-600">Pro</span></span>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={toggleDarkMode} className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-90 border border-transparent dark:border-zinc-800">
            {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-zinc-500" />}
          </button>
          <button onClick={() => onNavigate(AppRoute.NOTIFICATIONS)} className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 relative transition-all active:scale-90">
            <Bell size={20} className="text-zinc-600 dark:text-zinc-400" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-red-600 text-[10px] text-white flex items-center justify-center rounded-full font-bold ring-2 ring-white dark:ring-[#0a0a0a]">
                {unreadCount}
              </span>
            )}
          </button>
          <button onClick={() => onNavigate(AppRoute.ADMIN)} className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 transition-all active:scale-90">
            <ShieldCheck size={20} className={activeRoute === AppRoute.ADMIN ? 'text-red-600' : 'text-zinc-600 dark:text-zinc-400'} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-6 pb-28">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/80 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-3xl flex justify-around items-center h-18 py-3 px-2 z-[100]">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as AppRoute)}
            className={`flex flex-col items-center justify-center transition-all duration-300 flex-1 relative
              ${activeRoute === item.id ? 'text-red-600' : 'text-zinc-400 dark:text-zinc-600'}`}
          >
            <div className={`p-2 rounded-2xl transition-all ${activeRoute === item.id ? 'bg-red-50 dark:bg-red-900/20 scale-110' : ''}`}>
              {React.cloneElement(item.icon as React.ReactElement, { size: activeRoute === item.id ? 22 : 20 })}
            </div>
            <span className={`text-[10px] font-bold mt-1 transition-opacity ${activeRoute === item.id ? 'opacity-100' : 'opacity-60'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;