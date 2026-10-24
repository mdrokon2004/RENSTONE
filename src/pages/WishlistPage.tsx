import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();
  const { products } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id) && p.isPublished);

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-black/5 mx-auto flex items-center justify-center text-obsidian/40">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold uppercase text-obsidian">Your Wishlist is Empty</h2>
        <p className="text-xs text-obsidian/60 max-w-sm mx-auto">
          Save your favorite timepieces and pendants to curate your personal style.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian text-ivory text-xs uppercase tracking-wider font-semibold rounded hover:bg-champagne hover:text-obsidian transition-colors"
        >
          <span>Explore Pieces</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-champagne-dark font-bold">
          Curated Favorites
        </p>
        <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-obsidian">
          My Saved Pieces ({savedProducts.length})
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
