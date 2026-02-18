
import React, { useState, useEffect } from 'react';
import { Wand2, Loader2, Zap, Image as ImageIcon, Download, Share2, Cloud, Key, AlertCircle, ShieldAlert } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import AdSlot from '../../components/AdSlot';

const ThumbnailBuilder: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [engine, setEngine] = useState<'pro' | 'flash' | 'idle'>('idle');
  const [hasKey, setHasKey] = useState(false);

  // Check key status on mount
  useEffect(() => {
    const checkKey = async () => {
      const selected = await (window as any).aistudio?.hasSelectedApiKey();
      setHasKey(!!selected);
    };
    checkKey();
  }, []);

  const handleKeySelection = async () => {
    await (window as any).aistudio?.openSelectKey();
    setHasKey(true);
  };

  const generateThumbnail = async () => {
    if (!prompt) return;
    
    // Ensure we have a key
    if (!hasKey) {
      await handleKeySelection();
    }

    setLoading(true);
    setImageUrl('');
    setEngine('pro');
    
    // Instantiate AI right before call to capture updated key state
    const currentKey = localStorage.getItem('custom_gemini_key') || process.env.API_KEY;
    const ai = new GoogleGenAI({ apiKey: currentKey as string });
    
    const promptText = `Viral, high-CTR YouTube Thumbnail design for: ${prompt}. Professional studio lighting, hyper-realistic, vibrant colors, clear focal point, optimized for mobile screens.`;

    try {
      // Step 1: Attempt Pro Visual Cluster (Highest Quality)
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: promptText }]
        },
        config: {
          imageConfig: { 
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        }
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
          setEngine('pro');
          setLoading(false);
          return;
        }
      }
      throw new Error("No image data returned from Pro cluster.");
    } catch (e: any) {
      console.warn("Pro Cluster Error. Diverting to Flash Cluster...", e);
      
      try {
        // Step 2: Fallback to high-speed Flash Cluster
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: promptText }]
          },
          config: {
            imageConfig: { aspectRatio: "16:9" }
          }
        });

        const fallbackParts = fallbackResponse.candidates?.[0]?.content?.parts || [];
        for (const part of fallbackParts) {
          if (part.inlineData) {
            setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            setEngine('flash');
            setLoading(false);
            return;
          }
        }
      } catch (innerE: any) {
        console.error("Critical Visual Engine Failure:", innerE);
        alert("Visual Engine is currently unreachable. Please verify your API Key billing status at ai.google.dev/gemini-api/docs/billing");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-pink-600 to-rose-700 text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <Cloud size={14} className="opacity-60" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Visual Lab v3.0</span>
          </div>
          <h1 className="text-2xl font-black italic">CLOURENDER ENGINE</h1>
          <p className="text-xs opacity-80 font-bold uppercase tracking-widest mt-1">High-CTR Thumbnail Logic</p>
        </div>
        <ImageIcon className="absolute -right-4 -bottom-4 opacity-10" size={120} />
      </div>

      {!hasKey && (
        <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-[32px] flex flex-col items-center text-center space-y-4">
           <Key className="text-indigo-600" size={32} />
           <div>
              <h3 className="font-black text-sm uppercase">Cloud Key Required</h3>
              <p className="text-[10px] font-bold text-zinc-500 max-w-[200px] mt-1">High-fidelity rendering requires a user-authenticated API key from a paid GCP project.</p>
           </div>
           <button 
             onClick={handleKeySelection}
             className="px-6 py-3 bg-indigo-600 text-white text-xs font-black rounded-2xl hover:bg-indigo-700 transition-all active:scale-95"
           >
             AUTHENTICATE CLOUD
           </button>
        </div>
      )}

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex justify-between items-center mr-2">
            <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Visual Concept Prompt</label>
            {engine !== 'idle' && (
              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${engine === 'pro' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
                Engine: {engine}
              </span>
            )}
          </div>
          <textarea 
            value={prompt} onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your video theme (e.g. A shocked man looking at a massive gold bitcoin)..."
            rows={3}
            className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-3xl outline-none font-bold text-sm border-2 border-transparent focus:border-rose-600/20 transition-all resize-none shadow-inner"
          />
        </div>
        <button 
          onClick={generateThumbnail} 
          disabled={loading || !prompt} 
          className="w-full bg-rose-600 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-rose-600/20 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} />} 
          {loading ? 'RENDERING...' : 'EXECUTE VISUAL BUILD'}
        </button>
      </div>

      <AdSlot type="Inline" />

      {imageUrl && (
        <div className="space-y-6 animate-in zoom-in duration-500">
          <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-900 relative group bg-zinc-100">
            <img src={imageUrl} alt="Cloud Generated" className="w-full h-auto aspect-video object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 backdrop-blur-md">
               <button onClick={() => {
                 const link = document.createElement('a');
                 link.href = imageUrl;
                 link.download = 'tubepro-thumbnail.png';
                 link.click();
               }} className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform">
                 <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-xl"><Download size={24}/></div>
                 <span className="text-[10px] font-black uppercase tracking-widest">Download</span>
               </button>
               <button className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform">
                 <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-xl"><Share2 size={24}/></div>
                 <span className="text-[10px] font-black uppercase tracking-widest">Share</span>
               </button>
            </div>
          </div>
          
          <div className="p-6 bg-zinc-900 text-white rounded-[32px] border border-white/5 space-y-2">
             <div className="flex items-center gap-2 text-rose-500">
                <ShieldAlert size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Model Verification</span>
             </div>
             <p className="text-[11px] font-bold opacity-60 leading-relaxed">
               Rendered via {engine === 'pro' ? 'Pro Logic Cluster (1K HD)' : 'Flash Hybrid Cluster (Standard)'}. 
               Usage compliant with Cloud AI licensing.
             </p>
          </div>
        </div>
      )}

      {engine === 'flash' && !loading && imageUrl && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-3xl flex gap-3 items-start">
          <AlertCircle className="text-yellow-600 shrink-0" size={18} />
          <p className="text-[10px] font-bold text-yellow-700 dark:text-yellow-200 leading-tight">
            PRO ACCESS DENIED: The Master Pro Cluster rejected the request. System successfully initialized Hybrid Fallback to prevent task interruption.
          </p>
        </div>
      )}
    </div>
  );
};

export default ThumbnailBuilder;
