
import React, { useState } from 'react';
import { DollarSign, Globe, PieChart, Info, Calculator, TrendingUp, Handshake, ShoppingCart } from 'lucide-react';
import AdSlot from '../components/AdSlot';

const Monetization: React.FC = () => {
  const [views, setViews] = useState('150000');
  const [niche, setNiche] = useState('Finance');
  
  const nicheCPM: Record<string, number> = {
    'Finance': 18.50, 'Tech': 12.20, 'Vlogs': 4.10, 'Gaming': 2.80, 'Education': 7.40, 'Comedy': 3.50, 'Cooking': 5.20, 'Health': 9.80, 'Travel': 8.30, 'Kids': 1.50
  };

  const estRev = (parseInt(views) / 1000) * (nicheCPM[niche] || 5);

  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-black">Revenue Intel</h1>
        <p className="text-sm text-zinc-500">Calculate AdSense, Brand Deals, and CPM.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center"><Calculator className="text-green-600" /></div>
          <h3 className="text-xl font-black">Earnings Predictor</h3>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Monthly Views</label>
            <input 
              type="number" value={views} onChange={(e) => setViews(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-[24px] text-2xl font-black outline-none border border-transparent focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Channel Niche</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.keys(nicheCPM).map(n => (
                <button 
                  key={n} onClick={() => setNiche(n)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all
                    ${niche === n ? 'bg-black dark:bg-white text-white dark:text-black border-transparent shadow-xl' : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-green-600 p-8 rounded-[32px] text-white text-center shadow-xl shadow-green-600/30">
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-2">Estimated Ad Revenue</p>
          <div className="text-5xl font-black mb-4">${estRev.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-[10px] font-bold uppercase backdrop-blur-md tracking-tighter">
            Based on ${nicheCPM[niche]} {niche} CPM
          </div>
        </div>
      </div>

      <AdSlot type="Inline" />

      <section className="space-y-4">
        <h3 className="text-xl font-black flex items-center gap-2"><Globe size={22} className="text-blue-500" /> Tier 1 CPM Zones</h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { c: 'USA', v: '$18.2', f: '🇺🇸' },
            { c: 'Germany', v: '$15.4', f: '🇩🇪' },
            { c: 'UK', v: '$14.1', f: '🇬🇧' },
            { c: 'Canada', v: '$13.8', f: '🇨🇦' },
            { c: 'Australia', v: '$12.9', f: '🇦🇺' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900 rounded-[24px] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-transform hover:scale-[1.01]">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{item.f}</span>
                <span className="text-sm font-black">{item.c}</span>
              </div>
              <span className="font-black text-red-600 text-lg">{item.v}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Monetization;
