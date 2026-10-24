import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatBDT, calculateDiscount } from '../../lib/formatters';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const isSaved = isInWishlist(product.id);

  // Fallback image handling
  const mainImage = product.images[0] || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';
  const secondImage = product.images[1] || mainImage;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-sm overflow-hidden border border-black/5 hover:border-champagne/40 transition-all duration-300 hover:shadow-luxury"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Consistent Aspect Ratio */}
      <div className="relative aspect-square w-full bg-[#F3F1EC] overflow-hidden">
        <Link to={`/products/${product.slug}`} className="block w-full h-full">
          <img
            src={isHovered ? secondImage : mainImage}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discount > 0 && (
            <span className="bg-obsidian text-champagne text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              Save {discount}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-champagne text-obsidian text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              New Drop
            </span>
          )}
          {product.stockQuantity <= 3 && product.stockQuantity > 0 && (
            <span className="bg-red-900/80 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
              Only {product.stockQuantity} Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isSaved ? "Remove from saved items" : "Save item"}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-sm ${
            isSaved
              ? 'bg-obsidian text-champagne'
              : 'bg-white/80 hover:bg-white text-obsidian hover:text-champagne backdrop-blur-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-champagne' : ''}`} />
        </button>

        {/* Desktop Quick Actions Overlay */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (product.variants && product.variants.length > 0) {
                navigate(`/products/${product.slug}`);
              } else {
                addToCart(product);
              }
            }}
            className="flex-1 py-2 bg-obsidian text-ivory hover:bg-champagne hover:text-obsidian text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-md flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.variants && product.variants.length > 0 ? 'Select Options' : 'Add to Bag'}</span>
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label="Quick View"
              className="p-2 bg-white/90 hover:bg-white text-obsidian hover:text-champagne rounded transition-colors shadow-md"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-obsidian/50 font-semibold block mb-1">
            {product.category}
          </span>
          <Link
            to={`/products/${product.slug}`}
            className="font-medium text-sm text-obsidian hover:text-champagne transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-sm text-obsidian font-sans">
              {formatBDT(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-obsidian/40 line-through">
                {formatBDT(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Mobile direct Add button */}
          <button
            onClick={() => {
              if (product.variants && product.variants.length > 0) {
                navigate(`/products/${product.slug}`);
              } else {
                addToCart(product);
              }
            }}
            className="sm:hidden p-1.5 rounded bg-obsidian text-champagne"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
