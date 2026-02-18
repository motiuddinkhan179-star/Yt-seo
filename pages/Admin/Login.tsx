
import React, { useState } from 'react';
import { useApp } from '../../store';
import { Lock, Mail, Loader2, ShieldAlert } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useApp();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const success = loginAdmin(email, password);
      if (!success) setError('Invalid credentials. Authorized personnel only.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 space-y-8 animate-in fade-in zoom-in">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-zinc-900 dark:bg-zinc-100 rounded-[32px] flex items-center justify-center mx-auto shadow-2xl transition-transform hover:rotate-12">
          <Lock className="text-white dark:text-black" size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Admin Portal</h1>
          <p className="text-sm text-zinc-500 mt-1">Khan Mohammad Ahmad access point.</p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-2xl border border-red-100 dark:border-red-900/30 flex items-center gap-3 animate-shake">
            <ShieldAlert size={16} /> {error}
          </div>
        )}
        
        <div className="space-y-1">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin Email"
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-600/50 transition-all font-medium"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="System Password"
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-600/50 transition-all font-medium"
              required
            />
          </div>
        </div>

        <button 
          type="submit" disabled={loading}
          className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-2xl"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Enter System'}
        </button>
      </form>
      
      <p className="text-[10px] text-zinc-400 uppercase tracking-widest text-center px-12 leading-relaxed font-bold">
        Strictly Monitored. IP 127.0.0.1 logged. Restricted to authorized admins.
      </p>
    </div>
  );
};

export default AdminLogin;
