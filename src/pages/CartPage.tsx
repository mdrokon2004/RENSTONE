import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { formatBDT } from '../lib/formatters';
import { CheckoutModal } from '../components/checkout/CheckoutModal';

export const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const { settings } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const threshold = settings.freeDeliveryThreshold || 5000;
  const remainingForFree = Math.max(0, threshold - subtotal);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-black/5 mx-auto flex items-center justify-center text-obsidian/40">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold uppercase text-obsidian">Your Bag is Empty</h2>
        <p className="text-xs text-obsidian/60 max-w-sm mx-auto">
          Explore our collection of signature watches, talismans, and chains.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-xs uppercase tracking-wider font-semibold rounded hover:bg-champagne hover:text-obsidian transition-colors"
        >
          <span>Explore The Vault</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-champagne-dark font-bold">
          Review Your Selection
        </p>
        <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-obsidian">
          Shopping Bag ({totalItems} items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Items Table */}
        <div className="lg:col-span-2 bg-white rounded border border-black/10 divide-y divide-black/10 overflow-hidden">
          {cartItems.map((item) => {
            const unitPrice = item.selectedVariant && item.selectedVariant.priceModifier
              ? item.product.price + item.selectedVariant.priceModifier
              : item.product.price;

            return (
              <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex gap-4 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded bg-ivory border border-black/10 flex-shrink-0"
                  />
                  <div>
                    <Link
                      to={`/products/${item.product.slug}`}
                      className="text-sm font-bold text-obsidian hover:text-champagne transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    {item.selectedVariant && (
                      <p className="text-xs text-obsidian/60 mt-0.5">{item.selectedVariant.name}</p>
                    )}
                    <p className="text-xs font-bold text-champagne-dark mt-1">
                      {formatBDT(unitPrice)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  {/* Quantity */}
                  <div className="flex items-center border border-black/20 rounded bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:text-champagne"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:text-champagne"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-bold text-sm text-obsidian min-w-[70px] text-right">
                    {formatBDT(unitPrice * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-black/30 hover:text-red-600 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Panel */}
        <div className="bg-white p-6 rounded border border-black/10 space-y-4">
          <h3 className="font-display text-sm uppercase tracking-widest font-bold text-obsidian border-b border-black/10 pb-3">
            Order Summary
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-obsidian/70">
              <span>Subtotal:</span>
              <span className="font-semibold text-obsidian">{formatBDT(subtotal)}</span>
            </div>
            <div className="flex justify-between text-obsidian/70">
              <span>Delivery Fee (Estimate):</span>
              <span className="font-semibold text-obsidian">
                {remainingForFree === 0 ? <span className="text-green-700 font-bold">FREE</span> : '৳80 - ৳150'}
              </span>
            </div>
            {remainingForFree > 0 && (
              <p className="text-[11px] text-champagne-dark font-medium pt-1">
                Add {formatBDT(remainingForFree)} more to qualify for Free Express Delivery!
              </p>
            )}
            <div className="flex justify-between pt-3 border-t border-black/10 text-base font-bold text-obsidian">
              <span>Estimated Total:</span>
              <span className="text-champagne-dark">{formatBDT(subtotal)}</span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full py-3.5 bg-obsidian text-ivory hover:bg-champagne hover:text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-obsidian/60 pt-2 border-t border-black/5">
            <ShieldCheck className="w-4 h-4 text-champagne-dark" />
            <span>Cash on Delivery • Doorstep Inspection</span>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};
