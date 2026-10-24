import React from 'react';
import { Link } from 'react-router-dom';
import { X, Shield, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; path: string }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, links }) => {
  const { settings } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Navigation Drawer */}
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-obsidian-pure text-ivory shadow-2xl z-50 flex flex-col justify-between border-r border-champagne/20 animate-fade-in">
        <div>
          {/* Header with Official Logo */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-obsidian-border">
            <Link to="/" onClick={onClose} className="flex items-center gap-2">
              <img
                src="/renstone-logo.png"
                alt="RENSTONE Logo"
                className="h-10 w-auto object-contain rounded border border-champagne/40"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-1.5 text-ivory/60 hover:text-champagne transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <div className="p-5 space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-champagne font-semibold mb-2">
              Collections & Catalog
            </p>
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={onClose}
                className="flex items-center justify-between py-2.5 text-sm uppercase tracking-wider text-ivory/80 hover:text-champagne transition-colors border-b border-white/5"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-champagne/40" />
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center justify-between py-2.5 text-sm uppercase tracking-wider text-ivory/80 hover:text-champagne transition-colors border-b border-white/5"
            >
              <span>Contact & Concierge</span>
              <ArrowRight className="w-4 h-4 text-champagne/40" />
            </Link>

            <Link
              to="/admin"
              onClick={onClose}
              className="flex items-center gap-2 py-2.5 text-sm uppercase tracking-wider text-champagne font-semibold"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Footer Contact */}
        <div className="p-5 border-t border-obsidian-border bg-obsidian/40 space-y-3">
          <p className="text-xs text-ivory/60">Direct Inquiries & WhatsApp Hotline:</p>
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20RENSTONE%20team`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-colors"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Chat via WhatsApp (01322177107)</span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61594618265976"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-[#1877F2]/20 border border-[#1877F2]/40 text-white font-medium text-xs rounded transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Visit Facebook Page</span>
          </a>
        </div>
      </div>
    </div>
  );
};
