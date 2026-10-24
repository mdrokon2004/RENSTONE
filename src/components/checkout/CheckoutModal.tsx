import React, { useState } from 'react';
import { X, ShieldCheck, MessageSquare, Send, CheckCircle2, Copy, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { formatBDT, validateBDPhone, cleanPhoneForWhatsApp } from '../../lib/formatters';
import { Order } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, subtotal, clearCart, closeCart } = useCart();
  const { settings, createOrder } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [district, setDistrict] = useState<'Dhaka' | 'Outside Dhaka'>('Dhaka');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [preferredChannel, setPreferredChannel] = useState<'whatsapp' | 'messenger'>('whatsapp');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  if (!isOpen) return null;

  // Calculate delivery fee
  const isFreeDelivery = subtotal >= (settings.freeDeliveryThreshold || 5000);
  const deliveryFee = isFreeDelivery
    ? 0
    : district === 'Dhaka'
    ? settings.dhakaDeliveryFee || 80
    : settings.outsideDhakaDeliveryFee || 150;

  const total = subtotal + deliveryFee;

  const handleValidate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.customerName = 'Please enter your full name';
    if (!customerPhone.trim()) {
      newErrors.customerPhone = 'Please provide a contact number';
    } else if (!validateBDPhone(customerPhone)) {
      newErrors.customerPhone = 'Enter a valid Bangladeshi phone number (e.g. 01712345678)';
    }
    if (!area.trim()) newErrors.area = 'Please enter your Area or Thana';
    if (!address.trim()) newErrors.address = 'Please specify your full delivery address';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const orderItems = cartItems.map(item => {
        const unitPrice = item.selectedVariant && item.selectedVariant.priceModifier
          ? item.product.price + item.selectedVariant.priceModifier
          : item.product.price;
        return {
          productId: item.productId,
          productName: item.product.name,
          variantName: item.selectedVariant?.name,
          unitPrice,
          quantity: item.quantity,
          lineTotal: unitPrice * item.quantity,
          image: item.product.images[0]
        };
      });

      const newOrder = await createOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        district,
        area: area.trim(),
        address: address.trim(),
        notes: notes.trim() || undefined,
        preferredChannel,
        items: orderItems,
        subtotal,
        deliveryFee,
        total
      });

      setCreatedOrder(newOrder);
      clearCart();
    } catch (err) {
      console.error('Order creation error:', err);
      alert('There was an issue saving your order request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppMessage = (order: Order): string => {
    const itemsList = order.items
      .map(i => `• ${i.productName}${i.variantName ? ` (${i.variantName})` : ''} x${i.quantity} = ৳${i.lineTotal}`)
      .join('\n');

    return `*NEW ORDER REQUEST - RENSTONE*\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `*Order Ref:* ${order.orderReference}\n` +
      `*Customer:* ${order.customerName}\n` +
      `*Phone:* ${order.customerPhone}\n` +
      `*Delivery Area:* ${order.area}, ${order.district}\n` +
      `*Address:* ${order.address}\n` +
      (order.notes ? `*Notes:* ${order.notes}\n` : '') +
      `━━━━━━━━━━━━━━━━━━\n` +
      `*Items:*\n${itemsList}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `*Subtotal:* ৳${order.subtotal}\n` +
      `*Delivery:* ৳${order.deliveryFee}\n` +
      `*Total:* ৳${order.total} (Cash on Delivery)\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `Please confirm my order availability and dispatch time. Thank you!`;
  };

  const handleCopySummary = (order: Order) => {
    const text = generateWhatsAppMessage(order);
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const handleFinish = () => {
    setCreatedOrder(null);
    onClose();
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-ivory text-obsidian rounded-lg shadow-2xl border border-champagne/40 overflow-hidden my-8 animate-fade-in">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-obsidian text-ivory flex items-center justify-between border-b border-champagne/20">
          <div>
            <h3 className="font-display tracking-widest text-sm uppercase font-bold text-champagne">
              {createdOrder ? 'Order Request Recorded' : 'Request Signature Order'}
            </h3>
            <p className="text-[11px] text-ivory/60 mt-0.5">
              {createdOrder ? 'Confirm through your preferred concierge channel' : 'Direct verification via WhatsApp or Messenger • Cash on Delivery'}
            </p>
          </div>
          <button
            onClick={createdOrder ? handleFinish : onClose}
            className="p-1 text-ivory/60 hover:text-champagne transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {createdOrder ? (
          /* Confirmation Screen */
          <div className="p-6 space-y-5 text-center">
            <div className="w-16 h-16 bg-champagne/10 rounded-full flex items-center justify-center mx-auto text-champagne-dark border border-champagne/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-obsidian/50 font-semibold">
                Order Reference Number
              </p>
              <h2 className="text-2xl font-bold font-mono text-obsidian mt-1 tracking-wider">
                {createdOrder.orderReference}
              </h2>
              <p className="text-xs text-obsidian/70 mt-2 max-w-md mx-auto">
                Your order details have been securely recorded. To finalize dispatch and review doorstep delivery, please continue via WhatsApp or Messenger.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <a
                href={`https://wa.me/${cleanPhoneForWhatsApp(settings.whatsappNumber)}?text=${encodeURIComponent(generateWhatsAppMessage(createdOrder))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold uppercase tracking-wider text-xs rounded shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send Order via WhatsApp Concierge</span>
              </a>

              {settings.messengerUrl && (
                <a
                  href={settings.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#0084FF] hover:bg-[#0074E0] text-white font-semibold uppercase tracking-wider text-xs rounded flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>Open Messenger Conversation</span>
                </a>
              )}

              <button
                onClick={() => handleCopySummary(createdOrder)}
                className="w-full py-2.5 px-4 bg-white border border-black/20 hover:border-champagne text-obsidian text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors"
              >
                {hasCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{hasCopied ? 'Order Summary Copied to Clipboard!' : 'Copy Order Summary'}</span>
              </button>
            </div>

            {/* Order Summary Recap */}
            <div className="text-left bg-white p-4 rounded border border-black/10 text-xs space-y-2 mt-4">
              <div className="flex justify-between font-semibold border-b border-black/5 pb-2">
                <span>Total Amount (COD):</span>
                <span className="text-sm font-bold text-champagne-dark">{formatBDT(createdOrder.total)}</span>
              </div>
              <p className="text-obsidian/70">
                <strong>Recipient:</strong> {createdOrder.customerName} ({createdOrder.customerPhone})
              </p>
              <p className="text-obsidian/70">
                <strong>Delivery To:</strong> {createdOrder.address}, {createdOrder.area}, {createdOrder.district}
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="text-xs text-obsidian/60 hover:text-obsidian underline pt-2"
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Customer Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-obsidian mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Tanvir Ahmed"
                className={`w-full bg-white border rounded px-3 py-2 text-xs text-obsidian outline-none ${
                  errors.customerName ? 'border-red-500' : 'border-black/20 focus:border-champagne'
                }`}
              />
              {errors.customerName && <p className="text-[10px] text-red-600 mt-1">{errors.customerName}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-obsidian mb-1">
                Phone Number (Bangladesh) *
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className={`w-full bg-white border rounded px-3 py-2 text-xs text-obsidian outline-none ${
                  errors.customerPhone ? 'border-red-500' : 'border-black/20 focus:border-champagne'
                }`}
              />
              {errors.customerPhone && <p className="text-[10px] text-red-600 mt-1">{errors.customerPhone}</p>}
            </div>

            {/* District & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-obsidian mb-1">
                  Delivery Region *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value as 'Dhaka' | 'Outside Dhaka')}
                  className="w-full bg-white border border-black/20 focus:border-champagne rounded px-3 py-2 text-xs text-obsidian outline-none"
                >
                  <option value="Dhaka">Inside Dhaka (৳{settings.dhakaDeliveryFee || 80})</option>
                  <option value="Outside Dhaka">Outside Dhaka (৳{settings.outsideDhakaDeliveryFee || 150})</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-obsidian mb-1">
                  Thana / Area *
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Dhanmondi, Uttara, Agrabad"
                  className={`w-full bg-white border rounded px-3 py-2 text-xs text-obsidian outline-none ${
                    errors.area ? 'border-red-500' : 'border-black/20 focus:border-champagne'
                  }`}
                />
                {errors.area && <p className="text-[10px] text-red-600 mt-1">{errors.area}</p>}
              </div>
            </div>

            {/* Full Street Address */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-obsidian mb-1">
                Full Street Address *
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="House/Apartment, Road number, Landmark"
                className={`w-full bg-white border rounded px-3 py-2 text-xs text-obsidian outline-none ${
                  errors.address ? 'border-red-500' : 'border-black/20 focus:border-champagne'
                }`}
              />
              {errors.address && <p className="text-[10px] text-red-600 mt-1">{errors.address}</p>}
            </div>

            {/* Order Notes */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-obsidian mb-1">
                Special Delivery Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Gift packaging, preferred calling time, etc."
                className="w-full bg-white border border-black/20 focus:border-champagne rounded px-3 py-2 text-xs text-obsidian outline-none"
              />
            </div>

            {/* Channel Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-obsidian mb-1.5">
                Preferred Confirmation Channel
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPreferredChannel('whatsapp')}
                  className={`py-2 px-3 rounded border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    preferredChannel === 'whatsapp'
                      ? 'bg-obsidian text-champagne border-champagne font-semibold shadow-sm'
                      : 'bg-white text-obsidian border-black/15 hover:bg-black/5'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-champagne" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreferredChannel('messenger')}
                  className={`py-2 px-3 rounded border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    preferredChannel === 'messenger'
                      ? 'bg-obsidian text-champagne border-champagne font-semibold shadow-sm'
                      : 'bg-white text-obsidian border-black/15 hover:bg-black/5'
                  }`}
                >
                  <Send className="w-3.5 h-3.5 text-champagne" />
                  <span>Messenger</span>
                </button>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-3.5 bg-white rounded border border-black/10 space-y-1.5 text-xs">
              <div className="flex justify-between text-obsidian/70">
                <span>Subtotal ({cartItems.length} items):</span>
                <span className="font-semibold text-obsidian">{formatBDT(subtotal)}</span>
              </div>
              <div className="flex justify-between text-obsidian/70">
                <span>Delivery Charge ({district}):</span>
                <span className="font-semibold text-obsidian">
                  {deliveryFee === 0 ? <span className="text-green-700 font-bold">FREE</span> : formatBDT(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-black/10 text-sm font-bold text-obsidian">
                <span>Total (Cash on Delivery):</span>
                <span className="font-sans text-base text-champagne-dark">{formatBDT(total)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-obsidian text-ivory hover:bg-champagne hover:text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Recording Order...</span>
              ) : (
                <>
                  <span>Submit Order Request</span>
                  <ShieldCheck className="w-4 h-4 text-champagne" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-obsidian/50">
              No online card needed. Inspect your parcel at delivery before paying.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
