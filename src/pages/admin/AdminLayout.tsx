import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Tag, ShoppingCart, Settings, LogOut, 
  ExternalLink, Shield, Database, CheckCircle2, Menu, X 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCloudConnected, isAdminAuthenticated, adminEmail, logoutAdmin, isLoading } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-obsidian-pure flex items-center justify-center text-champagne p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest font-semibold">Verifying Administrator Session...</span>
        </div>
      </div>
    );
  }

  // Strict Server-Side Session Guard: Unauthenticated visitors redirected to login
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Tag },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F0EDE6] flex flex-col lg:flex-row">
      {/* Mobile Admin Header */}
      <div className="lg:hidden bg-obsidian-pure text-ivory p-4 flex items-center justify-between border-b border-champagne/20">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-champagne" />
          <span className="font-display uppercase font-bold text-sm tracking-wider">RENSTONE Admin</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 text-ivory/80 hover:text-champagne"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`w-full lg:w-64 bg-obsidian-pure text-ivory flex-shrink-0 flex flex-col justify-between border-r border-champagne/20 transition-all ${
          isMobileMenuOpen ? 'block' : 'hidden lg:flex'
        }`}
      >
        <div>
          {/* Logo */}
          <div className="p-5 border-b border-white/10 hidden lg:block">
            <Link to="/admin" className="flex items-center gap-3">
              <img
                src="/renstone-logo.png"
                alt="RENSTONE Logo"
                className="h-10 w-auto object-contain rounded border border-champagne/40"
              />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-champagne font-bold">
                  Control Center
                </span>
              </div>
            </Link>
          </div>

          {/* Database Mode Status Indicator */}
          <div className="p-4 mx-4 my-4 rounded bg-obsidian-surface border border-white/10 text-xs space-y-1">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-champagne" />
              <span className="font-semibold text-ivory">Database Backend:</span>
            </div>
            {isCloudConnected ? (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>Supabase Live PostgreSQL (RLS Enforced)</span>
              </p>
            ) : (
              <p className="text-[11px] text-amber-400 flex items-center gap-1 font-medium">
                <span>Local Session Cache</span>
              </p>
            )}
          </div>

          {/* Nav Links */}
          <nav className="px-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-champagne text-obsidian shadow-sm'
                      : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-obsidian-surface/40">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs text-ivory/70 hover:text-champagne transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Store</span>
            </span>
          </Link>

          <div className="px-3 py-1 text-[11px] text-ivory/60 truncate flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-champagne flex-shrink-0" />
            <span className="truncate">{adminEmail}</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-red-400 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};