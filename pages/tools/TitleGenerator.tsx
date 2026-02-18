
import React, { useState } from 'react';
import { Type, Copy, Loader2, Sparkles } from 'lucide-react';
import { generateTitles } from '../../services/geminiService';
import AdSlot from '../../components/AdSlot';

const TitleGeneratorPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);

  const handleAction = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await generateTitles(topic);
      setTitles(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-600 text-white p-6 rounded-[32px] shadow-xl shadow-purple-600/20">
        <h1 className="text-2xl font-black">AI Title Generator</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Maximize Click-Through Rate</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <input 
          value={topic} onChange={(e) => setTopic(e.target.value)}
          placeholder="Main topic or keyword..."
          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
        />
        <button onClick={handleAction} disabled={loading} className="w-full bg-purple-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />} Generate Viral Titles
        </button>
      </div>

      <AdSlot type="Inline" />

      {titles.length > 0 && (
        <div className="space-y-3 animate-in fade-in">
          {titles.map((t, i) => (
            <div key={i} className="p-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl flex justify-between items-center group shadow-sm">
              <span className="text-sm font-black leading-tight pr-4">{t}</span>
              <button onClick={() => {navigator.clipboard.writeText(t); alert('Title Copied!');}} className="p-2 text-zinc-300 group-hover:text-purple-600 transition-colors">
                <Copy size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TitleGeneratorPage;
