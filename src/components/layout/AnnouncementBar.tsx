import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Phone, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!settings.announcementEnabled || !settings.announcementText || isDismissed) {
    return null;
  }

  return (
    <aside aria-label="Store Announcement" className="bg-obsidian text-ivory text-xs tracking-wider border-b border-champagne/20 relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-1.5 text-champagne">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-[11px] uppercase tracking-widest font-medium">Authentic Craftsmanship</span>
        </div>

        <p className="flex-1 text-center font-medium px-4 text-ivory/90 truncate">
          {settings.announcementText}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${settings.contactPhone}`}
            className="hidden md:flex items-center gap-1.5 text-ivory/70 hover:text-champagne transition-colors text-[11px]"
          >
            <Phone className="w-3 h-3 text-champagne" />
            <span>{settings.contactPhone}</span>
          </a>
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss announcement"
            className="text-ivory/50 hover:text-champagne transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
