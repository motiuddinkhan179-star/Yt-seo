
import React, { useState } from 'react';
import { Search, Copy, CheckCircle, Hash, Type as TypeIcon, Loader2, Sparkles } from 'lucide-react';
import { generateSEO, generateTitles } from '../services/geminiService';
import AdSlot from '../components/AdSlot';

const SEOEngine: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'all' | 'titles'>('all');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runAnalysis = async () => {
    if (!input) return;
    setLoading(true);
    try {
      if (activeTool === 'all') {
        const data = await generateSEO(input);
        setResults(data);
      } else {
        const data = await generateTitles(input);
        setResults(data);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black">SEO Engine</h1>
        <p className="text-sm text-zinc-500">Professional keyword and search optimization.</p>
      </div>

      <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-2xl">
        <button onClick={() => {setActiveTool('all'); setResults(null);}} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTool === 'all' ? 'bg-white dark:bg-zinc-800 shadow-sm text-red-600' : 'text-zinc-500'}`}>Full Analysis</button>
        <button onClick={() => {setActiveTool('titles'); setResults(null);}} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTool === 'titles' ? 'bg-white dark:bg-zinc-800 shadow-sm text-red-600' : 'text-zinc-500'}`}>10+ Viral Titles</button>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Topic or Draft Title</label>
          <input 
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: How to grow on YouTube 2025"
            className="w-full bg-zinc-50 dark:bg-zinc-800 border-none p-4 rounded-2xl outline-none ring-2 ring-transparent focus:ring-red-600/20 transition-all font-medium"
          />
        </div>
        <button 
          onClick={runAnalysis} disabled={loading || !input}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          {loading ? 'Analyzing Algorithm...' : 'Generate SEO Package'}
        </button>
      </div>

      <AdSlot type="Inline" />

      {results && activeTool === 'all' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-zinc-900 text-white p-6 rounded-[32px] flex justify-between items-center shadow-xl">
            <span className="text-sm font-bold opacity-60 uppercase tracking-widest">SEO Score</span>
            <div className="flex items-center gap-3">
              <Sparkles size={20} className="text-yellow-400" />
              <span className="text-4xl font-black">{results.score}%</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-lg flex items-center justify-between px-1">
              Top 15 Ranking Tags
              <button onClick={() => copy(results.tags.join(', '))} className="text-xs text-red-600 uppercase font-bold">Copy All</button>
            </h3>
            <div className="flex flex-wrap gap-2">
              {results.tags.map((t: any, i: number) => (
                <button 
                  key={i} 
                  onClick={() => copy(t)}
                  className="px-4 py-2 bg-white dark:bg-zinc-900 rounded-xl text-xs font-medium border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-red-600/30 flex items-center gap-2 active:scale-95 transition-all"
                >
                  {t} <Copy size={10} className="opacity-40" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-black flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> AI Growth Strategy</h3>
              <button onClick={() => copy(results.suggestions.join('\n'))} className="text-[10px] font-black text-zinc-400 uppercase">Copy All</button>
            </div>
            <ul className="space-y-3">
              {results.suggestions.map((s: string, i: number) => (
                <li key={i} className="group relative">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 pl-4 border-l-2 border-red-600 leading-relaxed pr-8">
                    {s}
                  </div>
                  <button 
                    onClick={() => copy(s)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Copy size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {results && activeTool === 'titles' && (
        <div className="space-y-3 animate-in fade-in">
          <h3 className="font-black text-lg px-1">Viral Title Options</h3>
          {results.map((t: string, i: number) => (
            <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex justify-between items-center group">
              <p className="text-sm font-bold flex-1 pr-4">{t}</p>
              <button onClick={() => copy(t)} className="p-2 text-zinc-300 group-hover:text-red-600 transition-colors"><Copy size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SEOEngine;
