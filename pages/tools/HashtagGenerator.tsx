
import React, { useState } from 'react';
import { Hash, Copy, Loader2, Flame } from 'lucide-react';
import { generateHashtags } from '../../services/geminiService';
import AdSlot from '../../components/AdSlot';

const HashtagGeneratorPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleAction = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await generateHashtags(input);
      setHashtags(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const copy = (h: string) => {
    const tag = h.startsWith('#') ? h : `#${h}`;
    navigator.clipboard.writeText(tag);
    alert('Hashtag Copied!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-600 text-white p-6 rounded-[32px] shadow-xl shadow-green-600/20">
        <h1 className="text-2xl font-black">Hashtag Generator</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Viral tags for Shorts and Videos</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <input 
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Video niche or topic..."
          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
        />
        <button onClick={handleAction} disabled={loading} className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Hash size={18} />} Generate Hashtags
        </button>
      </div>

      <AdSlot type="Inline" />

      {hashtags.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 animate-in fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2"><Flame size={16} className="text-orange-500"/> Trending Now</h3>
            <button onClick={() => {navigator.clipboard.writeText(hashtags.map(h => h.startsWith('#') ? h : `#${h}`).join(' ')); alert('Copied List!');}} className="text-xs text-green-600 font-bold">Copy List</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((h, i) => (
              <button 
                key={i} 
                onClick={() => copy(h)}
                className="text-sm font-black text-green-600 bg-green-50 dark:bg-green-900/10 px-3 py-1.5 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/20 transition-all flex items-center gap-1 active:scale-95"
              >
                #{h.replace('#', '')} <Copy size={10} className="opacity-40" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HashtagGeneratorPage;
