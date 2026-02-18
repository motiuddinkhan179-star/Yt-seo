
import React, { useState } from 'react';
import { Flame, Copy, Loader2, TrendingUp } from 'lucide-react';
import { generateHashtags } from '../../services/geminiService';

const PopularHashtagPage: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const handleAction = async () => {
    if (!niche) return;
    setLoading(true);
    try {
      const data = await generateHashtags(`Generate popular, high-volume hashtags for the niche: ${niche}`);
      setTags(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const copy = (t: string) => {
    const tag = t.startsWith('#') ? t : `#${t}`;
    navigator.clipboard.writeText(tag);
    alert('Hashtag Copied!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-600 text-white p-6 rounded-[32px] shadow-xl shadow-orange-600/20">
        <h1 className="text-2xl font-black">Popular Hashtags</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Top performing tags worldwide</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <input 
          value={niche} onChange={(e) => setNiche(e.target.value)}
          placeholder="Niche (e.g. Gaming, Shorts)..."
          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
        />
        <button onClick={handleAction} disabled={loading} className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Flame size={18} />} Fetch Top Hashtags
        </button>
      </div>

      {tags.length > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-[32px] border border-orange-100 dark:border-orange-900/30 animate-in fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-orange-600 flex items-center gap-2"><TrendingUp size={16}/> Popular List</h3>
            <button onClick={() => {navigator.clipboard.writeText(tags.join(' ')); alert('All Copied!');}} className="text-xs text-orange-600 font-bold">Copy All</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <button 
                key={i} 
                onClick={() => copy(t)}
                className="px-3 py-1.5 bg-white dark:bg-zinc-900 rounded-xl text-xs font-black text-orange-600 border border-orange-100 dark:border-orange-900/20 shadow-sm hover:border-orange-400 transition-all flex items-center gap-2 active:scale-95"
              >
                {t} <Copy size={10} className="opacity-40" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularHashtagPage;
