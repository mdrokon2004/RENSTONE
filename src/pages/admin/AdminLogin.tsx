import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Database, KeyRound, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { loginAdmin, isCloudConnected, isAdminAuthenticated } = useStore();

  const [email, setEmail] = useState('admin@renstone.store');
  const [password, setPassword] = useState('renstone2026');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // If already authenticated, redirect straight to /admin
  if (isAdminAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLoginSubmit = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setIsLoggingIn(true);

    const loginEmail = customEmail || email;
    const loginPass = customPass || password;

    const res = await loginAdmin(loginEmail, loginPass);

    if (res.success) {
      navigate('/admin', { replace: true });
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please check credentials.');
    }

    setIsLoggingIn(false);
  };

  const handleQuickDemoLogin = () => {
    handleLoginSubmit(undefined, 'admin@renstone.store', 'renstone2026');
  };

  return (
    <div className="min-h-screen bg-obsidian-pure text-ivory flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-obsidian-surface rounded-lg p-6 sm:p-8 border border-champagne/40 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <img
            src="/renstone-logo.png"
            alt="RENSTONE Logo"
            className="h-16 w-auto object-contain mx-auto rounded border border-champagne/40 shadow-md"
          />
          <h1 className="font-display text-xl font-bold uppercase tracking-widest text-champagne">
            Control Center
          </h1>
          <p className="text-xs text-ivory/60">
            Sign in to manage catalog, live inventory, orders, and store settings.
          </p>
        </div>

        {/* Database indicator */}
        <div className="p-3 bg-obsidian rounded border border-white/10 text-xs flex items-center gap-2 text-ivory/80">
          <Database className="w-4 h-4 text-champagne flex-shrink-0" />
          <span>
            {isCloudConnected 
              ? 'Connected to Supabase PostgreSQL & Auth' 
              : 'Local Demo Storage Active (Ready for instant entry)'}
          </span>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/50 border border-red-500/50 text-red-200 text-xs rounded">
            {errorMsg}
          </div>
        )}

        {/* Quick 1-Click Access Button */}
        <button
          type="button"
          onClick={handleQuickDemoLogin}
          disabled={isLoggingIn}
          className="w-full py-3.5 bg-champagne hover:bg-champagne-light text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
        >
          <KeyRound className="w-4 h-4" />
          <span>{isLoggingIn ? 'Entering Control Center...' : '1-Click Admin Access (Demo)'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-[10px] text-ivory/40 uppercase tracking-widest">or enter credentials</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <form onSubmit={(e) => handleLoginSubmit(e)} className="space-y-4 text-xs">
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
            className="w-full py-2.5 bg-obsidian hover:bg-white/10 border border-champagne/40 text-ivory font-display uppercase tracking-widest text-xs font-bold rounded transition-colors flex items-center justify-center gap-2"
          >
            <span>Sign In with Email</span>
          </button>
        </form>

        <div className="text-center pt-1 border-t border-white/10">
          <Link to="/" className="text-xs text-ivory/50 hover:text-champagne transition-colors">
            ← Return to Public Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};
