import React, { useEffect, useState } from 'react';
import { Eye, TrendingUp, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface LiveVisitorBadgeProps {
  productId: string;
  category?: string;
}

export const LiveVisitorBadge: React.FC<LiveVisitorBadgeProps> = ({ productId }) => {
  const { trackProductView, getProductViews, getProductSalesCount } = useStore();
  const [viewCount, setViewCount] = useState<number>(1);
  const [salesCount, setSalesCount] = useState<number>(0);

  useEffect(() => {
    if (productId) {
      // Record real page visit
      const views = trackProductView(productId);
      setViewCount(views);
      const sales = getProductSalesCount(productId);
      setSalesCount(sales);
    }
  }, [productId]);

  return (
    <div className="bg-gradient-to-r from-obsidian-surface via-obsidian to-obsidian-pure text-ivory p-3.5 rounded-lg border border-champagne/40 shadow-md space-y-2.5">
      {/* 100% Real View Count */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {/* Pulsing Live Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>

          <span className="font-semibold text-ivory text-xs sm:text-sm">
            <span className="text-champagne font-bold">{viewCount}</span> {viewCount === 1 ? 'person' : 'people'} watching this product
          </span>
        </div>

        <Eye className="w-4 h-4 text-champagne/70 hidden sm:block" />
      </div>

      {/* Verified Sales / Stock Status (Real Database or Admin Confirmed) */}
      <div className="flex items-center gap-2 text-[11px] text-ivory/75 border-t border-white/10 pt-2">
        {salesCount > 0 ? (
          <>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>
              <strong className="text-champagne font-semibold">{salesCount} {salesCount === 1 ? 'order' : 'orders'}</strong> confirmed by admin
            </span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-3.5 h-3.5 text-champagne-light flex-shrink-0" />
            <span>
              Authentic limited drop • Direct WhatsApp reservation available
            </span>
          </>
        )}
      </div>
    </div>
  );
};
