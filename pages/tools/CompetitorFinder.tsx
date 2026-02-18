
import React, { useState } from 'react';
import { Users, Loader2, Target, ShieldCheck, Copy } from 'lucide-react';
import { findCompetitors } from '../../services/geminiService';

const CompetitorFinderPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [competitors, setCompetitors] = useState<any[]>([]);

  const handleAction = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await findCompetitors(input);
      setCompetitors(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 text-white p-6 rounded-[32px] shadow-xl shadow-indigo-600/20">
        <h1 className="text-2xl font-black">Competitor Insights</h1>
        <p className="text-xs opacity-80 font-bold uppercase tracking-wider">See what works for others</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <input 
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Topic or niche..."
          className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl outline-none font-bold text-sm"
        />
        <button onClick={handleAction} disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Users size={18} />} Find Competitors
        </button>
      </div>

      {competitors.length > 0 && (
        <div className="space-y-4 animate-in fade-in">
          {competitors.map((c, i) => (
            <div key={i} className="group p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[32px] space-y-4 shadow-sm relative">
              <button 
                onClick={() => copy(`Competitor: ${c.competitorType}\nStrength: ${c.strength}\nOpportunity: ${c.opportunity}`)}
                className="absolute top-6 right-6 p-2 text-zinc-300 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Copy size={16} />
              </button>
              <div className="flex items-center gap-3 pr-8">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl flex items-center justify-center text-indigo-600 font-black">{i+1}</div>
                <h3 className="font-black text-sm">{c.competitorType}</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="group/item relative p-3 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30">
                  <p className="text-[10px] font-black text-green-600 uppercase mb-1 flex items-center gap-1"><ShieldCheck size={10}/> Their Strength</p>
                  <p className="text-xs text-zinc-600 leading-relaxed pr-6">{c.strength}</p>
                  <button onClick={() => copy(c.strength)} className="absolute right-2 top-2 p-1 text-zinc-400 opacity-0 group-hover/item:opacity-100 transition-opacity"><Copy size={10}/></button>
                </div>
                <div className="group/item relative p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                  <p className="text-[10px] font-black text-red-600 uppercase mb-1 flex items-center gap-1"><Target size={10}/> Your Opportunity</p>
                  <p className="text-xs text-zinc-600 leading-relaxed pr-6">{c.opportunity}</p>
                  <button onClick={() => copy(c.opportunity)} className="absolute right-2 top-2 p-1 text-zinc-400 opacity-0 group-hover/item:opacity-100 transition-opacity"><Copy size={10}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetitorFinderPage;
