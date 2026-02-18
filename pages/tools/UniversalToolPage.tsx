
import React, { useState, useEffect } from 'react';
import { Loader2, Copy, Sparkles, Send, Zap, Info, Cloud, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { AppRoute } from '../../types';
import { TOOL_GRID } from '../../constants';
import AdSlot from '../../components/AdSlot';

const getAI = () => {
  const customKey = localStorage.getItem('custom_gemini_key');
  const apiKey = customKey || process.env.API_KEY;
  return new GoogleGenAI({ apiKey: apiKey as string });
};

interface UniversalToolPageProps {
  route: AppRoute;
}

const UniversalToolPage: React.FC<UniversalToolPageProps> = ({ route }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [engineStatus, setEngineStatus] = useState<'pro' | 'flash'>('pro');

  const toolInfo = TOOL_GRID.find(t => t.id === route) || TOOL_GRID[0];

  useEffect(() => {
    setInput('');
    setResult(null);
    setEngineStatus('pro');
  }, [route]);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    setResult(null);
    
    const ai = getAI();
    const commandText = `You are the Cloud AI Master for TubePro Suite. 
      Tool Operation: ${toolInfo.label}
      Engine Cluster: C11238
      User Context: ${input}
      
      Provide an advanced, high-level professional response. 
      If it's a list tool, return a JSON array of objects with 'title' and 'detail'.
      If it's an analysis tool, return a JSON object with 'summary' and 'steps'.
      Return JSON only.`;

    const requestConfig = {
      contents: commandText,
      config: {
        responseMimeType: "application/json"
      }
    };

    try {
      // Try Pro model first
      const response = await ai.models.generateContent({
        ...requestConfig,
        model: 'gemini-3-pro-preview'
      });
      const parsedData = JSON.parse(response.text || '{}');
      setResult(parsedData);
      setEngineStatus('pro');
    } catch (e: any) {
      const errorMsg = e.message || "";
      if (errorMsg.includes("403") || errorMsg.includes("permission")) {
        console.warn("Permission Denied for Pro. Falling back to Flash Cluster...");
        try {
          const fallbackResponse = await ai.models.generateContent({
            ...requestConfig,
            model: 'gemini-3-flash-preview'
          });
          const parsedFallback = JSON.parse(fallbackResponse.text || '{}');
          setResult(parsedFallback);
          setEngineStatus('flash');
        } catch (innerError) {
          setResult({ error: "Cloud Infrastructure failure. Please check your API Key configuration." });
        }
      } else {
        setResult({ error: "Neural link interrupted. Error: " + (errorMsg || "Unknown Connection Failure") });
      }
    } finally {
      setLoading(false);
    }
  };

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Analysis copied!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className={`${toolInfo.color} p-8 rounded-[40px] shadow-xl relative overflow-hidden`}>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/90 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-zinc-100/20">
            {React.cloneElement(toolInfo.icon as React.ReactElement, { size: 24 })}
          </div>
          <h1 className="text-2xl font-black text-zinc-900">{toolInfo.label}</h1>
          <div className="flex items-center gap-2 mt-1">
             <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] opacity-70">Cloud Engine v3.0 {engineStatus.toUpperCase()}</p>
             {engineStatus === 'flash' && <div className="px-2 py-0.5 bg-yellow-400 text-black text-[8px] font-black rounded-full">HYBRID MODE</div>}
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
          <Cloud size={140} />
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-zinc-400 ml-1 tracking-widest">Cloud Analysis Input</label>
          <textarea 
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Command Cloud AI..."
            rows={3}
            className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-3xl outline-none font-bold text-sm resize-none border-2 border-transparent focus:border-indigo-600/20 transition-all"
          />
        </div>
        <button 
          onClick={handleGenerate} 
          disabled={loading} 
          className="w-full bg-indigo-600 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-indigo-600/20"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
          {loading ? 'Processing via Cluster...' : `Execute Cloud Logic`}
        </button>
      </div>

      <AdSlot type="Inline" />

      {result && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Cloud size={12} className="text-indigo-500" /> CLOUD OUTPUT
            </h3>
            <button 
              onClick={() => copyResult(JSON.stringify(result, null, 2))}
              className="text-[10px] font-black text-zinc-500 flex items-center gap-1 hover:text-indigo-600"
            >
              <Copy size={12} /> EXPORT
            </button>
          </div>

          {result.error ? (
             <div className="p-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-[40px] flex items-start gap-4">
                <AlertCircle className="text-red-600 shrink-0" />
                <div className="space-y-1">
                   <h4 className="font-black text-xs uppercase text-red-600 tracking-widest">Neural Link Error</h4>
                   <p className="text-xs font-bold opacity-80 leading-relaxed text-red-900 dark:text-red-200">{result.error}</p>
                </div>
             </div>
          ) : Array.isArray(result) ? (
            <div className="grid grid-cols-1 gap-3">
              {result.map((item, i) => (
                <div key={i} className="group relative p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[32px] shadow-sm hover:border-indigo-500/30 transition-all">
                  <button 
                    onClick={() => copyResult(`${item.title}\n${item.detail}`)}
                    className="absolute top-6 right-6 p-2 text-zinc-300 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Copy size={16} />
                  </button>
                  <h4 className="font-black text-sm mb-2 text-zinc-800 dark:text-zinc-200 pr-8 uppercase tracking-tight">{item.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed pr-6 font-medium">{item.detail}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative p-8 bg-zinc-900 text-white rounded-[40px] shadow-2xl space-y-4 border border-indigo-500/20">
              <button 
                onClick={() => copyResult(result.summary || result.error || '')}
                className="absolute top-8 right-8 p-2 text-white/30 hover:text-white transition-colors"
              >
                <Copy size={18} />
              </button>
              <div className="flex items-center gap-2 text-indigo-400">
                <Sparkles size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Master Cloud Strategy</span>
              </div>
              <p className="font-bold leading-relaxed pr-8 text-sm opacity-90">{result.summary || result.error}</p>
              {result.steps && (
                <div className="space-y-3 mt-4 pt-4 border-t border-white/10">
                  {result.steps.map((s: string, i: number) => (
                    <div key={i} className="group/step relative flex gap-3 items-start">
                      <span className="w-5 h-5 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</span>
                      <p className="text-[11px] opacity-70 flex-1 font-medium">{s}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="py-10 text-center flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em]">
           <Cloud size={14} className="opacity-20" /> Powered by Cloud AI Master Engine
        </div>
        <span className="text-[9px] font-black text-zinc-500 tracking-widest opacity-40">CLUSTER ID: C1123863F336</span>
      </div>
    </div>
  );
};

export default UniversalToolPage;
