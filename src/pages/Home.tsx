import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Compass, Clock, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';

export const Home: React.FC = () => {
  const { products, categories } = useStore();

  const featuredProducts = products.filter(p => p.isPublished && p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isPublished && p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Editorial Luxury Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center bg-obsidian-pure text-ivory overflow-hidden">
        {/* Background Editorial Image with Luxury Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=85"
            alt="RENSTONE Luxury Editorial Accessories"
            className="w-full h-full object-cover object-center opacity-40 scale-105 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-pure via-obsidian/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-pure via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter Signature Drop</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[1.08] text-ivory">
              Own Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark">
                Signature Style.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-ivory/80 leading-relaxed font-sans max-w-xl">
              Precision timepieces, molten crest talismans, and sculptural accessories engineered from 316L marine steel and obsidian stone. Crafted for men who wear distinction with quiet authority.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/shop"
                className="py-4 px-8 bg-champagne hover:bg-champagne-light text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow-xl hover:shadow-champagne/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/shop?filter=featured"
                className="py-4 px-8 bg-obsidian-surface/80 hover:bg-white/10 text-ivory border border-white/20 hover:border-champagne/50 font-display uppercase tracking-widest text-xs font-semibold rounded backdrop-blur-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Bestsellers</span>
              </Link>
            </div>

            {/* Quick Guarantees Under Hero */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 text-xs text-ivory/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-champagne" />
                <span>316L Surgical Steel</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-champagne" />
                <span>24-48h Dhaka Delivery</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-champagne" />
                <span>Doorstep Inspection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <p className="text-xs uppercase tracking-widest text-champagne-dark font-bold">
            Curated Categories
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-obsidian">
            The Collections
          </h2>
          <p className="text-xs text-obsidian/60">
            Engineered silhouettes built to complement tailored suits or casual silhouettes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/collections/${cat.slug}`}
              className="group relative aspect-[4/5] rounded overflow-hidden shadow-sm bg-obsidian"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />

              <div className="absolute inset-x-3 bottom-4 text-center">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ivory group-hover:text-champagne transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-champagne font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Pieces →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-black/10">
          <div>
            <p className="text-xs uppercase tracking-widest text-champagne-dark font-bold">
              Most Coveted
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-obsidian">
              Bestsellers
            </h2>
          </div>
          <Link
            to="/shop?filter=featured"
            className="text-xs font-semibold uppercase tracking-wider text-obsidian hover:text-champagne-dark transition-colors inline-flex items-center gap-1.5 mt-2 sm:mt-0"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Campaign Feature Banner */}
      <section className="bg-obsidian-pure text-ivory py-16 sm:py-20 border-y border-champagne/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-video lg:aspect-square rounded overflow-hidden border border-champagne/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85"
                alt="Obsidian and Gold Collection"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
            </div>

            <div className="space-y-5">
              <span className="text-xs uppercase tracking-widest text-champagne font-bold">
                Limited Edition Capsule
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide leading-tight text-ivory">
                The Obsidian & Champagne Gold Series
              </h2>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-sans">
                Each piece in this exclusive collection undergoes a dual-cycle high-vacuum PVD treatment. Engineered to withstand Bangladesh's tropical humidity, sweat, and daily wear without ever losing its deep satin finish or rich champagne hue.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="py-3 px-6 bg-champagne hover:bg-champagne-light text-obsidian text-xs uppercase tracking-widest font-bold rounded shadow transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore The Capsule</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-black/10">
          <div>
            <p className="text-xs uppercase tracking-widest text-champagne-dark font-bold">
              Just Dropped
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-obsidian">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop?filter=new"
            className="text-xs font-semibold uppercase tracking-wider text-obsidian hover:text-champagne-dark transition-colors inline-flex items-center gap-1.5 mt-2 sm:mt-0"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-10">
        <span className="text-xs uppercase tracking-widest text-champagne-dark font-bold">
          The RENSTONE Philosophy
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide text-obsidian">
          Timeless Style. Distinctive Details.
        </h2>
        <div className="w-12 h-[2px] bg-champagne mx-auto" />
        <p className="text-xs sm:text-sm text-obsidian/75 leading-relaxed max-w-2xl mx-auto">
          RENSTONE was founded to redefine men's accessories in Bangladesh. We believe that true confidence lies in restraint—clean geometry, authentic weight, and indestructible metals that speak without shouting. From our Gulshan studio to your doorstep, every piece is inspected by hand before dispatch.
        </p>
      </section>
    </div>
  );
};
