import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { CartItemRow } from './CartItemRow';
import { formatBDT } from '../../lib/formatters';
import { CheckoutModal } from '../checkout/CheckoutModal';

export const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const { settings } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const threshold = settings.freeDeliveryThreshold || 5000;
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));
  const remainingForFree = Math.max(0, threshold - subtotal);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-ivory text-obsidian shadow-drawer flex flex-col justify-between border-l border-champagne/30 animate-slide-in-right">
            {/* Header */}
            <div>
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-black/10 bg-white">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-champagne-dark" />
                  <span className="font-display tracking-widest text-sm uppercase font-bold text-obsidian">
                    Shopping Bag ({totalItems})
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-1 text-obsidian/60 hover:text-champagne-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Bar */}
              <div className="bg-obsidian-surface text-ivory p-3.5 border-b border-champagne/20">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-champagne font-medium">
                    <Truck className="w-3.5 h-3.5" />
                    {remainingForFree === 0 ? 'Complimentary Delivery Unlocked!' : 'Free Express Delivery Target'}
                  </span>
                  <span className="text-ivory/60">
                    {remainingForFree === 0 ? '৳0 Delivery' : `Add ${formatBDT(remainingForFree)}`}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-champagne transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-black/5 mx-auto flex items-center justify-center text-obsidian/40">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-obsidian">Your Bag is Empty</h3>
                    <p className="text-xs text-obsidian/60 mt-1">Discover our timeless timepieces and pendants.</p>
                  </div>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-obsidian text-ivory text-xs uppercase tracking-wider font-semibold rounded hover:bg-champagne hover:text-obsidian transition-colors"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-black/10">
                  {cartItems.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 bg-white border-t border-black/10 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-obsidian/70">Subtotal:</span>
                  <span className="font-bold text-obsidian text-base font-sans">{formatBDT(subtotal)}</span>
                </div>
                <p className="text-[11px] text-obsidian/50 leading-tight">
                  Shipping calculated at checkout. Cash on Delivery supported across Bangladesh.
                </p>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 bg-obsidian text-ivory hover:bg-champagne hover:text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Request Order via WhatsApp / Messenger</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-obsidian/60 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-champagne-dark" />
                  <span>Inspected Quality Guaranteed • 100% Authentic</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};
