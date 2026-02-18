
import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Notification, AdConfiguration } from './types';

interface AppContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id' | 'timestamp'>) => void;
  clearNotifications: () => void;
  ads: AdConfiguration[];
  updateAds: (ads: AdConfiguration[]) => void;
  activeApiKey: string;
  updateActiveApiKey: (key: string) => void;
  isAdmin: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [activeApiKey, setActiveApiKey] = useState(() => localStorage.getItem('custom_gemini_key') || '');
  
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Welcome Creator!', message: 'Explore the AI SEO Engine to start ranking.', timestamp: new Date().toISOString(), type: 'success' }
    ];
  });
  const [ads, setAds] = useState<AdConfiguration[]>(() => {
    const saved = localStorage.getItem('ads_config');
    return saved ? JSON.parse(saved) : [
      { id: 'h1', provider: 'AdSense', slotType: 'Header', adCode: '', isActive: true },
      { id: 'i1', provider: 'Adsterra', slotType: 'Inline', adCode: '', isActive: true },
      { id: 'f1', provider: 'HilltopAds', slotType: 'Footer', adCode: '', isActive: true },
    ];
  });

  useLayoutEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ads_config', JSON.stringify(ads));
  }, [ads]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const updateActiveApiKey = (key: string) => {
    setActiveApiKey(key);
    localStorage.setItem('custom_gemini_key', key);
  };

  const addNotification = (n: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotif: Notification = { ...n, id: Date.now().toString(), timestamp: new Date().toISOString() as any };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const clearNotifications = () => setNotifications([]);

  const loginAdmin = (email: string, pass: string) => {
    if (email === 'khanmohammadahmad597@gmail.com' && pass === 'Ahmad@123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const updateAds = (newAds: AdConfiguration[]) => setAds(newAds);

  return (
    <AppContext.Provider value={{
      isDarkMode, toggleDarkMode, notifications, addNotification, clearNotifications, ads, updateAds, isAdmin, loginAdmin, logoutAdmin, activeApiKey, updateActiveApiKey
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
