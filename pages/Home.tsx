
import React, { useState, useEffect } from 'react';
import { Menu, Star, ChevronRight, Cloud, Zap, ShieldCheck, Activity } from 'lucide-react';
import AdSlot from '../components/AdSlot';
import { AppRoute } from '../types';
import { TOOL_GRID } from '../constants';

const Home: React.FC<{ onNavigate: (r: AppRoute) => void }> = ({ onNavigate }) => {
  const [isCloudActive, setIsCloudActive] = useState(false);

  useEffect(() => {
    const checkCloud = async () => {
      try {
        const active = await (window as any).aistudio?.hasSelectedApiKey();
        setIsCloudActive(!!active);
      } catch (e) {
        setIsCloudActive(false);
      }
    };
    checkCloud();
  }, []);

  return (
    <div className="space-y-6 pb-24">
      {/* App Header Bar */}
      <div className="flex items-center justify-between py-2 mb-4">
        <div className="flex items-center gap-4">
          <Menu className="text-zinc-400 dark:text-zinc-600" />
          <div className="flex items-center gap-1">
             <div className="bg-indigo-600 text-white px-2 py-0.5 rounded font-black text-xs">CLOUD</div>
             <div className="bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-900 text-white px-2 py-0.5 rounded font-black text-xs">AI</div>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${isCloudActive ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30' : 'bg-zinc-100 dark:bg-zinc-800 border-transparent opacity-60'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isCloudActive ? 'bg-green-500 animate-pulse' : 'bg-zinc-400'}`}></span>
          <span className={`text-[9px] font-black uppercase ${isCloudActive ? 'text-green-600' : 'text-zinc-500'}`}>
            {isCloudActive ? 'Cluster Active: C11238' : 'Cluster Offline'}
          </span>
        </div>
      </div>

      {/* Main Promo Action */}
      <div 
        onClick={() => onNavigate(AppRoute.CLOUD_AI)}
        className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-6 rounded-[32px] font-black shadow-2xl shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer flex items-center justify-between group overflow-hidden relative"
      >
        <div className="relative z-10">
           <h3 className="text-xl italic tracking-tighter">CLOUD AI EXPERT</h3>
           <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Initialize Global Brain</p>
        </div>
        <div className="bg-white/10 p-3 rounded-2xl relative z-10 group-hover:bg-white/20 transition-colors">
          <ChevronRight size={24} />
        </div>
        <Cloud className="absolute -right-4 -bottom-4 opacity-10" size={100} />
      </div>

      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg font-black tracking-tight">AI Master Suite</h2>
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-indigo-600" />
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Global Sync Ready</span>
          </div>
        </div>
        
        {/* The Grid */}
        <div className="grid grid-cols-3 gap-y-6 gap-x-3">
          {TOOL_GRID.map((tool, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(tool.id)}
              className="flex flex-col items-center group active:scale-90 transition-all"
            >
              <div className={`w-16 h-16 ${tool.color} dark:bg-zinc-900/50 rounded-[24px] flex items-center justify-center shadow-sm border border-zinc-100 dark:border-zinc-800/80 mb-2 group-hover:shadow-md group-hover:border-indigo-300 dark:group-hover:border-indigo-600 transition-all`}>
                {React.cloneElement(tool.icon as React.ReactElement, { size: 28 })}
              </div>
              <span className="text-[10px] font-bold text-center leading-tight text-zinc-700 dark:text-zinc-400 px-1 uppercase tracking-tighter">
                {tool.label.replace('AI ', '')}
              </span>
            </button>
          ))}
        </div>
      </section>

      <AdSlot type="Inline" />
      
      {/* Featured Tool */}
      <div 
        onClick={() => onNavigate(AppRoute.CONTENT)}
        className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-red-50 dark:bg-red-900/10 rounded-2xl flex items-center justify-center text-red-600">
              <Zap size={24} />
           </div>
           <div className="space-y-0.5">
             <h3 className="font-black text-sm uppercase tracking-tight">Cloud Script Engine</h3>
             <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">High-fidelity retention</p>
           </div>
        </div>
        <button className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-2xl group-hover:text-red-600 group-hover:translate-x-1 transition-all">
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="text-center py-4 flex flex-col items-center gap-1">
        <p className="text-[10px] font-black text-zinc-300 dark:text-zinc-800 uppercase tracking-[0.3em]">Cloud AI Architecture v3.0</p>
        <p className="text-[8px] font-black text-zinc-400 opacity-30 uppercase tracking-[0.5em]">API NODE: C1123863F33640019BA87D7CCFD5139C</p>
      </div>
    </div>
  );
};

export default Home;
