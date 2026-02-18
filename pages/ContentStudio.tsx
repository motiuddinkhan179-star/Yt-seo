
import React, { useState } from 'react';
import { PenTool, Sparkles, Copy, Layout, Zap, Loader2, Type as TypeIcon, Smartphone, MessageSquare } from 'lucide-react';
// Updated to generateScript (singular)
import { generateScript, generateHooks } from '../services/geminiService';
import AdSlot from '../components/AdSlot';

const ContentStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'long' | 'shorts' | 'hooks' | 'cta'>('long');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [scriptResult, setScriptResult] = useState<any>(null);
  const [hooksResult, setHooksResult] = useState<string[]>([]);

  const handleAction = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      if (activeTab === 'long' || activeTab === 'shorts' || activeTab === 'cta') {
        const type = activeTab === 'long' ? '10-minute deep dive' : activeTab === 'shorts' ? '60-second viral short' : 'compelling Call to Action';
        // Updated to generateScript (singular)
        const data = await generateScript(topic, type);
        setScriptResult(data);
      } else {
        const data = await generateHooks(topic);
        setHooksResult(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copy = (t: string) => {
    navigator.clipboard.writeText(t);
    alert('Copied!');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Script Studio</h1>
        <p className="text-sm text-gray-500">From concept to word-perfect production.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-zinc-800 p-1 rounded-2xl">
        <button onClick={() => setActiveTab('long')} className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'long' ? 'bg-white dark:bg-zinc-700 text-red-600' : 'text-gray-500'}`}><Layout size={12}/> Longform</button>
        <button onClick={() => setActiveTab('shorts')} className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'shorts' ? 'bg-white dark:bg-zinc-700 text-red-600' : 'text-gray-500'}`}><Smartphone size={12}/> Shorts</button>
        <button onClick={() => setActiveTab('hooks')} className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'hooks' ? 'bg-white dark:bg-zinc-700 text-red-600' : 'text-gray-500'}`}><Zap size={12}/> Hooks</button>
        <button onClick={() => setActiveTab('cta')} className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'cta' ? 'bg-white dark:bg-zinc-700 text-red-600' : 'text-gray-500'}`}><MessageSquare size={12}/> CTAs</button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-6 rounded-3xl space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-gray-400">Video Topic</label>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} type="text" placeholder="Ex: AI Productivity Hacks" className="w-full bg-gray-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none" />
        </div>
        <button onClick={handleAction} disabled={loading || !topic} className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <PenTool size={18} />} {loading ? 'Thinking...' : 'Generate Content'}
        </button>
      </div>

      <AdSlot type="Header" />

      {activeTab !== 'hooks' && scriptResult && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-orange-50 dark:bg-orange-900/10 p-5 rounded-3xl border border-orange-100 dark:border-orange-900/30">
            <h3 className="font-bold text-orange-600 text-sm mb-2">The Hook</h3>
            <p className="text-xs italic leading-relaxed">"{scriptResult.hook}"</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-gray-100 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-3"><h3 className="font-bold text-sm">Full Output</h3><button onClick={() => copy(scriptResult.script)} className="text-xs text-red-600 font-bold">Copy All</button></div>
            <p className="text-[11px] text-gray-500 whitespace-pre-wrap leading-relaxed">{scriptResult.script}</p>
          </div>
        </div>
      )}

      {activeTab === 'hooks' && hooksResult.length > 0 && (
        <div className="space-y-3 animate-in fade-in">
          {hooksResult.map((h, i) => (
            <div key={i} className="p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl flex justify-between items-center gap-4">
              <p className="text-xs font-medium leading-relaxed">{h}</p>
              <button onClick={() => copy(h)} className="shrink-0 text-red-600"><Copy size={16}/></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentStudio;
