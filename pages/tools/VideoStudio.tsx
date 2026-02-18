
import React, { useState, useRef } from 'react';
import { Video, Wand2, Subtitles, List, Scissors, Loader2, Play, Sparkles, Send, Copy, AlertCircle, RefreshCw, Film, Music, Palette, Zap, Upload, Eye, FileVideo } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import AdSlot from '../../components/AdSlot';

const getAI = () => {
  const customKey = localStorage.getItem('custom_gemini_key');
  const apiKey = customKey || process.env.API_KEY;
  return new GoogleGenAI({ apiKey: apiKey as string });
};

const VideoStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'veo' | 'blueprint' | 'pacing' | 'captions'>('upload');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setActiveTab('captions'); // Auto-switch to captions on upload
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const analyzeUploadedVideo = async () => {
    if (!videoFile) return;
    setLoading(true);
    try {
      const ai = getAI();
      const base64Data = await fileToBase64(videoFile);
      
      let systemInstruction = "";
      let schema: any = {};

      if (activeTab === 'captions') {
        systemInstruction = "You are an AI Video Editor. Transcribe the uploaded video and generate synchronized captions. Return an array of objects with 'timestamp' and 'text'. Make the text punchy and viral.";
        schema = {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timestamp: { type: Type.STRING },
              text: { type: Type.STRING }
            }
          }
        };
      } else if (activeTab === 'blueprint') {
        systemInstruction = "Analyze this video and provide a professional editing blueprint. Suggest where to cut, where to add B-roll, and where to apply zoom-ins for maximum retention.";
        schema = {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timestamp: { type: Type.STRING },
              action: { type: Type.STRING },
              benefit: { type: Type.STRING }
            }
          }
        };
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        contents: [
          {
            parts: [
              { inlineData: { data: base64Data, mimeType: videoFile.type } },
              { text: "Analyze this video as a pro editor." }
            ]
          }
        ],
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: schema
        }
      });

      setResults(JSON.parse(response.text || '[]'));
    } catch (e) {
      console.error(e);
      setResults({ error: "AI analysis failed. Your video might be too large for the current model limits." });
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
      <div className="bg-gradient-to-br from-zinc-900 to-black text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden border border-white/10">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">AI Editing Lab</span>
          </div>
          <h1 className="text-3xl font-black italic">PRO EDITOR STUDIO</h1>
          <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest mt-1">Automatic Captions & Logic-Based Editing</p>
        </div>
        <Zap className="absolute -right-6 -bottom-6 opacity-10 text-yellow-400" size={140} />
      </div>

      <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-[24px] overflow-x-auto no-scrollbar border border-zinc-200 dark:border-zinc-800">
        <button onClick={() => setActiveTab('upload')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'upload' ? 'bg-white dark:bg-zinc-800 shadow-xl text-zinc-900 dark:text-white' : 'text-zinc-500'}`}><Upload size={14}/> Upload</button>
        <button onClick={() => setActiveTab('captions')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'captions' ? 'bg-white dark:bg-zinc-800 shadow-xl text-indigo-600' : 'text-zinc-500'}`}><Subtitles size={14}/> Captions</button>
        <button onClick={() => setActiveTab('blueprint')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'blueprint' ? 'bg-white dark:bg-zinc-800 shadow-xl text-indigo-600' : 'text-zinc-500'}`}><Film size={14}/> Editing</button>
        <button onClick={() => setActiveTab('veo')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'veo' ? 'bg-white dark:bg-zinc-800 shadow-xl text-indigo-600' : 'text-zinc-500'}`}><Wand2 size={14}/> Veo AI</button>
      </div>

      {activeTab === 'upload' ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-video bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border-4 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all group relative overflow-hidden"
        >
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="video/*" />
          {previewUrl ? (
            <video src={previewUrl} className="absolute inset-0 w-full h-full object-cover opacity-50" muted />
          ) : null}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-[32px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform mb-4">
              <Upload size={32} className="text-indigo-600" />
            </div>
            <p className="text-sm font-black uppercase tracking-widest text-zinc-400 group-hover:text-indigo-600 transition-colors">
              {videoFile ? videoFile.name : 'Import Video for AI Edit'}
            </p>
            <p className="text-[10px] font-bold text-zinc-400 opacity-60 mt-2 uppercase tracking-[0.2em]">Supports MP4, MOV, WEBM</p>
          </div>
        </div>
      ) : activeTab === 'veo' ? (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 space-y-4 shadow-sm">
          <textarea 
            value={prompt} onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe a scene for AI to generate (e.g. A futuristic robot cooking in a neon kitchen)..."
            rows={4}
            className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-3xl outline-none font-bold text-sm resize-none border-2 border-transparent focus:border-indigo-600/20 transition-all"
          />
          <button 
            disabled={loading || !prompt} 
            className="w-full bg-indigo-600 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-xl"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
            Generate New Visuals
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-[40px] overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl bg-black aspect-video relative">
            {previewUrl ? (
              <video src={previewUrl} controls className="w-full h-full" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-zinc-600">
                <FileVideo size={48} className="mb-2 opacity-20" />
                <p className="text-[10px] font-black uppercase">Upload a video first</p>
              </div>
            )}
          </div>

          <button 
            onClick={analyzeUploadedVideo}
            disabled={loading || !videoFile}
            className="w-full bg-indigo-600 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
            {loading ? 'AI IS EDITING...' : `GENERATE ${activeTab.toUpperCase()}`}
          </button>
        </div>
      )}

      <AdSlot type="Inline" />

      {results && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4">
           <div className="flex justify-between items-center px-2">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-zinc-400">AI PRO PRODUCTION LOG</h3>
            <button onClick={() => copy(JSON.stringify(results, null, 2))} className="text-[10px] font-black text-zinc-500 flex items-center gap-1"><Copy size={12}/> EXPORT LOG</button>
          </div>

          <div className="space-y-3">
            {Array.isArray(results) ? results.map((item: any, i: number) => (
              <div key={i} className="group relative p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[32px] shadow-sm hover:border-indigo-500/30 transition-all flex gap-4">
                <div className="flex flex-col items-center gap-1">
                   <span className="text-[9px] font-black bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500">{item.timestamp}</span>
                   <div className="w-[1px] h-full bg-zinc-100 dark:bg-zinc-800"></div>
                </div>
                <div className="flex-1 space-y-1">
                  {activeTab === 'captions' ? (
                    <p className="text-sm font-black italic">"{item.text}"</p>
                  ) : (
                    <>
                      <p className="text-sm font-black flex items-center gap-2"><Scissors size={14} className="text-red-500"/> {item.action}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">{item.benefit}</p>
                    </>
                  )}
                </div>
                <button onClick={() => copy(item.text || item.action)} className="shrink-0 p-2 text-zinc-300 group-hover:text-indigo-600 transition-colors">
                  <Copy size={14} />
                </button>
              </div>
            )) : (
              <div className="p-6 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-3xl border border-red-100 dark:border-red-900/30 flex items-center gap-3">
                 <AlertCircle size={20} />
                 <p className="text-xs font-bold">{results.error}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="p-8 bg-zinc-900 text-white rounded-[40px] space-y-4 shadow-2xl overflow-hidden relative border border-white/5">
          <div className="flex items-center justify-between relative z-10">
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] opacity-40 text-indigo-400">Analysis Progress</h4>
              <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase tracking-widest">Model Active</span>
              </div>
          </div>
          <div className="flex gap-1 relative z-10 h-1">
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
                <div key={i} className={`flex-1 rounded-full ${loading ? 'animate-pulse' : ''} ${i % 3 === 0 ? 'bg-indigo-500' : 'bg-white/10'}`}></div>
              ))}
          </div>
          <p className="text-[9px] font-bold opacity-30 text-center uppercase tracking-widest relative z-10">Gemini 2.5 Logic-Flow Rendering</p>
      </div>
    </div>
  );
};

export default VideoStudio;
