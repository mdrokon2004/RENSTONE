import React, { useState } from 'react';
import { useNavigate, Link, Navigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Database, CheckCircle2 } from 'lucide-react';
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
            Secure authentication required. Authorized store owners only.
          </p>
        </div>

        {/* Backend Status Notice */}
        <div className="p-3 bg-obsidian rounded border border-white/10 text-xs flex items-center gap-2 text-ivory/80">
          <Database className="w-4 h-4 text-champagne flex-shrink-0" />
          <span>
            {isCloudConnected
              ? 'Connected to Supabase PostgreSQL & Auth'
              : 'Secure Administrative Authentication Active'}
          </span>
        </div>

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
                placeholder="Enter admin email"
                disabled={isLoggingIn}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded pl-9 pr-3 py-2.5 text-ivory placeholder:text-ivory/30 outline-none"
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
                placeholder="Enter admin password"
                disabled={isLoggingIn}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded pl-9 pr-3 py-2.5 text-ivory placeholder:text-ivory/30 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3.5 bg-champagne hover:bg-champagne-light text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Shield className="w-4 h-4" />
            <span>{isLoggingIn ? 'Verifying Credentials...' : 'Sign In to Control Center'}</span>
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