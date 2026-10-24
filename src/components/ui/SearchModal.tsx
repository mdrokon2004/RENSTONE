import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatBDT } from '../../lib/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products } = useStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(p =>
        p.isPublished && (
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
        )
      )
    : [];

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/products/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-obsidian-surface text-ivory rounded-lg shadow-2xl border border-champagne/30 overflow-hidden z-10 animate-fade-in">
        {/* Search Header */}
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <Search className="w-5 h-5 text-champagne" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search watches, pendants, rings, chains..."
            autoFocus
            className="flex-1 bg-transparent border-none text-base text-ivory placeholder:text-ivory/40 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-ivory/60 hover:text-champagne transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-ivory/50 text-xs">
              <p>Type to search our collection of signature accessories.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Watches', 'Pendants', 'Rings', 'Chains', 'Bracelets'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 bg-obsidian border border-white/10 hover:border-champagne/40 rounded-full text-xs text-ivory/80 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-champagne font-semibold mb-3">
                {results.length} Matching Pieces
              </p>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="flex items-center gap-4 p-2.5 rounded-md hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded border border-white/10 group-hover:border-champagne/40"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ivory group-hover:text-champagne transition-colors truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-champagne font-semibold">
                      {formatBDT(product.price)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ivory/30 group-hover:text-champagne group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-ivory/60 text-xs">
              No signature pieces found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
