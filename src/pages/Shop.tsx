import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { formatBDT } from '../lib/formatters';

export const Shop: React.FC = () => {
  const { products, categories } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategoryParam = searchParams.get('category') || 'all';
  const filterParam = searchParams.get('filter') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryParam);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Sync category param with local state
  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.isPublished) return false;
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (filterParam === 'featured' && !p.isFeatured) return false;
      if (filterParam === 'new' && !p.isNewArrival) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && p.stockQuantity <= 0) return false;
      if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, filterParam, maxPrice, inStockOnly, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSortBy('featured');
    setMaxPrice(10000);
    setInStockOnly(false);
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-champagne-dark font-bold">
          The RENSTONE Vault
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider text-obsidian">
          All Signature Accessories
        </h1>
        <p className="text-xs text-obsidian/60 max-w-xl">
          Browse our complete collection of surgical steel watches, molten crests, signet rings, cuffs, and hand-cut chains.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/10">
        {/* Category Pills (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
              selectedCategory === 'all'
                ? 'bg-obsidian text-champagne'
                : 'bg-white border border-black/15 text-obsidian hover:bg-black/5'
            }`}
          >
            All Pieces ({products.filter(p => p.isPublished).length})
          </button>
          {categories.map((c) => {
            const count = products.filter(p => p.isPublished && p.category === c.slug).length;
            return (
              <button
                key={c.id}
                onClick={() => handleCategorySelect(c.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                  selectedCategory === c.slug
                    ? 'bg-obsidian text-champagne'
                    : 'bg-white border border-black/15 text-obsidian hover:bg-black/5'
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-black/15 text-xs font-semibold rounded text-obsidian shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-champagne-dark" />
          <span>Filters & Categories</span>
        </button>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-obsidian/60 hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-black/20 rounded px-3 py-1.5 text-xs text-obsidian font-medium outline-none focus:border-champagne"
          >
            <option value="featured">Featured First</option>
            <option value="newest">Newest Releases</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6">
          {/* Price Range Slider */}
          <div className="space-y-3 bg-white p-5 rounded border border-black/10">
            <h4 className="text-xs uppercase tracking-wider font-bold text-obsidian">
              Max Price: {formatBDT(maxPrice)}
            </h4>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-champagne"
            />
            <div className="flex justify-between text-[11px] text-obsidian/50">
              <span>৳1,000</span>
              <span>৳10,000</span>
            </div>
          </div>

          {/* Stock Filter */}
          <div className="bg-white p-5 rounded border border-black/10 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-obsidian">
              Availability
            </h4>
            <label className="flex items-center gap-2 text-xs text-obsidian cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-champagne"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Active Filter Clear */}
          {(selectedCategory !== 'all' || maxPrice < 10000 || inStockOnly || filterParam !== 'all') && (
            <button
              onClick={clearAllFilters}
              className="w-full py-2 bg-black/5 hover:bg-black/10 text-obsidian text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded border border-black/10 space-y-4">
              <h3 className="font-display text-lg uppercase font-bold text-obsidian">
                No Signature Pieces Found
              </h3>
              <p className="text-xs text-obsidian/60 max-w-sm mx-auto">
                No items match your active filter criteria. Try adjusting your price threshold or clearing category filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-obsidian text-ivory text-xs uppercase tracking-wider font-semibold rounded hover:bg-champagne hover:text-obsidian transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-ivory text-obsidian p-5 shadow-2xl z-50 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <h3 className="font-display uppercase text-sm font-bold">Filter Pieces</h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 text-obsidian/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider font-bold">Collection</p>
              <button
                onClick={() => { handleCategorySelect('all'); setIsMobileFiltersOpen(false); }}
                className={`w-full text-left py-2 px-3 rounded text-xs font-semibold ${selectedCategory === 'all' ? 'bg-obsidian text-champagne' : 'bg-white'}`}
              >
                All Accessories
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { handleCategorySelect(c.slug); setIsMobileFiltersOpen(false); }}
                  className={`w-full text-left py-2 px-3 rounded text-xs font-semibold ${selectedCategory === c.slug ? 'bg-obsidian text-champagne' : 'bg-white'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider font-bold">Max Price: {formatBDT(maxPrice)}</p>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-champagne"
              />
            </div>

            {/* Availability */}
            <label className="flex items-center gap-2 text-xs font-medium">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-champagne"
              />
              <span>In Stock Only</span>
            </label>

            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full py-3 bg-obsidian text-ivory text-xs font-bold uppercase rounded shadow"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
