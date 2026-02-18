
import React, { useState } from 'react';
import { useApp } from '../../store';
import { Monitor, Bell, LogOut, Save, Send, ShieldCheck, Zap, Key, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AdminDashboard: React.FC = () => {
  const { ads, updateAds, addNotification, logoutAdmin, activeApiKey, updateActiveApiKey } = useApp();
  const [tab, setTab] = useState<'ads' | 'notifs' | 'ai'>('ads');
  
  // Notification Form
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [type, setType] = useState<any>('info');

  // AI Key Builder State
  const [tempKey, setTempKey] = useState(activeApiKey);
  const [validating, setValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const broadcast = () => {
    if (!title || !msg) return;
    addNotification({ title, message: msg, type });
    setTitle('');
    setMsg('');
    alert('Broadcast Sent!');
  };

  const validateKey = async () => {
    if (!tempKey) return;
    setValidating(true);
    setValidationStatus('idle');
    try {
      const ai = new GoogleGenAI({ apiKey: tempKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'hi',
      });
      if (response.text) {
        setValidationStatus('valid');
        updateActiveApiKey(tempKey);
      }
    } catch (e) {
      setValidationStatus('invalid');
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black">Command Center</h1>
          <p className="text-sm text-zinc-500">System nodes: {activeApiKey ? 'Custom API Active' : 'Default ENV Active'}</p>
        </div>
        <button onClick={logoutAdmin} className="p-3 text-red-600 bg-red-50 dark:bg-red-900/10 rounded-2xl active:scale-90 transition-all">
          <LogOut size={20} />
        </button>
      </div>

      <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-[24px] overflow-x-auto no-scrollbar">
        <button onClick={() => setTab('ads')} className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'ads' ? 'bg-white dark:bg-zinc-800 shadow-xl text-red-600' : 'text-zinc-500'}`}><Monitor size={14}/> Ads</button>
        <button onClick={() => setTab('notifs')} className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'notifs' ? 'bg-white dark:bg-zinc-800 shadow-xl text-red-600' : 'text-zinc-500'}`}><Bell size={14}/> Alert</button>
        <button onClick={() => setTab('ai')} className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'ai' ? 'bg-white dark:bg-zinc-800 shadow-xl text-red-600' : 'text-zinc-500'}`}><Zap size={14}/> AI Engine</button>
      </div>

      {tab === 'ads' && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          {ads.map((ad, idx) => (
            <div key={ad.id} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-[32px] space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{ad.slotType} Slot</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold">Enabled</span>
                  <input 
                    type="checkbox" checked={ad.isActive} 
                    onChange={() => {
                      const n = [...ads];
                      n[idx].isActive = !n[idx].isActive;
                      updateAds(n);
                    }}
                    className="w-5 h-5 accent-red-600"
                  />
                </div>
              </div>
              <textarea 
                placeholder="Paste Script or Ad HTML Code here..."
                rows={4} value={ad.adCode}
                onChange={(e) => {
                  const n = [...ads];
                  n[idx].adCode = e.target.value;
                  updateAds(n);
                }}
                className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl text-[10px] font-mono outline-none border border-zinc-100 dark:border-zinc-700 resize-none"
              />
            </div>
          ))}
          <button onClick={() => alert('Ad Configuration Synced.')} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-600/30">
            <Save size={18}/> Deploy Ads
          </button>
        </div>
      )}

      {tab === 'ai' && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
           <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-zinc-100 dark:border-zinc-800 space-y-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center"><Key size={24} className="text-indigo-600" /></div>
                <h3 className="text-xl font-black">AI Key Manager</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Gemini API Key Builder</label>
                   <div className="relative">
                      <input 
                        type="password"
                        placeholder="Enter Gemini API Key..."
                        value={tempKey}
                        onChange={(e) => setTempKey(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 pr-14 rounded-3xl font-mono text-xs outline-none border-2 border-transparent focus:border-indigo-500/30 transition-all"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                         {validationStatus === 'valid' && <CheckCircle2 className="text-green-500" size={20} />}
                         {validationStatus === 'invalid' && <AlertCircle className="text-red-500" size={20} />}
                      </div>
                   </div>
                </div>

                <div className="flex gap-3">
                   <button 
                    onClick={validateKey}
                    disabled={validating || !tempKey}
                    className="flex-1 bg-indigo-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-indigo-600/20"
                   >
                     {validating ? <RefreshCw className="animate-spin" size={18}/> : <ShieldCheck size={18}/>}
                     {validating ? 'Verifying...' : 'Test & Save Key'}
                   </button>
                </div>
              </div>

              {validationStatus === 'valid' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30 text-center">
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Key successfully deployed to cluster</p>
                </div>
              )}
           </div>

           <div className="p-6 bg-zinc-900 text-white rounded-[32px] space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                 <h4 className="font-black text-xs uppercase tracking-widest opacity-60">Engine Status</h4>
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Operational</span>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-2xl">
                    <p className="text-[9px] font-black opacity-40 uppercase">Global Model</p>
                    <p className="text-xs font-bold">Gemini 3 Flash Pro</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl">
                    <p className="text-[9px] font-black opacity-40 uppercase">Latency</p>
                    <p className="text-xs font-bold">~1.2s avg</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {tab === 'notifs' && (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-zinc-100 dark:border-zinc-800 space-y-6 shadow-sm animate-in slide-in-from-right-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center"><Send size={24} className="text-red-600" /></div>
            <h3 className="text-xl font-black">Global Alert</h3>
          </div>
          <div className="space-y-4">
            <input 
              placeholder="Alert Title" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl font-bold outline-none border border-zinc-100 dark:border-zinc-700"
            />
            <textarea 
              placeholder="System message..." rows={5} value={msg} onChange={(e) => setMsg(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl text-sm outline-none border border-zinc-100 dark:border-zinc-700 resize-none"
            />
          </div>
          <button 
            onClick={broadcast}
            className="w-full bg-red-600 text-white font-black py-5 rounded-[24px] flex items-center justify-center gap-3 shadow-xl shadow-red-600/30"
          >
            <Send size={20}/> Broadcast Now
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
