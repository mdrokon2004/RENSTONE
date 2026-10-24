import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, Shield, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useStore } from '../../context/StoreContext';
import { MobileNav } from './MobileNav';
import { SearchModal } from '../ui/SearchModal';

export const Header: React.FC = () => {
  const location = useLocation();
  const { totalItems, openCart } = useCart();
  const { wishlist } = useWishlist();
  const { categories } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', path: '/shop' },
    ...categories.map(c => ({ name: c.name, path: `/collections/${c.slug}` })),
    { name: 'New Arrivals', path: '/shop?filter=new' }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian/95 backdrop-blur-md text-ivory shadow-lg border-b border-champagne/20 py-3.5'
            : 'bg-obsidian text-ivory border-b border-obsidian-border py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="p-2 -ml-2 text-ivory/80 hover:text-champagne transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo & Wordmark */}
            <Link to="/" className="flex items-center gap-2.5 group">
              {/* Gemstone Geometric Minimalist Symbol */}
              <div className="w-8 h-8 rounded bg-gradient-to-br from-champagne via-champagne-light to-champagne-dark p-[1px] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-obsidian-pure rounded-[3px] flex items-center justify-center">
                  <svg className="w-4 h-4 text-champagne" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                    <line x1="12" y1="2" x2="12" y2="22" stroke="#111111" strokeWidth="1" />
                    <line x1="2" y1="8.5" x2="22" y2="15.5" stroke="#111111" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-display tracking-[0.22em] text-xl font-bold uppercase text-ivory group-hover:text-champagne transition-colors">
                  RENSTONE
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-champagne font-medium -mt-1 hidden sm:block">
                  Timeless Style
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs uppercase tracking-widest font-medium transition-all duration-200 relative py-1 ${
                      isActive
                        ? 'text-champagne'
                        : 'text-ivory/80 hover:text-champagne'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-champagne rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-ivory/80 hover:text-champagne transition-colors"
                aria-label="Search accessories"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="p-2 text-ivory/80 hover:text-champagne transition-colors relative"
                aria-label="Saved items"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-champagne text-obsidian text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Toggle */}
              <button
                onClick={openCart}
                className="p-2 text-ivory/80 hover:text-champagne transition-colors relative group"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-champagne text-obsidian font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Admin Portal Shortcut Button */}
              <Link
                to="/admin"
                className="hidden xl:flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-ivory/60 hover:text-champagne border border-white/10 hover:border-champagne/40 px-2.5 py-1.5 rounded transition-all"
                title="Secure Admin Portal"
              >
                <Shield className="w-3.5 h-3.5 text-champagne" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        links={navLinks}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
