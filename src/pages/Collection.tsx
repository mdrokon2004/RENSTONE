import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';

export const Collection: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { categories, products } = useStore();

  const category = categories.find((c) => c.slug === slug);
  const matchingProducts = products.filter((p) => p.category === slug && p.isPublished);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl font-bold uppercase">Collection Not Found</h2>
        <Link to="/shop" className="mt-4 inline-block text-xs uppercase tracking-wider font-bold text-champagne-dark underline">
          Browse All Pieces
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Category Hero Banner */}
      <div className="relative rounded-lg overflow-hidden bg-obsidian-pure text-ivory p-8 sm:p-14 border border-champagne/20">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="text-xs uppercase tracking-widest text-champagne font-bold">
            Curated Vault
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-wider text-ivory">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-sans">
            {category.description}
          </p>
          <p className="text-[11px] uppercase tracking-wider text-champagne/80 font-semibold pt-2">
            {matchingProducts.length} Signature Pieces Available
          </p>
        </div>
      </div>

      {/* Grid */}
      {matchingProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded border border-black/10">
          <p className="text-xs text-obsidian/60">New designs currently in production for this collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {matchingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
