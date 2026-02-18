
import React, { useState } from 'react';
import { Search, Loader2, TrendingUp, Copy } from 'lucide-react';
import { generateSEO } from '../../services/geminiService';
import AdSlot from '../../components/AdSlot';

const KeywordSuggestionPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleAction = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await generateSEO(`Generate 20 high-volume keywords for: ${input}`);
      setKeywords(data.tags || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const copy = (k: string) => {
    navigator.clipboard.writeText(k);
    alert('Keyword Copied!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-cyan-500 text-white p-6 rounded-[32px] shadow-xl shadow-cyan-500/20">
        <h1 className="text-2xl font-black">Keyword Suggestion</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Find what your audience searches for</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <input 
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Enter seed keyword (e.g. Cooking)..."
          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
        />
        <button onClick={handleAction} disabled={loading} className="w-full bg-cyan-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Search size={18} />} Get Suggestions
        </button>
      </div>

      {keywords.length > 0 && (
        <div className="grid grid-cols-1 gap-2 animate-in fade-in">
          <div className="flex justify-between items-center px-1 mb-2">
            <span className="text-[10px] font-black uppercase text-zinc-400">Results</span>
            <button onClick={() => {navigator.clipboard.writeText(keywords.join(', ')); alert('All Copied!');}} className="text-[10px] font-black text-cyan-500">COPY ALL</button>
          </div>
          {keywords.map((k, i) => (
            <div key={i} className="group p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex justify-between items-center hover:border-cyan-500/30 transition-all">
              <span className="text-sm font-bold">{k}</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => copy(k)}
                  className="p-2 text-zinc-300 hover:text-cyan-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Copy size={14} />
                </button>
                <TrendingUp size={14} className="text-green-500" />
              </div>
            </div>
          ))}
        </div>
      )}
      <AdSlot type="Footer" />
    </div>
  );
};

export default KeywordSuggestionPage;
