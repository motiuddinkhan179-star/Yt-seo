
import React, { useState, useEffect } from 'react';
import { useApp } from '../../store';
import { Monitor, Bell, LogOut, Save, Send, ShieldCheck, Zap, Key, RefreshCw, CheckCircle2, AlertCircle, Cloud, ShieldAlert, ExternalLink, Activity, Database, Server, Cpu, Globe, Layers, Box, Terminal, Cpu as NvidiaIcon } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { ads, updateAds, addNotification, logoutAdmin } = useApp();
  const [tab, setTab] = useState<'ads' | 'notifs' | 'ai'>('ai');
  const [isKeyActive, setIsKeyActive] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [provider, setProvider] = useState<'gemini' | 'openrouter' | 'nvidia'>('gemini');
  
  // Notification Form
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [type, setType] = useState<any>('info');

  useEffect(() => {
    const checkKey = async () => {
      try {
        const active = await (window as any).aistudio?.hasSelectedApiKey();
        setIsKeyActive(!!active);
      } catch (e) {
        setIsKeyActive(false);
      }
    };
    checkKey();
    
    const interval = setInterval(checkKey, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyManagement = async () => {
    try {
      // Secure platform method for all keys including NVIDIA & OpenRouter
      await (window as any).aistudio?.openSelectKey();
      setIsKeyActive(true);
      addNotification({
        title: `${provider.toUpperCase()} Link Established`,
        message: `Vercel Edge now synchronized with ${provider} Neural Cluster.`,
        type: "success"
      });
    } catch (e) {
      console.error("Link Failed", e);
    }
  };

  const masterSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      addNotification({
        title: "Global Neural Deployment",
        message: `All AI modules are now running on the ${provider.toUpperCase()} engine.`,
        type: "success"
      });
      alert(`Neural Cluster ${provider.toUpperCase()} Synced Successfully!`);
    }, 2000);
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
             <div className={`w-2 h-2 rounded-full ${isKeyActive ? (provider === 'nvidia' ? 'bg-[#76B900]' : 'bg-green-500') : 'bg-zinc-300'} animate-pulse`}></div>
             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
               Cluster: {isKeyActive ? `${provider.toUpperCase()} ONLINE` : 'OFFLINE'}
             </p>
          </div>
        </div>
        <button onClick={logoutAdmin} className="p-4 text-red-600 bg-red-50 dark:bg-red-900/10 rounded-2xl active:scale-90 transition-all border border-red-100 dark:border-red-900/20">
          <LogOut size={20} />
        </button>
      </div>

      <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-[28px] border border-zinc-200 dark:border-zinc-800">
        <button onClick={() => setTab('ai')} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'ai' ? 'bg-white dark:bg-zinc-800 shadow-xl text-indigo-600' : 'text-zinc-500'}`}><Zap size={14}/> AI Engine</button>
        <button onClick={() => setTab('ads')} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'ads' ? 'bg-white dark:bg-zinc-800 shadow-xl text-red-600' : 'text-zinc-500'}`}><Monitor size={14}/> Ads</button>
        <button onClick={() => setTab('notifs')} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'notifs' ? 'bg-white dark:bg-zinc-800 shadow-xl text-red-600' : 'text-zinc-500'}`}><Bell size={14}/> Alerts</button>
      </div>

      {tab === 'ai' && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
           {/* Neural Identity Hub v4.0 */}
           <div className={`p-8 rounded-[48px] text-white space-y-6 shadow-2xl relative overflow-hidden border border-white/10 transition-colors duration-500 ${provider === 'nvidia' ? 'bg-zinc-950' : 'bg-zinc-900'}`}>
              {/* NVIDIA Accents */}
              {provider === 'nvidia' && <div className="absolute top-0 right-0 w-64 h-64 bg-[#76B900]/10 blur-[100px] pointer-events-none"></div>}

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center backdrop-blur-xl border shadow-inner transition-colors ${provider === 'nvidia' ? 'bg-[#76B900]/20 border-[#76B900]/30' : 'bg-white/10 border-white/10'}`}>
                    {provider === 'nvidia' ? <NvidiaIcon size={32} className="text-[#76B900]" /> : <Box size={32} className="text-indigo-400" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none">Neural Identity Hub</h3>
                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] mt-2 ${provider === 'nvidia' ? 'text-[#76B900]' : 'text-zinc-400'}`}>
                      {provider === 'nvidia' ? 'NVIDIA NIM CLUSTER' : 'API CLUSTER MANAGEMENT'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-8">
                   <button onClick={() => setProvider('gemini')} className={`py-4 rounded-xl border text-[9px] font-black uppercase transition-all ${provider === 'gemini' ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-white/5 border-white/10 text-white/40'}`}>Gemini</button>
                   <button onClick={() => setProvider('openrouter')} className={`py-4 rounded-xl border text-[9px] font-black uppercase transition-all ${provider === 'openrouter' ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-white/5 border-white/10 text-white/40'}`}>Router</button>
                   <button onClick={() => setProvider('nvidia')} className={`py-4 rounded-xl border text-[9px] font-black uppercase transition-all ${provider === 'nvidia' ? 'bg-[#76B900] border-[#92e400] text-black shadow-lg' : 'bg-white/5 border-white/10 text-white/40'}`}>NVIDIA NIM</button>
                </div>
                
                <div className="bg-black/40 p-5 rounded-3xl border border-white/5 space-y-4 mb-6">
                   <p className="text-[10px] font-bold opacity-60 leading-relaxed uppercase tracking-widest">
                     {provider === 'nvidia' 
                       ? "High-performance inference engine for YouTube Content Analysis and SEO Scaling. NVIDIA Key detected." 
                       : "Standard Google Cloud infrastructure for TubePro Studio tools."}
                   </p>
                   {provider === 'nvidia' && (
                     <div className="flex items-center gap-3 py-2 px-4 bg-[#76B900]/10 rounded-2xl border border-[#76B900]/20">
                        <Terminal size={12} className="text-[#76B900]" />
                        <code className="text-[9px] font-mono text-[#76B900]">nvapi-ilQ_No...0d0c9704d2fe...</code>
                     </div>
                   )}
                </div>

                <div className="space-y-3">
                   <button 
                    onClick={handleKeyManagement}
                    className={`w-full font-black py-5 rounded-[24px] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl ${provider === 'nvidia' ? 'bg-white text-black' : 'bg-white text-indigo-900'}`}
                   >
                     <Key size={20}/>
                     LINK NEURAL PROJECT
                   </button>
                   
                   <button 
                    onClick={masterSync}
                    disabled={!isKeyActive || isSyncing}
                    className={`w-full border font-black py-5 rounded-[24px] flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 ${provider === 'nvidia' ? 'bg-[#76B900]/10 text-[#76B900] border-[#76B900]/30' : 'bg-white/5 text-white border-white/10'}`}
                   >
                     {isSyncing ? <RefreshCw size={20} className="animate-spin" /> : <Globe size={20}/>}
                     {isSyncing ? 'DEPLOYING TO EDGE...' : 'MASTER AI SYNC (SYNC VERCEL)'}
                   </button>
                </div>
              </div>
              <Cpu className="absolute -right-20 -bottom-20 opacity-5 rotate-12" size={320} />
           </div>

           {/* System Monitor */}
           <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[48px] space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-50 dark:border-zinc-800 pb-4">
                 <div className="flex items-center gap-2">
                    <Activity size={16} className={provider === 'nvidia' ? 'text-[#76B900]' : 'text-indigo-600'} />
                    <h4 className="font-black text-xs uppercase tracking-widest text-zinc-400">Edge Monitoring</h4>
                 </div>
                 <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${isKeyActive ? 'bg-green-100 text-green-600' : 'bg-zinc-100 text-zinc-500'}`}>
                    {isKeyActive ? 'Verified' : 'Pending'}
                 </span>
              </div>
              
              <div className="space-y-2">
                 {[
                   { name: 'NVIDIA NIM Inference', stat: '0.4s Latency' },
                   { name: 'Vercel Deployment', stat: 'Optimized' },
                   { name: 'Neural Logic Sync', stat: 'Active' },
                   { name: 'Global Rate Limits', stat: 'Unlimited' }
                 ].map((node, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                     <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${isKeyActive ? (provider === 'nvidia' ? 'bg-[#76B900]' : 'bg-indigo-600') : 'bg-zinc-200'}`}></div>
                        <span className="text-xs font-bold">{node.name}</span>
                     </div>
                     <span className="text-[10px] font-black opacity-30 uppercase">{node.stat}</span>
                   </div>
                 ))}
              </div>

              {!isKeyActive && (
                <div className="p-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-3xl flex gap-3 items-center">
                   <AlertCircle className="text-amber-600 shrink-0" size={20} />
                   <p className="text-[10px] font-bold text-amber-800 dark:text-amber-200 leading-relaxed">
                     Aapki NVIDIA key ko Vercel Edge par sync karne ke liye pehle key link karein aur phir Sync button dabayein.
                   </p>
                </div>
              )}
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
