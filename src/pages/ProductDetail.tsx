import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Truck, Clock, RefreshCw, MessageSquare, ShoppingBag, 
  Heart, ChevronDown, Check, ArrowRight, Share2 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductGallery } from '../components/product/ProductGallery';
import { VariantSelector } from '../components/product/VariantSelector';
import { StickyPurchaseBar } from '../components/product/StickyPurchaseBar';
import { ProductCard } from '../components/product/ProductCard';
import { formatBDT, calculateDiscount, cleanPhoneForWhatsApp } from '../lib/formatters';
import { ProductVariantOption } from '../types';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, settings } = useStore();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist, addRecentlyViewed, recentlyViewed } = useWishlist();

  const product = products.find((p) => p.slug === slug);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariantOption | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<string>('description');
  const [hasCopiedShare, setHasCopiedShare] = useState(false);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      if (product.variants && product.variants.length > 0) {
        // Default to first in-stock variant
        const firstAvailable = product.variants.find(v => v.stockQuantity > 0) || product.variants[0];
        setSelectedVariant(firstAvailable);
      } else {
        setSelectedVariant(null);
      }
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold uppercase text-obsidian">Piece Not Found</h2>
        <p className="text-xs text-obsidian/60">This signature design may have been retired or moved.</p>
        <Link
          to="/shop"
          className="inline-flex px-6 py-2.5 bg-obsidian text-ivory text-xs uppercase tracking-wider font-semibold rounded hover:bg-champagne hover:text-obsidian transition-colors"
        >
          Return to Vault
        </Link>
      </div>
    );
  }

  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const isSaved = isInWishlist(product.id);

  const currentPrice = selectedVariant && selectedVariant.priceModifier
    ? product.price + selectedVariant.priceModifier
    : product.price;

  const currentCompareAt = product.compareAtPrice
    ? (selectedVariant && selectedVariant.priceModifier ? product.compareAtPrice + selectedVariant.priceModifier : product.compareAtPrice)
    : undefined;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant || undefined, quantity);
  };

  const handleWhatsAppOrder = () => {
    const phone = cleanPhoneForWhatsApp(settings.whatsappNumber);
    const variantText = selectedVariant ? `\nOption: ${selectedVariant.name}` : '';
    const msg = `Hello RENSTONE,\nI would like to order:\n*${product.name}*${variantText}\nQty: ${quantity}\nPrice: ৳${currentPrice * quantity}\n\nPlease confirm availability and delivery to my address.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setHasCopiedShare(true);
    setTimeout(() => setHasCopiedShare(false), 2000);
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && p.isPublished)
    .slice(0, 4);

  // Recently viewed products
  const recentProducts = products
    .filter((p) => recentlyViewed.includes(p.id) && p.id !== product.id && p.isPublished)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-obsidian/50 font-medium">
        <Link to="/" className="hover:text-champagne transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-champagne transition-colors">Shop</Link>
        <span>/</span>
        <Link to={`/collections/${product.category}`} className="capitalize hover:text-champagne transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-obsidian truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left Column: Gallery */}
        <div className="sticky top-24">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Information, Pricing, Variants & Purchase Controls */}
        <div className="space-y-6">
          {/* Header & Badges */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-widest text-champagne-dark font-bold">
                {product.category}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-1.5 text-obsidian/50 hover:text-champagne transition-colors"
                  title="Share link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {hasCopiedShare && (
                  <span className="text-[10px] text-champagne-dark font-semibold">Link Copied!</span>
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-1.5 rounded-full border transition-colors ${
                    isSaved ? 'text-champagne border-champagne bg-obsidian' : 'text-obsidian/50 border-black/10 hover:text-champagne'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-champagne' : ''}`} />
                </button>
              </div>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-obsidian leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-black/10">
            <span className="text-2xl sm:text-3xl font-bold text-obsidian font-sans">
              {formatBDT(currentPrice)}
            </span>
            {currentCompareAt && currentCompareAt > currentPrice && (
              <span className="text-base text-obsidian/40 line-through">
                {formatBDT(currentCompareAt)}
              </span>
            )}
            {discount > 0 && (
              <span className="px-2.5 py-0.5 rounded bg-obsidian text-champagne text-xs font-bold uppercase tracking-wider">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Key Product Highlights (Inspired by reference) */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="space-y-2 bg-white p-4 rounded border border-black/10">
              <p className="text-[11px] uppercase tracking-wider font-bold text-obsidian">
                Signature Attributes
              </p>
              <ul className="space-y-1.5 text-xs text-obsidian/80">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-champagne-dark flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={(v) => setSelectedVariant(v)}
            />
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-black/20 rounded bg-white h-12 px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-obsidian/70 hover:text-champagne font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-obsidian">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-obsidian/70 hover:text-champagne font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-white hover:bg-ivory border-2 border-obsidian text-obsidian text-xs font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            {/* Primary WhatsApp Order CTA */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full h-13 py-3.5 bg-obsidian hover:bg-champagne hover:text-obsidian text-ivory font-display text-xs font-bold uppercase tracking-widest rounded transition-all shadow-xl flex items-center justify-center gap-2.5 group"
            >
              <MessageSquare className="w-4 h-4 text-champagne group-hover:text-obsidian transition-colors" />
              <span>Order Instantly via WhatsApp Concierge</span>
            </button>
          </div>

          {/* Delivery & Assurance Card */}
          <div className="p-4 bg-white rounded border border-black/10 space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-champagne-dark flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-obsidian">Dhaka & Nationwide Express Delivery</p>
                <p className="text-obsidian/60 text-[11px] mt-0.5">
                  Dhaka: 24–48 Hours (৳{settings.dhakaDeliveryFee || 80}) • Outside Dhaka: 48–72 Hours (৳{settings.outsideDhakaDeliveryFee || 150}). Free on orders over ৳5,000.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-black/5 pt-2.5">
              <RefreshCw className="w-4 h-4 text-champagne-dark flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-obsidian">Cash on Delivery & Doorstep Inspection</p>
                <p className="text-obsidian/60 text-[11px] mt-0.5">
                  Inspect the physical piece and finish with the courier before completing payment.
                </p>
              </div>
            </div>
          </div>

          {/* Luxury Accordion Details */}
          <div className="border-t border-black/10 divide-y divide-black/10 pt-2">
            {/* Description */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === 'description' ? '' : 'description')}
                className="w-full py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-obsidian text-left"
              >
                <span>Description & Architecture</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'description' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'description' && (
                <div className="pb-4 text-xs text-obsidian/75 leading-relaxed space-y-2">
                  <p>{product.description}</p>
                </div>
              )}
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
                  className="w-full py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-obsidian text-left"
                >
                  <span>Technical Specifications</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'specs' && (
                  <div className="pb-4 text-xs space-y-1.5">
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-black/5">
                        <span className="text-obsidian/60">{spec.label}</span>
                        <span className="font-semibold text-obsidian">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Shipping & Returns */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                className="w-full py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-obsidian text-left"
              >
                <span>Shipping, Inspection & Returns</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'shipping' && (
                <div className="pb-4 text-xs text-obsidian/75 leading-relaxed space-y-2">
                  <p>
                    All orders are dispatched from our Dhaka distribution facility in tamper-evident RENSTONE presentation packaging. You are encouraged to inspect the item upon delivery. 
                  </p>
                  <p>
                    7-day hassle-free replacement in case of transit damage or sizing exchange.
                  </p>
                </div>
              )}
            </div>

            {/* Warranty & Care */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === 'warranty' ? '' : 'warranty')}
                className="w-full py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-obsidian text-left"
              >
                <span>Warranty & Metal Care</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'warranty' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'warranty' && (
                <div className="pb-4 text-xs text-obsidian/75 leading-relaxed space-y-2">
                  <p>{product.warranty || '2-Year Craftsmanship & Color Guarantee across Bangladesh.'}</p>
                  <p className="text-obsidian/60">{product.careInstructions || 'Rinse with fresh water after pool or ocean use. Polish gently with a microfiber cloth.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Pieces from Same Category */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-black/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-obsidian">
              Complementary Pieces
            </h3>
            <Link
              to={`/collections/${product.category}`}
              className="text-xs uppercase tracking-wider font-semibold text-champagne-dark hover:text-obsidian transition-colors inline-flex items-center gap-1"
            >
              <span>Explore {product.category}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentProducts.length > 0 && (
        <section className="pt-8 border-t border-black/10">
          <h3 className="font-display text-xl font-bold uppercase tracking-wider text-obsidian mb-6">
            Recently Viewed
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {recentProducts.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom Bar on Mobile */}
      <StickyPurchaseBar
        product={product}
        selectedVariant={selectedVariant}
        onAddToCart={handleAddToCart}
        onWhatsAppOrder={handleWhatsAppOrder}
      />
    </div>
  );
};
