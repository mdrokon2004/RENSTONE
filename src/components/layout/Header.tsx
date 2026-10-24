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

            {/* Official RENSTONE Logo with generous luxury spacing */}
            <Link to="/" className="flex items-center gap-3 group mr-8 lg:mr-12 xl:mr-16">
              <img
                src="/renstone-logo.png"
                alt="RENSTONE Fashion Accessories"
                className="h-10 sm:h-12 w-auto object-contain rounded border border-champagne/40 shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
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
              {/* Official Facebook Page Link */}
              <a
                href="https://www.facebook.com/profile.php?id=61594618265976"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-ivory/80 hover:text-[#1877F2] transition-colors"
                title="Follow RENSTONE on Facebook"
                aria-label="Facebook Page"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

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
