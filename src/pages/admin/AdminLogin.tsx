import React, { useState } from 'react';
import { useNavigate, Link, Navigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Database, AlertTriangle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAdmin, isCloudConnected, isAdminAuthenticated } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // If already authenticated and verified as admin, redirect to /admin
  if (isAdminAuthenticated) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';
    return <Navigate to={from} replace />;
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both your administrator email and password.');
      return;
    }

    setIsLoggingIn(true);
    const res = await loginAdmin(email.trim(), password);

    if (res.success) {
      navigate('/admin', { replace: true });
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please check your credentials.');
    }

    setIsLoggingIn(false);
  };

  return (
    <div className="min-h-screen bg-obsidian-pure text-ivory flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-obsidian-surface rounded-lg p-6 sm:p-8 border border-champagne/40 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <img
            src="/renstone-logo.png"
            alt="RENSTONE Logo"
            className="h-16 w-auto object-contain mx-auto rounded border border-champagne/40 shadow-md"
          />
          <h1 className="font-display text-xl font-bold uppercase tracking-widest text-champagne">
            Administrator Portal
          </h1>
          <p className="text-xs text-ivory/60">
            Secure authentication required. Authorized personnel only.
          </p>
        </div>

        {/* Backend Status Notice */}
        {isCloudConnected ? (
          <div className="p-3 bg-obsidian rounded border border-champagne/30 text-xs flex items-center gap-2 text-ivory/80">
            <Database className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Supabase Authentication & Row Level Security Active</span>
          </div>
        ) : (
          <div className="p-3.5 bg-amber-950/40 border border-amber-500/50 rounded text-xs space-y-2 text-amber-200">
            <div className="flex items-center gap-2 font-semibold text-amber-300">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Authentication Backend Required</span>
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              Secure admin login requires a connected Supabase database with Row Level Security.
              Add <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">VITE_SUPABASE_URL</code> and{' '}
              <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">VITE_SUPABASE_ANON_KEY</code> to your
              hosting environment variables and provision an admin in the database.
            </p>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-500/60 text-red-200 text-xs rounded leading-relaxed">
            {errorMsg}
          </div>
        )}

        {/* Secure Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-ivory/80">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ivory/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="admin@yourdomain.com"
                disabled={!isCloudConnected || isLoggingIn}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded pl-9 pr-3 py-2.5 text-ivory placeholder:text-ivory/30 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
                autoComplete="current-password"
                placeholder="••••••••••••"
                disabled={!isCloudConnected || isLoggingIn}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded pl-9 pr-3 py-2.5 text-ivory placeholder:text-ivory/30 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isCloudConnected || isLoggingIn}
            className="w-full py-3.5 bg-champagne hover:bg-champagne-light disabled:bg-champagne/30 text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            <Shield className="w-4 h-4" />
            <span>{isLoggingIn ? 'Authenticating with Supabase...' : 'Authenticate & Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10">
          <Link to="/" className="text-xs text-ivory/50 hover:text-champagne transition-colors">
            Return to Public Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};