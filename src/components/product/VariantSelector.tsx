import React from 'react';
import { ProductVariantOption } from '../../types';
import { Check } from 'lucide-react';

interface VariantSelectorProps {
  variants: ProductVariantOption[];
  selectedVariant: ProductVariantOption | null;
  onSelectVariant: (variant: ProductVariantOption) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant
}) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-3 pt-2 pb-4">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider font-semibold text-obsidian">
          Select Option / Size:
        </label>
        {selectedVariant && (
          <span className="text-xs text-champagne-dark font-medium">
            {selectedVariant.stockQuantity > 0 ? (
              selectedVariant.stockQuantity <= 3 ? `Only ${selectedVariant.stockQuantity} left` : 'In Stock'
            ) : (
              'Sold Out'
            )}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {variants.map((variant) => {
          const isSelected = selectedVariant?.id === variant.id;
          const isOutOfStock = variant.stockQuantity <= 0;

          return (
            <button
              key={variant.id}
              onClick={() => !isOutOfStock && onSelectVariant(variant)}
              disabled={isOutOfStock}
              className={`relative py-2 px-3.5 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-obsidian text-ivory border-2 border-champagne shadow-sm'
                  : isOutOfStock
                  ? 'bg-ivory/60 text-obsidian/30 border border-black/10 cursor-not-allowed line-through'
                  : 'bg-white hover:bg-ivory/80 text-obsidian border border-black/15'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 text-champagne" />}
              <span>{variant.name}</span>
              {variant.priceModifier ? (
                <span className="text-[10px] text-champagne font-semibold">
                  (+৳{variant.priceModifier})
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
