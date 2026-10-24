import React, { useState } from 'react';
import { Save, Check, ShieldCheck, MessageSquare, Truck, Bell } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useStore();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [messengerUrl, setMessengerUrl] = useState(settings.messengerUrl);
  const [dhakaDeliveryFee, setDhakaDeliveryFee] = useState(settings.dhakaDeliveryFee);
  const [outsideDhakaDeliveryFee, setOutsideDhakaDeliveryFee] = useState(settings.outsideDhakaDeliveryFee);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(settings.freeDeliveryThreshold);
  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [announcementEnabled, setAnnouncementEnabled] = useState(settings.announcementEnabled);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [contactAddress, setContactAddress] = useState(settings.contactAddress);

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await updateSettings({
      storeName: storeName.trim(),
      tagline: tagline.trim(),
      whatsappNumber: whatsappNumber.trim().replace(/[^\d]/g, ''),
      messengerUrl: messengerUrl.trim(),
      dhakaDeliveryFee: Number(dhakaDeliveryFee),
      outsideDhakaDeliveryFee: Number(outsideDhakaDeliveryFee),
      freeDeliveryThreshold: Number(freeDeliveryThreshold),
      announcementText: announcementText.trim(),
      announcementEnabled,
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      contactAddress: contactAddress.trim()
    });

    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-obsidian">
          Store & Concierge Configuration
        </h1>
        <p className="text-xs text-obsidian/60 mt-0.5">
          Modify business details, delivery rates, WhatsApp numbers, and promotional banners dynamically.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-green-100 border border-green-300 rounded text-green-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>Store settings have been saved and applied across the entire storefront!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Identity */}
        <div className="bg-white p-6 rounded-lg border border-black/10 space-y-4 shadow-sm">
          <h3 className="font-bold uppercase tracking-wider text-sm text-obsidian border-b border-black/10 pb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-champagne-dark" />
            <span>1. Brand Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Store Name *</label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Brand Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Messenger */}
        <div className="bg-white p-6 rounded-lg border border-black/10 space-y-4 shadow-sm">
          <h3 className="font-bold uppercase tracking-wider text-sm text-obsidian border-b border-black/10 pb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-champagne-dark" />
            <span>2. Order Verification Channels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">
                Official WhatsApp Number (International format without +) *
              </label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="8801700000000"
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none font-mono"
              />
              <p className="text-[10px] text-obsidian/50 mt-1">Example: 8801712345678 (Used for direct click-to-chat order links)</p>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">
                Facebook Messenger URL / Page
              </label>
              <input
                type="url"
                value={messengerUrl}
                onChange={(e) => setMessengerUrl(e.target.value)}
                placeholder="https://m.me/renstone.official"
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Delivery Rates */}
        <div className="bg-white p-6 rounded-lg border border-black/10 space-y-4 shadow-sm">
          <h3 className="font-bold uppercase tracking-wider text-sm text-obsidian border-b border-black/10 pb-2 flex items-center gap-2">
            <Truck className="w-4 h-4 text-champagne-dark" />
            <span>3. Shipping Charges & Free Delivery</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Dhaka City Charge (BDT) *</label>
              <input
                type="number"
                required
                min="0"
                value={dhakaDeliveryFee}
                onChange={(e) => setDhakaDeliveryFee(Number(e.target.value))}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Outside Dhaka Charge (BDT) *</label>
              <input
                type="number"
                required
                min="0"
                value={outsideDhakaDeliveryFee}
                onChange={(e) => setOutsideDhakaDeliveryFee(Number(e.target.value))}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Free Delivery Threshold (BDT)</label>
              <input
                type="number"
                min="0"
                value={freeDeliveryThreshold}
                onChange={(e) => setFreeDeliveryThreshold(Number(e.target.value))}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="bg-white p-6 rounded-lg border border-black/10 space-y-4 shadow-sm">
          <h3 className="font-bold uppercase tracking-wider text-sm text-obsidian border-b border-black/10 pb-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-champagne-dark" />
            <span>4. Storefront Announcement Bar</span>
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="announcementToggle"
              checked={announcementEnabled}
              onChange={(e) => setAnnouncementEnabled(e.target.checked)}
              className="accent-champagne"
            />
            <label htmlFor="announcementToggle" className="font-semibold cursor-pointer">
              Display Announcement Banner at Top of Website
            </label>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Promotional Text</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg border border-black/10 space-y-4 shadow-sm">
          <h3 className="font-bold uppercase tracking-wider text-sm text-obsidian border-b border-black/10 pb-2">
            5. Public Store Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Contact Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Physical Showroom / Studio Address</label>
            <input
              type="text"
              value={contactAddress}
              onChange={(e) => setContactAddress(e.target.value)}
              className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 bg-obsidian text-champagne hover:bg-champagne hover:text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Updating Store...' : 'Save Configuration'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
