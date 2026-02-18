
import React from 'react';
import { useApp } from '../store';
import { Bell, Clock, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const Notifications: React.FC = () => {
  const { notifications } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-orange-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Activity</h1>
        <button className="text-xs text-red-600 font-bold">Clear All</button>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-50 space-y-4">
          <Bell size={48} className="text-gray-300" />
          <p className="text-sm font-medium">All caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-gray-100 dark:border-zinc-800 flex gap-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="shrink-0 pt-1">
                {getIcon(n.type)}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm leading-tight">{n.title}</h3>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium">
                    <Clock size={10} /> Just now
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {n.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
