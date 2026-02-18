
import React, { useState } from 'react';
import { Tag, Copy, Loader2, Sparkles } from 'lucide-react';
import { generateSEO } from '../../services/geminiService';
import AdSlot from '../../components/AdSlot';

const TagsExtractorPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const handleAction = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await generateSEO(input);
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
      <div className="bg-blue-600 text-white p-6 rounded-[32px] shadow-xl shadow-blue-600/20">
        <h1 className="text-2xl font-black">Tags Extractor</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Analyze topics for ranking tags</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <input 
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Enter video topic or link..."
          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
        />
        <button onClick={handleAction} disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Tag size={18} />} Extract Tags
        </button>
      </div>

      <AdSlot type="Inline" />

      {tags.length > 0 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-sm">Extracted Tags</h3>
            <button onClick={() => {navigator.clipboard.writeText(tags.join(', ')); alert('Copied All!');}} className="text-xs text-blue-600 font-bold">Copy All</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <button 
                key={i} 
                onClick={() => copy(t)}
                className="px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl text-xs font-medium hover:border-blue-500/50 flex items-center gap-2 active:scale-95 transition-all"
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

export default TagsExtractorPage;
