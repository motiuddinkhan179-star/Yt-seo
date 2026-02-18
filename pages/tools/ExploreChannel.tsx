
import React, { useState } from 'react';
import { Compass, Loader2, Search, Info } from 'lucide-react';
import { analyzeNiche } from '../../services/geminiService';
import AdSlot from '../../components/AdSlot';

const ExploreChannelPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleAction = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await analyzeNiche(query);
      setData(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-teal-500 text-white p-6 rounded-[32px] shadow-xl shadow-teal-500/20">
        <h1 className="text-2xl font-black">Explore Channel</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Deep niche and competitor research</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <input 
          value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Niche or competitor name..."
          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
        />
        <button onClick={handleAction} disabled={loading} className="w-full bg-teal-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Search size={18} />} Analyze Niche
        </button>
      </div>

      <AdSlot type="Inline" />

      {data && (
        <div className="space-y-4 animate-in fade-in">
          <div className="grid grid-cols-2 gap-3">
             <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-3xl"><p className="text-[10px] font-black uppercase text-zinc-400">Competition</p><p className="font-black text-sm">{data.competition}</p></div>
             <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-3xl"><p className="text-[10px] font-black uppercase text-zinc-400">Avg. CPM</p><p className="font-black text-sm">{data.avgCpm}</p></div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4">
             <h3 className="font-black text-sm flex items-center gap-2"><Info size={16} className="text-teal-500"/> Strategic Roadmap</h3>
             {data.strategies.map((s: string, i: number) => (
               <div key={i} className="text-xs text-zinc-500 leading-relaxed pl-4 border-l-2 border-teal-500">{s}</div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreChannelPage;
