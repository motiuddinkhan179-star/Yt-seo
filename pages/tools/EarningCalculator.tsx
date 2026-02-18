
import React, { useState } from 'react';
import { Calculator, DollarSign, Loader2, TrendingUp } from 'lucide-react';

const EarningCalculatorPage: React.FC = () => {
  const [views, setViews] = useState('100000');
  const [cpm, setCpm] = useState('8.50');

  const earnings = (parseInt(views) / 1000) * parseFloat(cpm);

  return (
    <div className="space-y-6">
      <div className="bg-emerald-500 text-white p-6 rounded-[32px] shadow-xl shadow-emerald-500/20">
        <h1 className="text-2xl font-black">Earning Calculator</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Predict your AdSense revenue</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest px-1">Expected Monthly Views</label>
          <input 
            type="number" value={views} onChange={(e) => setViews(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-[24px] text-3xl font-black outline-none border-2 border-transparent focus:border-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest px-1">Estimated CPM ($)</label>
          <input 
            type="number" step="0.1" value={cpm} onChange={(e) => setCpm(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-[24px] text-3xl font-black outline-none border-2 border-transparent focus:border-emerald-500"
          />
        </div>

        <div className="bg-emerald-600 p-8 rounded-[40px] text-white text-center shadow-xl shadow-emerald-600/30">
          <p className="text-[10px] font-black opacity-80 uppercase tracking-widest mb-2">Estimated Monthly Revenue</p>
          <div className="text-5xl font-black mb-1">${earnings.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          <p className="text-[10px] font-bold opacity-60 italic">Based on provided metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
         <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center">
            <p className="text-[10px] font-black text-zinc-400 mb-1">YEARLY EST.</p>
            <p className="text-lg font-black text-emerald-600">${(earnings * 12).toLocaleString()}</p>
         </div>
         <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center">
            <p className="text-[10px] font-black text-zinc-400 mb-1">DAILY EST.</p>
            <p className="text-lg font-black text-emerald-600">${(earnings / 30).toLocaleString()}</p>
         </div>
      </div>
    </div>
  );
};

export default EarningCalculatorPage;
