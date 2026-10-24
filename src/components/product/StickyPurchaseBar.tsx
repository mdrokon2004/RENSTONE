import React from 'react';
import { Product, ProductVariantOption } from '../../types';
import { formatBDT } from '../../lib/formatters';
import { MessageSquare, ShoppingBag } from 'lucide-react';

interface StickyPurchaseBarProps {
  product: Product;
  selectedVariant: ProductVariantOption | null;
  onAddToCart: () => void;
  onWhatsAppOrder: () => void;
}

export const StickyPurchaseBar: React.FC<StickyPurchaseBarProps> = ({
  product,
  selectedVariant,
  onAddToCart,
  onWhatsAppOrder
}) => {
  const finalPrice = selectedVariant && selectedVariant.priceModifier
    ? product.price + selectedVariant.priceModifier
    : product.price;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-obsidian-pure text-ivory border-t border-champagne/30 p-3 shadow-2xl lg:hidden flex items-center justify-between gap-3 animate-fade-in">
      <div className="flex items-center gap-2.5 min-w-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-11 h-11 object-cover rounded border border-champagne/30 flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-xs font-medium text-ivory truncate">{product.name}</p>
          <p className="text-xs font-bold text-champagne">{formatBDT(finalPrice)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onAddToCart}
          className="p-2.5 bg-obsidian-surface hover:bg-champagne hover:text-obsidian border border-champagne/40 rounded text-champagne transition-colors"
          aria-label="Add to cart"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>

        <button
          onClick={onWhatsAppOrder}
          className="py-2.5 px-3.5 bg-champagne hover:bg-champagne-light text-obsidian text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
