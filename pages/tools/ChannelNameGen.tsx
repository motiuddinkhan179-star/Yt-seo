
import React, { useState } from 'react';
import { UserPlus, Loader2, Sparkles, Copy, Lightbulb } from 'lucide-react';
import { generateChannelNames } from '../../services/geminiService';

const ChannelNameGenPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState<string[]>([]);

  const handleAction = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await generateChannelNames(input);
      setNames(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-500 text-white p-6 rounded-[32px] shadow-xl shadow-red-500/20">
        <h1 className="text-2xl font-black">Channel Name AI</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Memorable branding in seconds</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-zinc-400">Describe your niche</label>
          <input 
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Technical reviews and AI news..."
            className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
          />
        </div>
        <button onClick={handleAction} disabled={loading} className="w-full bg-red-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />} Generate Brand Names
        </button>
      </div>

      {names.length > 0 && (
        <div className="space-y-3 animate-in fade-in">
          {names.map((n, i) => (
            <div key={i} className="p-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[24px] flex justify-between items-center group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center font-black text-red-500">{n[0]}</div>
                <span className="text-sm font-black">{n}</span>
              </div>
              <button onClick={() => {navigator.clipboard.writeText(n); alert('Name Copied!');}} className="text-zinc-300 group-hover:text-red-500 transition-colors"><Copy size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelNameGenPage;
