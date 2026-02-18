
import React, { useState } from 'react';
import { AppProvider, useApp } from './store';
import { AppRoute } from './types';
import Layout from './components/Layout';

// Core Pages
import Home from './pages/Home';
import Monetization from './pages/Monetization';
import Notifications from './pages/Notifications';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ContentStudio from './pages/ContentStudio';

// Dynamic Universal Page for 30+ tools
import UniversalToolPage from './pages/tools/UniversalToolPage';

// Specialized Tools
import ThumbnailDownloader from './pages/tools/ThumbnailDownloader';
import ThumbnailBuilder from './pages/tools/ThumbnailBuilder';
import ThumbnailEditor from './pages/tools/ThumbnailEditor';
import CloudAIExpert from './pages/tools/CloudAIExpert';

const AppContent: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<AppRoute>(AppRoute.HOME);
  const { isAdmin } = useApp();

  const handleNavigate = (route: AppRoute) => {
    setActiveRoute(route);
  };

  const renderPage = () => {
    // Check for specialized complex tools first
    switch (activeRoute) {
      case AppRoute.HOME:
        return <Home onNavigate={handleNavigate} />;
      case AppRoute.CLOUD_AI:
        return <CloudAIExpert />;
      case AppRoute.THUMBNAIL_DOWNLOADER:
        return <ThumbnailDownloader />;
      case AppRoute.THUMBNAIL_BUILDER:
        return <ThumbnailBuilder />;
      case AppRoute.THUMBNAIL_EDITOR:
        return <ThumbnailEditor />;
      case AppRoute.CONTENT:
        return <ContentStudio />;
      case AppRoute.MONETIZATION:
        return <Monetization />;
      case AppRoute.NOTIFICATIONS:
        return <Notifications />;
      case AppRoute.ADMIN:
        return isAdmin ? <AdminDashboard /> : <AdminLogin />;
    }

    // Default to Universal Tool Page for the 30+ defined tools
    const isSpecializedTool = Object.values(AppRoute).includes(activeRoute);
    if (isSpecializedTool) {
      return <UniversalToolPage route={activeRoute} />;
    }

    return <Home onNavigate={handleNavigate} />;
  };

  return (
    <Layout activeRoute={activeRoute} onNavigate={handleNavigate}>
      <div className="animate-in fade-in duration-300">
        {renderPage()}
      </div>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
