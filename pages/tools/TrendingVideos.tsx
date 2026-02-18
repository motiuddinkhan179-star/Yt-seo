
import React, { useState } from 'react';
import { TrendingUp, Loader2, Zap, ArrowUpRight, Copy } from 'lucide-react';
import { generateGrowthIdeas } from '../../services/geminiService';

const TrendingVideosPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState<any[]>([]);

  const handleAction = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await generateGrowthIdeas(input);
      setTrends(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const copy = (t: any) => {
    navigator.clipboard.writeText(`${t.title}\nConcept: ${t.concept}`);
    alert('Idea Copied!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-rose-500 text-white p-6 rounded-[32px] shadow-xl shadow-rose-500/20">
        <h1 className="text-2xl font-black">Trending Topics</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Predict the next viral surge</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <input 
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Niche (e.g. Finance, Tech)..."
          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
        />
        <button onClick={handleAction} disabled={loading} className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <TrendingUp size={18} />} Scan Trends
        </button>
      </div>

      {trends.length > 0 && (
        <div className="space-y-4 animate-in fade-in">
          {trends.map((t, i) => (
            <div key={i} className="group p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[32px] space-y-2 relative hover:border-rose-500/30 transition-all">
              <button 
                onClick={() => copy(t)}
                className="absolute top-6 right-6 p-2 text-zinc-300 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Copy size={16} />
              </button>
              <div className="flex justify-between items-center pr-8">
                <span className="text-[10px] font-black uppercase text-rose-500 bg-rose-50 px-2 py-1 rounded">High Viral Potential</span>
                <span className="font-black text-sm text-green-500 flex items-center gap-1">{t.viralScore}% <ArrowUpRight size={14}/></span>
              </div>
              <h3 className="font-black text-lg pr-8">{t.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed pr-6">{t.concept}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingVideosPage;
