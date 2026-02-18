
import React, { useState } from 'react';
import { Image, Loader2, Sparkles, Copy, Palette } from 'lucide-react';
import { generateThumbnailConcepts } from '../../services/geminiService';
import AdSlot from '../../components/AdSlot';

const ThumbnailConceptsPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [concepts, setConcepts] = useState<any[]>([]);

  const handleAction = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await generateThumbnailConcepts(topic);
      setConcepts(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-pink-500 text-white p-6 rounded-[32px] shadow-xl shadow-pink-500/20">
        <h1 className="text-2xl font-black">Thumbnail AI</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Viral Visual Layout Designs</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <input 
          value={topic} onChange={(e) => setTopic(e.target.value)}
          placeholder="Video topic or main subject..."
          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
        />
        <button onClick={handleAction} disabled={loading} className="w-full bg-pink-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Image size={18} />} Generate Concepts
        </button>
      </div>

      <AdSlot type="Inline" />

      {concepts.length > 0 && (
        <div className="space-y-4 animate-in fade-in">
          {concepts.map((c, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/10 rounded-2xl flex items-center justify-center text-pink-500"><Sparkles size={20}/></div>
                  <h3 className="font-black text-sm text-pink-600">{c.concept}</h3>
               </div>
               <p className="text-xs text-zinc-500 leading-relaxed font-medium">{c.elements}</p>
               <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2"><Palette size={14} className="text-zinc-400"/><span className="text-[10px] font-black uppercase text-zinc-400">Palettes</span></div>
                  <span className="text-[10px] font-black">{c.colors}</span>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThumbnailConceptsPage;
