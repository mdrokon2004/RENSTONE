import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { cleanPhoneForWhatsApp } from '../lib/formatters';

export const ContactPage: React.FC = () => {
  const { settings } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && (email.trim() || phone.trim()) && message.trim()) {
      setIsSent(true);
      // Construct WhatsApp message fallback
      const waText = `Hello RENSTONE Concierge,\nMy name is ${name}.\nContact: ${phone || email}\nInquiry: ${message}`;
      const waUrl = `https://wa.me/${cleanPhoneForWhatsApp(settings.whatsappNumber)}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <p className="text-xs uppercase tracking-widest text-champagne-dark font-bold">
          Dedicated Concierge
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider text-obsidian">
          Connect With RENSTONE
        </h1>
        <p className="text-xs text-obsidian/60">
          For sizing guidance, corporate gifting, or order inquiries, our concierge is available 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Information & Channels */}
        <div className="bg-obsidian-pure text-ivory p-8 rounded-lg border border-champagne/20 space-y-6">
          <div className="space-y-1">
            <h3 className="font-display text-lg uppercase font-bold text-champagne">Direct Concierge Service</h3>
            <p className="text-xs text-ivory/70">Reach our team directly for instant support.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-champagne flex-shrink-0" />
              <div>
                <p className="font-semibold text-ivory">WhatsApp Concierge (Fastest Response)</p>
                <p className="text-ivory/60 mt-0.5">{settings.whatsappNumber}</p>
                <a
                  href={`https://wa.me/${cleanPhoneForWhatsApp(settings.whatsappNumber)}?text=Hello%20RENSTONE%20team`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-champagne hover:underline font-semibold"
                >
                  Start WhatsApp Chat →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-white/10 pt-3">
              <Phone className="w-5 h-5 text-champagne flex-shrink-0" />
              <div>
                <p className="font-semibold text-ivory">Phone Inquiries</p>
                <p className="text-ivory/60 mt-0.5">{settings.contactPhone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-white/10 pt-3">
              <Mail className="w-5 h-5 text-champagne flex-shrink-0" />
              <div>
                <p className="font-semibold text-ivory">Electronic Mail</p>
                <p className="text-ivory/60 mt-0.5">{settings.contactEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-white/10 pt-3">
              <MapPin className="w-5 h-5 text-champagne flex-shrink-0" />
              <div>
                <p className="font-semibold text-ivory">Showroom & Studio</p>
                <p className="text-ivory/60 mt-0.5">{settings.contactAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-white/10 pt-3">
              <Clock className="w-5 h-5 text-champagne flex-shrink-0" />
              <div>
                <p className="font-semibold text-ivory">Concierge Hours</p>
                <p className="text-ivory/60 mt-0.5">Saturday – Thursday: 10:00 AM – 9:00 PM (BST)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white p-8 rounded-lg border border-black/10 space-y-4">
          <h3 className="font-display text-lg uppercase font-bold text-obsidian">Send an Inquiry</h3>
          <p className="text-xs text-obsidian/60">
            Submit your message and connect automatically to our WhatsApp support desk.
          </p>

          {isSent ? (
            <div className="p-6 bg-champagne/10 border border-champagne rounded text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-champagne text-obsidian flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-obsidian">Inquiry Forwarded</h4>
              <p className="text-xs text-obsidian/70">
                Your message has been initiated. Our concierge will review and reply promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Shakib Chowdhury"
                  className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1">Message / Inquiry *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Inquire about sizing, custom delivery, or timepiece availability..."
                  className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-obsidian text-ivory hover:bg-champagne hover:text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow transition-colors flex items-center justify-center gap-2"
              >
                <span>Send to Concierge</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
