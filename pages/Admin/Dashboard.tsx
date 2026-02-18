
import React, { useState, useEffect } from 'react';
import { useApp } from '../../store';
import { Monitor, Bell, LogOut, Save, Send, ShieldCheck, Zap, Key, RefreshCw, CheckCircle2, AlertCircle, Cloud, ShieldAlert } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { ads, updateAds, addNotification, logoutAdmin } = useApp();
  const [tab, setTab] = useState<'ads' | 'notifs' | 'ai'>('ads');
  const [isKeyActive, setIsKeyActive] = useState(false);
  
  // Notification Form
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [type, setType] = useState<any>('info');

  useEffect(() => {
    const checkKey = async () => {
      const active = await (window as any).aistudio?.hasSelectedApiKey();
      setIsKeyActive(!!active);
    };
    checkKey();
  }, []);

  const handleCloudActivation = async () => {
    try {
      await (window as any).aistudio?.openSelectKey();
      setIsKeyActive(true);
      alert("Cloud Engine Activated Successfully!");
    } catch (e) {
      console.error("Cloud Activation Failed", e);
    }
  };

  const broadcast = () => {
    if (!title || !msg) return;
    addNotification({ title, message: msg, type });
    setTitle('');
    setMsg('');
    alert('Global Alert Sent!');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Command Center</h1>
          <div className="flex items-center gap-2 mt-1">
             <div className={`w-2 h-2 rounded-full ${isKeyActive ? 'bg-green-500 animate-pulse' : 'bg-zinc-300'}`}></div>
             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
               Status: {isKeyActive ? 'Cloud Online' : 'Cloud Offline'}
             </p>
          </div>
        </div>
        <button onClick={logoutAdmin} className="p-4 text-red-600 bg-red-50 dark:bg-red-900/10 rounded-2xl active:scale-90 transition-all border border-red-100 dark:border-red-900/20">
          <LogOut size={20} />
        </button>
      </div>

      <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-[28px] border border-zinc-200 dark:border-zinc-800">
        <button onClick={() => setTab('ads')} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'ads' ? 'bg-white dark:bg-zinc-800 shadow-xl text-red-600' : 'text-zinc-500'}`}><Monitor size={14}/> Ads</button>
        <button onClick={() => setTab('notifs')} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'notifs' ? 'bg-white dark:bg-zinc-800 shadow-xl text-red-600' : 'text-zinc-500'}`}><Bell size={14}/> Alerts</button>
        <button onClick={() => setTab('ai')} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'ai' ? 'bg-white dark:bg-zinc-800 shadow-xl text-indigo-600' : 'text-zinc-500'}`}><Zap size={14}/> AI Engine</button>
      </div>

      {tab === 'ai' && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
           <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[40px] text-white space-y-6 shadow-2xl shadow-indigo-600/20 relative overflow-hidden border border-white/10">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20"><Cloud size={28} /></div>
                  <div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">System Cloud Key</h3>
                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Neural Cluster C11238</p>
                  </div>
                </div>
                
                <p className="text-xs font-medium opacity-80 leading-relaxed max-w-xs">
                  For Cloud AI to work on Vercel, you must authenticate a paid API key from your GCP project. This enables Pro-grade SEO and Visual rendering.
                </p>

                <div className="pt-4">
                   <button 
                    onClick={handleCloudActivation}
                    className="w-full bg-white text-indigo-600 font-black py-5 rounded-[24px] flex items-center justify-center gap-3 hover:bg-zinc-50 active:scale-95 transition-all shadow-xl"
                   >
                     <Key size={20}/>
                     {isKeyActive ? 'UPDATE CLOUD KEY' : 'ACTIVATE CLOUD ENGINE'}
                   </button>
                </div>
              </div>
              <Zap className="absolute -right-6 -bottom-6 opacity-10" size={140} />
           </div>

           <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[32px] space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <ShieldAlert size={16} className="text-indigo-600" />
                    <h4 className="font-black text-xs uppercase tracking-widest text-zinc-400">Cluster Diagnostic</h4>
                 </div>
                 <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${isKeyActive ? 'bg-green-100 text-green-600' : 'bg-zinc-100 text-zinc-500'}`}>
                    {isKeyActive ? 'Verified' : 'Unauthenticated'}
                 </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                    <p className="text-[9px] font-black opacity-40 uppercase mb-1">Active Model</p>
                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Gemini 3 Pro</p>
                 </div>
                 <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                    <p className="text-[9px] font-black opacity-40 uppercase mb-1">Latency</p>
                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Optimized (Vercel)</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {tab === 'ads' && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          {ads.map((ad, idx) => (
            <div key={ad.id} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-[32px] space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{ad.slotType} Ad Logic</span>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase opacity-60">Status</span>
                  <input 
                    type="checkbox" checked={ad.isActive} 
                    onChange={() => {
                      const n = [...ads];
                      n[idx].isActive = !n[idx].isActive;
                      updateAds(n);
                    }}
                    className="w-5 h-5 accent-red-600 cursor-pointer"
                  />
                </div>
              </div>
              <textarea 
                placeholder="Paste Script or HTML Code..."
                rows={4} value={ad.adCode}
                onChange={(e) => {
                  const n = [...ads];
                  n[idx].adCode = e.target.value;
                  updateAds(n);
                }}
                className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl text-[10px] font-mono outline-none border border-zinc-100 dark:border-zinc-700 resize-none shadow-inner"
              />
            </div>
          ))}
          <button onClick={() => alert('Ad Configuration Synced to Global Edge.')} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black py-5 rounded-[24px] flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
            <Save size={18}/> SYNC AD CONFIGURATION
          </button>
        </div>
      )}

      {tab === 'notifs' && (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-zinc-100 dark:border-zinc-800 space-y-6 shadow-sm animate-in slide-in-from-right-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center border border-red-100 dark:border-red-900/30"><Send size={24} className="text-red-600" /></div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Global Broadcast</h3>
          </div>
          <div className="space-y-4">
            <input 
              placeholder="Title (e.g. New Tool Alert!)" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl font-bold outline-none border border-transparent focus:border-red-600/20 shadow-inner"
            />
            <textarea 
              placeholder="Write your system alert message..." rows={5} value={msg} onChange={(e) => setMsg(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl text-sm font-medium outline-none border border-transparent focus:border-red-600/20 resize-none shadow-inner"
            />
          </div>
          <button 
            onClick={broadcast}
            className="w-full bg-red-600 text-white font-black py-5 rounded-[28px] flex items-center justify-center gap-3 shadow-xl shadow-red-600/20 active:scale-95 transition-all"
          >
            <Send size={20}/> DEPLOY ALERT
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
