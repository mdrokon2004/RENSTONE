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
          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-obsidian-border">
            <Link to="/" onClick={onClose} className="flex items-center gap-2">
              <span className="font-display tracking-[0.2em] text-lg font-bold uppercase text-ivory">
                RENSTONE
              </span>
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
          <p className="text-xs text-ivory/60">Direct Inquiries & WhatsApp Concierge:</p>
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20RENSTONE%20team`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-champagne text-obsidian font-semibold text-xs uppercase tracking-wider rounded hover:bg-champagne-light transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
