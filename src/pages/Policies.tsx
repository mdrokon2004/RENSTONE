import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Policies: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = 'Shipping Policy';
  if (path.includes('returns')) title = 'Returns & Exchange Policy';
  if (path.includes('privacy')) title = 'Privacy Policy';
  if (path.includes('terms')) title = 'Terms of Service';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="space-y-1 border-b border-black/10 pb-4">
        <p className="text-xs uppercase tracking-widest text-champagne-dark font-bold">
          RENSTONE Store Standards
        </p>
        <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-obsidian">
          {title}
        </h1>
      </div>

      <div className="prose prose-sm max-w-none text-obsidian/80 space-y-4 text-xs leading-relaxed">
        {path.includes('shipping') && (
          <>
            <h3 className="text-sm font-bold text-obsidian uppercase">1. Nationwide Bangladesh Delivery</h3>
            <p>
              We deliver to all 64 districts in Bangladesh via verified courier partners. Orders inside Dhaka metropolitan area are typically delivered within 24 to 48 hours. Orders outside Dhaka are delivered within 48 to 72 hours.
            </p>
            <h3 className="text-sm font-bold text-obsidian uppercase">2. Delivery Charges</h3>
            <p>
              • Inside Dhaka City: ৳80 Standard Express Delivery.<br />
              • Outside Dhaka: ৳150 Nationwide Courier.<br />
              • Orders of ৳5,000 or above qualify for Complimentary Express Delivery.
            </p>
            <h3 className="text-sm font-bold text-obsidian uppercase">3. Doorstep Inspection Policy</h3>
            <p>
              Customers are entitled to open the presentation box in the presence of the delivery agent to inspect the finish, clasp, and physical condition of the piece before handing over cash payment.
            </p>
          </>
        )}

        {path.includes('returns') && (
          <>
            <h3 className="text-sm font-bold text-obsidian uppercase">1. Sizing Exchange</h3>
            <p>
              If a ring or bracelet does not fit comfortably, you may request an exchange within 7 days of delivery. The item must be unworn and in its original signature packaging.
            </p>
            <h3 className="text-sm font-bold text-obsidian uppercase">2. Transit Damage</h3>
            <p>
              If a piece arrives defective or damaged, notify our WhatsApp concierge within 24 hours of receipt for immediate complimentary replacement.
            </p>
          </>
        )}

        {path.includes('privacy') && (
          <>
            <h3 className="text-sm font-bold text-obsidian uppercase">1. Customer Privacy Commitment</h3>
            <p>
              RENSTONE collects customer delivery information (name, contact phone, delivery address) exclusively for fulfilling order requests and coordinating delivery with couriers.
            </p>
            <h3 className="text-sm font-bold text-obsidian uppercase">2. No Payment Card Storage</h3>
            <p>
              We do not collect, process, or store credit or debit card numbers on our servers. All transactions are settled via Cash on Delivery or confirmed directly through official conversation channels.
            </p>
          </>
        )}

        {path.includes('terms') && (
          <>
            <h3 className="text-sm font-bold text-obsidian uppercase">1. Orders & Verification</h3>
            <p>
              Submitting an order request on RENSTONE initiates a direct reservation with our dispatch team. Our concierge verifies stock availability and coordinates delivery logistics through WhatsApp or Facebook Messenger.
            </p>
            <h3 className="text-sm font-bold text-obsidian uppercase">2. Authentic Materials Guarantee</h3>
            <p>
              All RENSTONE accessories are crafted from surgical-grade 316L stainless steel, natural stone, or precision Japanese movements as specified in the technical highlights of each piece.
            </p>
          </>
        )}
      </div>

      <div className="pt-6 border-t border-black/10">
        <Link to="/" className="text-xs uppercase tracking-wider font-bold text-champagne-dark hover:underline">
          ← Return to Storefront
        </Link>
      </div>
    </div>
  );
};
