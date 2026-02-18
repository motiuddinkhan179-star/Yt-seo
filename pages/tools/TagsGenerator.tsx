
import React, { useState } from 'react';
import { Tag, Zap, Loader2, Copy } from 'lucide-react';
import { generateSEO } from '../../services/geminiService';
import AdSlot from '../../components/AdSlot';

const TagsGeneratorPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await generateSEO(topic);
      setTags(data.tags || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const copy = (t: string) => {
    navigator.clipboard.writeText(t);
    alert('Tag Copied!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-500 text-white p-6 rounded-[32px] shadow-xl shadow-orange-500/20">
        <h1 className="text-2xl font-black">AI Tags Generator</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">SEO Optimized Tags for 2025</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <input 
          value={topic} onChange={(e) => setTopic(e.target.value)}
          placeholder="Video Title or Subject..."
          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
        />
        <button onClick={handleGenerate} disabled={loading} className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} />} Generate Tags
        </button>
      </div>

      <AdSlot type="Inline" />

      {tags.length > 0 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-sm">Target Tags</h3>
            <button onClick={() => {navigator.clipboard.writeText(tags.join(', ')); alert('All Copied!');}} className="text-xs text-orange-600 font-bold">Copy All</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <button 
                key={i} 
                onClick={() => copy(t)}
                className="px-3 py-2 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl text-xs font-bold text-orange-700 dark:text-orange-400 hover:border-orange-500 transition-all flex items-center gap-2 active:scale-95"
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

export default TagsGeneratorPage;
