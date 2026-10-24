import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Database } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { loginAdmin, isCloudConnected } = useStore();

  const [email, setEmail] = useState('admin@renstone.store');
  const [password, setPassword] = useState('renstone2026');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoggingIn(true);

    const res = await loginAdmin(email, password);

    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please check credentials.');
    }

    setIsLoggingIn(false);
  };

  return (
    <div className="min-h-screen bg-obsidian-pure text-ivory flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-obsidian-surface rounded-lg p-8 border border-champagne/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-champagne/10 border border-champagne/40 flex items-center justify-center mx-auto text-champagne">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-widest text-ivory">
            RENSTONE Admin
          </h1>
          <p className="text-xs text-ivory/60">
            Sign in to manage catalog, inventory, orders, and store settings.
          </p>
        </div>

        {/* Database indicator */}
        <div className="p-3 bg-obsidian rounded border border-white/10 text-xs flex items-center gap-2 text-ivory/70">
          <Database className="w-4 h-4 text-champagne flex-shrink-0" />
          <span>
            {isCloudConnected 
              ? 'Connected to Supabase PostgreSQL & Auth' 
              : 'Local Demo Storage Active (Pre-configured login)'}
          </span>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/50 border border-red-500/50 text-red-200 text-xs rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-ivory/80">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ivory/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded pl-9 pr-3 py-2.5 text-ivory outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-ivory/80">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ivory/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded pl-9 pr-3 py-2.5 text-ivory outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3.5 bg-champagne hover:bg-champagne-light text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>{isLoggingIn ? 'Verifying...' : 'Access Admin Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-ivory/50 hover:text-champagne transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
