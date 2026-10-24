import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Clock, RefreshCw, Send, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings, categories } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-obsidian-pure text-ivory border-t border-champagne/20 pt-16 pb-8">
      {/* Trust Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-obsidian-surface border border-champagne/30 flex items-center justify-center text-champagne flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-ivory uppercase tracking-wider">Fast Bangladesh Delivery</h4>
              <p className="text-xs text-ivory/60 mt-1">24-48h in Dhaka (৳80), 48-72h outside Dhaka (৳150).</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-obsidian-surface border border-champagne/30 flex items-center justify-center text-champagne flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-ivory uppercase tracking-wider">Surgical 316L Stainless Steel</h4>
              <p className="text-xs text-ivory/60 mt-1">Non-tarnish, sweat-resistant, and skin-friendly jewelry.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-obsidian-surface border border-champagne/30 flex items-center justify-center text-champagne flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-ivory uppercase tracking-wider">Cash on Delivery & Check</h4>
              <p className="text-xs text-ivory/60 mt-1">Inspect your parcel at the doorstep before acceptance.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-obsidian-surface border border-champagne/30 flex items-center justify-center text-champagne flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-ivory uppercase tracking-wider">Personal Concierge</h4>
              <p className="text-xs text-ivory/60 mt-1">Instant size guidance & styling help via WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display tracking-[0.25em] text-2xl font-bold uppercase text-ivory">
                RENSTONE
              </span>
            </div>
            <p className="text-champagne text-xs uppercase tracking-widest font-medium">
              {settings.tagline}
            </p>
            <p className="text-xs text-ivory/70 leading-relaxed max-w-sm">
              Distinctive jewelry, precision timepieces, and accessories designed for men of substance.
              Elevate every silhouette with timeless metals and architectural geometry.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-champagne text-obsidian text-xs font-semibold uppercase tracking-wider hover:bg-champagne-light transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-champagne font-bold mb-4">
              Catalog
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/70">
              <li>
                <Link to="/shop" className="hover:text-champagne transition-colors">Shop All Accessories</Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/collections/${c.slug}`} className="hover:text-champagne transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop?filter=new" className="hover:text-champagne transition-colors">New Releases</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-champagne font-bold mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/70">
              <li>
                <Link to="/shipping-policy" className="hover:text-champagne transition-colors">Shipping & Delivery Rates</Link>
              </li>
              <li>
                <Link to="/returns-policy" className="hover:text-champagne transition-colors">Returns & Exchange Policy</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-champagne transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-champagne transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-champagne transition-colors">Direct Contact & Support</Link>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Concierge & Store Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-champagne font-bold mb-2">
              WhatsApp VIP Concierge
            </h4>
            <p className="text-xs text-ivory/70 leading-relaxed">
              We are a 100% online-exclusive accessories boutique. We do not operate offline physical showrooms; all pieces are delivered with doorstep inspection nationwide.
            </p>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20RENSTONE%20team,%20I%20would%20like%20to%20join%20the%20VIP%20WhatsApp%20Club%20for%20exclusive%20drops`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Connect on WhatsApp</span>
            </a>

            <div className="pt-2 text-[11px] text-ivory/60 space-y-2 border-t border-white/10">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-champagne flex-shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh • 100% Online Exclusive Boutique</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                <span className="font-semibold text-ivory">{settings.contactPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ivory/50">
        <p>© {new Date().getFullYear()} {settings.storeName}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/shipping-policy" className="hover:text-champagne transition-colors">Shipping</Link>
          <Link to="/privacy-policy" className="hover:text-champagne transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-champagne transition-colors">Terms</Link>
          <Link to="/admin" className="hover:text-champagne transition-colors text-champagne/70">Admin Access</Link>
        </div>
      </div>
    </footer>
  );
};
