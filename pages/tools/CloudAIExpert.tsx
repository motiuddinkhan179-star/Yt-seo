
import React, { useState } from 'react';
import { Cloud, Cpu, Sparkles, Loader2, Send, Copy, Zap, Info, ShieldCheck, BrainCircuit, AlertTriangle } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import AdSlot from '../../components/AdSlot';

const getAI = () => {
  const customKey = localStorage.getItem('custom_gemini_key');
  const apiKey = customKey || process.env.API_KEY;
  return new GoogleGenAI({ apiKey: apiKey as string });
};

const CloudAIExpert: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [engineTier, setEngineTier] = useState<'pro' | 'flash'>('pro');

  const handleConsult = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse(null);
    setError(null);
    setEngineTier('pro');
    
    const ai = getAI();
    const config = {
      systemInstruction: "You are the 'Cloud AI Assistant' for TubePro Suite. You specialize in advanced YouTube growth logic, complex content architecture, and multi-platform distribution strategy. Be detailed, authoritative, and data-driven.",
      thinkingConfig: { thinkingBudget: 4000 }
    };

    try {
      // Master Intelligence always attempts Pro first
      const result = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config
      });
      setResponse(result.text);
    } catch (e: any) {
      console.error("Pro Engine Failure:", e);
      const errorStr = JSON.stringify(e).toLowerCase();
      const msg = (e.message || "").toLowerCase();
      
      // If 403, 404, or 429, try Flash fallback
      if (msg.includes("403") || msg.includes("permission") || msg.includes("not found") || errorStr.includes("403")) {
        console.warn("Diverting to Flash Cluster for Expert reasoning...");
        try {
          const fallbackResult = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { ...config, thinkingConfig: { thinkingBudget: 1000 } }
          });
          setResponse(fallbackResult.text);
          setEngineTier('flash');
        } catch (innerE: any) {
          setError("Critical failure across all neural clusters. Error: " + innerE.message);
        }
      } else {
        setError("Neural link interrupted. Error: " + (e.message || "Unknown Connection Failure"));
      }
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Analysis copied!');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-black text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden border border-indigo-500/30">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20">
                <Cloud className="text-blue-400" />
             </div>
             <div>
                <h1 className="text-3xl font-black tracking-tighter italic">CLOUD AI ENGINE</h1>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Connected to Cluster: C11238</p>
             </div>
          </div>
          <p className="text-sm opacity-80 leading-relaxed font-medium max-w-xs">Global Master Intelligence for Creators. Powered by {engineTier === 'pro' ? 'Pro-Grade' : 'Hybrid'} Neural Networks.</p>
        </div>
        <BrainCircuit className="absolute -right-12 -bottom-12 opacity-10 text-blue-400 rotate-12" size={240} />
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-zinc-100 dark:border-zinc-800 space-y-6 shadow-xl relative group">
        <div className="space-y-2">
           <div className="flex justify-between items-center ml-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Master Intelligence Command</label>
              {engineTier === 'flash' && <span className="text-[8px] font-black bg-yellow-400 text-black px-2 rounded-full">HYBRID MODE ACTIVE</span>}
           </div>
           <textarea 
            value={prompt} onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything complex: 'Analyze my 30-day growth strategy' or 'Build a viral script architecture'..."
            rows={5}
            className="w-full bg-zinc-50 dark:bg-zinc-800 p-6 rounded-[32px] outline-none font-bold text-sm resize-none border-2 border-transparent focus:border-indigo-600/20 transition-all shadow-inner"
           />
        </div>
        
        <button 
          onClick={handleConsult}
          disabled={loading || !prompt}
          className="w-full bg-indigo-600 text-white font-black py-6 rounded-[32px] flex items-center justify-center gap-3 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-2xl shadow-indigo-600/30 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
          {loading ? 'AI IS THINKING...' : 'INITIALIZE CLOUD AI'}
        </button>
      </div>

      <AdSlot type="Inline" />

      {error && (
         <div className="p-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-[48px] flex items-start gap-4 animate-in slide-in-from-top-4">
            <AlertTriangle className="text-red-600 shrink-0 mt-1" size={24} />
            <div className="space-y-2">
               <h4 className="font-black text-sm uppercase text-red-600 tracking-widest">Neural Cluster Error</h4>
               <p className="text-xs font-bold opacity-80 leading-relaxed text-red-900 dark:text-red-200">{error}</p>
               <button 
                  onClick={() => (window as any).aistudio?.openSelectKey()}
                  className="px-4 py-2 bg-red-600 text-white text-[10px] font-black uppercase rounded-full hover:bg-red-700 transition-all"
               >
                  Verify Key Permissions
               </button>
            </div>
         </div>
      )}

      {response && (
        <div className="animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-zinc-900 text-white p-8 rounded-[48px] shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 relative z-10">
               <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${engineTier === 'pro' ? 'bg-blue-500' : 'bg-yellow-500'} rounded-full animate-pulse`}></div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">Analysis Complete ({engineTier === 'pro' ? 'Pro' : 'Hybrid'})</h3>
               </div>
               <button onClick={() => copy(response)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                  <Copy size={16} />
               </button>
            </div>
            
            <div className="prose prose-invert prose-sm max-w-none relative z-10">
               <p className="text-sm leading-relaxed font-bold opacity-90 whitespace-pre-wrap">{response}</p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
               <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                     {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[8px] font-black">{i}</div>)}
                  </div>
                  <span className="text-[9px] font-black uppercase opacity-40">Verification Nodes Active</span>
               </div>
               <ShieldCheck className="text-green-500/50" size={20} />
            </div>
            <Cloud className="absolute -left-20 -bottom-20 opacity-5 text-white" size={300} />
          </div>
        </div>
      )}

      <div className="p-8 bg-indigo-50 dark:bg-indigo-900/10 rounded-[40px] border border-indigo-100 dark:border-indigo-900/30 flex gap-4 items-start">
         <Info className="text-indigo-600 shrink-0 mt-1" size={20} />
         <div>
            <h4 className="font-black text-xs uppercase text-indigo-900 dark:text-indigo-200">Cloud AI Note</h4>
            <p className="text-[11px] font-bold text-indigo-600/80 leading-relaxed mt-1">This tool uses the Pro-Neural cluster for high-complexity requests. Hybrid mode may activate automatically on restricted keys to ensure continuous service.</p>
         </div>
      </div>
    </div>
  );
};

export default CloudAIExpert;
