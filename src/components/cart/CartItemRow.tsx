import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../../types';
import { formatBDT } from '../../lib/formatters';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const unitPrice = item.selectedVariant && item.selectedVariant.priceModifier
    ? item.product.price + item.selectedVariant.priceModifier
    : item.product.price;

  return (
    <div className="flex gap-3.5 py-4 border-b border-black/10 last:border-none">
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded bg-ivory border border-black/10 flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-obsidian truncate">
          {item.product.name}
        </h4>
        {item.selectedVariant && (
          <p className="text-[11px] text-obsidian/60 mt-0.5">
            {item.selectedVariant.name}
          </p>
        )}
        <p className="text-xs font-bold text-champagne-dark mt-1">
          {formatBDT(unitPrice)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center border border-black/20 rounded bg-white">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:text-champagne transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-xs font-semibold min-w-[20px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:text-champagne transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-black/40 hover:text-red-600 transition-colors p-1"
            aria-label="Remove item"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
