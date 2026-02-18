
import React, { useState } from 'react';
import { Grid, Lightbulb, TrendingUp, Sparkles, Loader2, Search, Target, ShieldCheck, Image, Compass, Copy } from 'lucide-react';
import { generateGrowthIdeas, analyzeNiche, generateThumbnailConcepts } from '../services/geminiService';
import AdSlot from '../components/AdSlot';

const CreatorToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ideas' | 'niche' | 'thumbs' | 'strategy'>('ideas');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [nicheData, setNicheData] = useState<any>(null);
  const [thumbs, setThumbs] = useState<any[]>([]);

  const handleAction = async () => {
    if (!input) return;
    setLoading(true);
    try {
      if (activeTab === 'ideas') {
        const data = await generateGrowthIdeas(input);
        setIdeas(data);
      } else if (activeTab === 'niche' || activeTab === 'strategy') {
        const data = await analyzeNiche(input);
        setNicheData(data);
      } else {
        const data = await generateThumbnailConcepts(input);
        setThumbs(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Growth Accelerator</h1>
        <p className="text-sm text-gray-500">Data-driven insights to outpace competitors.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-zinc-800 p-1 rounded-2xl">
        <button onClick={() => setActiveTab('ideas')} className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'ideas' ? 'bg-white dark:bg-zinc-700 text-red-600' : 'text-gray-500'}`}><Lightbulb size={12}/> Ideas</button>
        <button onClick={() => setActiveTab('niche')} className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'niche' ? 'bg-white dark:bg-zinc-700 text-red-600' : 'text-gray-500'}`}><Target size={12}/> Market</button>
        <button onClick={() => setActiveTab('thumbs')} className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'thumbs' ? 'bg-white dark:bg-zinc-700 text-red-600' : 'text-gray-500'}`}><Image size={12}/> Visuals</button>
        <button onClick={() => setActiveTab('strategy')} className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'strategy' ? 'bg-white dark:bg-zinc-700 text-red-600' : 'text-gray-500'}`}><Compass size={12}/> Roadmap</button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-6 rounded-3xl space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-gray-400">Niche or Topic</label>
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Ex: Finance, Vlogs..." className="w-full bg-gray-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none" />
        </div>
        <button onClick={handleAction} disabled={loading || !input} className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <TrendingUp size={18} />} Research
        </button>
      </div>

      <AdSlot type="Inline" />

      {activeTab === 'ideas' && ideas.map((idea, i) => (
        <div key={i} className="group bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-gray-100 dark:border-zinc-800 mb-3 animate-in slide-in-from-bottom-2 relative">
          <button 
            onClick={() => copy(`${idea.title}\n${idea.concept}`)}
            className="absolute top-4 right-4 p-2 text-zinc-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Copy size={16} />
          </button>
          <div className="flex justify-between items-center mb-2 pr-8"><h3 className="font-bold text-sm">{idea.title}</h3><span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-black">{idea.viralScore}%</span></div>
          <p className="text-[11px] text-gray-500 leading-relaxed pr-6">{idea.concept}</p>
        </div>
      ))}

      {activeTab === 'thumbs' && thumbs.map((t, i) => (
        <div key={i} className="group bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-gray-100 dark:border-zinc-800 mb-3 animate-in slide-in-from-bottom-2 space-y-2 relative">
          <button 
            onClick={() => copy(`Concept: ${t.concept}\nElements: ${t.elements}\nColors: ${t.colors}`)}
            className="absolute top-4 right-4 p-2 text-zinc-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Copy size={16} />
          </button>
          <h3 className="font-bold text-sm text-red-600 pr-8">{t.concept}</h3>
          <p className="text-[11px] text-gray-500 pr-6"><span className="font-bold text-gray-700 dark:text-gray-300">Elements:</span> {t.elements}</p>
          <div className="flex items-center gap-2"><span className="text-[10px] font-bold">Colors:</span> <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">{t.colors}</span></div>
        </div>
      ))}

      {(activeTab === 'niche' || activeTab === 'strategy') && nicheData && (
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-gray-100 dark:border-zinc-800 animate-in fade-in space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 text-center"><p className="text-[10px] text-red-600 font-bold">COMPETITION</p><p className="text-sm font-black">{nicheData.competition}</p></div>
            <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30 text-center"><p className="text-[10px] text-green-600 font-bold">AVG. CPM</p><p className="text-sm font-black">{nicheData.avgCpm}</p></div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-sm flex items-center gap-2"><ShieldCheck className="text-blue-500" size={16}/> Strategic Roadmap</h3>
            {nicheData.strategies.map((s: string, i: number) => (
              <div key={i} className="group relative flex gap-3 text-[11px] text-gray-500 border-l-2 border-red-600 pl-3 py-1">
                <span className="flex-1">{s}</span>
                <button 
                  onClick={() => copy(s)}
                  className="p-1 text-zinc-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Copy size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorToolkit;
