import React, { useState } from 'react';
import { MessageSquare, Phone, MapPin, Clock, Send, ShieldCheck, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { cleanPhoneForWhatsApp } from '../lib/formatters';

export const ContactPage: React.FC = () => {
  const { settings } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Order Question');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim() && message.trim()) {
      const waNumber = cleanPhoneForWhatsApp(settings.whatsappNumber || '01322177107');
      const waText = `*INQUIRY - RENSTONE*\n` +
        `• Name: ${name}\n` +
        `• Phone: ${phone}\n` +
        `• Subject: ${inquiryType}\n` +
        `• Message: ${message}`;
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne-dark text-xs uppercase tracking-widest font-bold">
          100% Online Exclusive Boutique
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider text-obsidian">
          Contact Concierge
        </h1>
        <p className="text-xs sm:text-sm text-obsidian/70 leading-relaxed">
          RENSTONE is a pure online brand based in Dhaka with express nationwide delivery. We do not operate any offline physical showroom. All orders are delivered directly to your doorstep with inspection before payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Direct Channels Card */}
        <div className="bg-obsidian-pure text-ivory p-6 sm:p-8 rounded-lg border border-champagne/30 shadow-xl space-y-6">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <h3 className="font-display text-lg uppercase font-bold text-champagne">
              Direct Support Channels
            </h3>
            <p className="text-xs text-ivory/60">
              Speak or message with our Dhaka concierge desk directly.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* WhatsApp */}
            <div className="bg-obsidian-surface p-4 rounded-lg border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-ivory flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Official WhatsApp Concierge</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                  Fastest
                </span>
              </div>
              <p className="text-champagne font-mono text-base font-bold">
                01322-177107
              </p>
              <p className="text-[11px] text-ivory/60">
                Instant sizing advice, order confirmation, and styling recommendations.
              </p>
              <a
                href={`https://wa.me/8801322177107?text=Hello%20RENSTONE%20team,%20I%20have%20an%20inquiry`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Phone Call */}
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded border border-white/5">
              <Phone className="w-4 h-4 text-champagne flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-ivory">Direct Helpline</p>
                <a href="tel:01322177107" className="text-champagne font-semibold text-xs hover:underline">
                  +880 1322-177107
                </a>
                <p className="text-[11px] text-ivory/50 mt-0.5">Saturday – Thursday: 10:00 AM – 9:00 PM</p>
              </div>
            </div>

            {/* Official Email */}
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded border border-white/5">
              <span className="text-champagne flex-shrink-0 font-bold">@</span>
              <div>
                <p className="font-bold text-ivory">Official Email Address</p>
                <a href="mailto:renstoneofficialbd@gmail.com" className="text-champagne font-semibold text-xs hover:underline">
                  renstoneofficialbd@gmail.com
                </a>
                <p className="text-[11px] text-ivory/50 mt-0.5">For formal brand inquiries and partnerships</p>
              </div>
            </div>

            {/* Official Facebook Page */}
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded border border-white/5">
              <svg className="w-4 h-4 text-[#1877F2] fill-current flex-shrink-0 mt-0.5" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <div>
                <p className="font-bold text-ivory">Official Facebook Page</p>
                <a 
                  href="https://www.facebook.com/profile.php?id=61594618265976" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-champagne font-semibold text-xs hover:underline"
                >
                  facebook.com/renstone.official
                </a>
                <p className="text-[11px] text-ivory/50 mt-0.5">Follow for daily style drops and video showcases</p>
              </div>
            </div>

            {/* Online Store Model Note */}
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded border border-white/5">
              <MapPin className="w-4 h-4 text-champagne flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-ivory">Operating Model: 100% Online</p>
                <p className="text-[11px] text-ivory/70 mt-0.5">
                  Dhaka, Bangladesh. We do not have an offline retail store. All orders are packed in signature presentation boxes and sent via courier.
                </p>
              </div>
            </div>

            {/* Inspection Guarantee */}
            <div className="flex items-start gap-3 p-3 bg-champagne/10 rounded border border-champagne/20">
              <ShieldCheck className="w-4 h-4 text-champagne flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-champagne">Doorstep Inspection Guaranteed</p>
                <p className="text-[11px] text-ivory/75 mt-0.5">
                  Open and inspect the piece with the delivery person before paying cash.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Concierge Form */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-black/10 shadow-sm space-y-5">
          <div className="border-b border-black/10 pb-3">
            <h3 className="font-display text-lg uppercase font-bold text-obsidian">
              Send Concierge Inquiry
            </h3>
            <p className="text-xs text-obsidian/60 mt-0.5">
              Submitting opens a pre-composed WhatsApp message directly with our team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider font-semibold text-obsidian mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanvir Ahmed"
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2.5 text-obsidian outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-obsidian mb-1">
                Your Phone Number (WhatsApp / Mobile) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2.5 text-obsidian outline-none font-mono"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-obsidian mb-1">
                Inquiry Topic
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2.5 text-obsidian outline-none font-medium"
              >
                <option value="Order Tracking">Order Verification & Delivery Status</option>
                <option value="Sizing Help">Ring or Bracelet Sizing Advice</option>
                <option value="Product Availability">Product Stock & Restock Question</option>
                <option value="Custom Gift">Corporate or Special Gift Packaging</option>
              </select>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-obsidian mb-1">
                Message *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you are looking for or any questions about our accessories..."
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2.5 text-obsidian outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-obsidian text-champagne hover:bg-champagne hover:text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Continue via WhatsApp Concierge</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
