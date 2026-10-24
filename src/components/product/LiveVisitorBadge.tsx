import React, { useState, useEffect } from 'react';
import { Eye, TrendingUp, Users } from 'lucide-react';

interface LiveVisitorBadgeProps {
  productId?: string;
  category?: string;
}

export const LiveVisitorBadge: React.FC<LiveVisitorBadgeProps> = ({ productId, category }) => {
  // Generate a realistic seed based on product ID
  const baseCount = React.useMemo(() => {
    if (!productId) return 12;
    let hash = 0;
    for (let i = 0; i < productId.length; i++) {
      hash = (hash << 5) - hash + productId.charCodeAt(i);
      hash |= 0;
    }
    return 9 + (Math.abs(hash) % 11); // between 9 and 19 viewers
  }, [productId]);

  const [activeViewers, setActiveViewers] = useState(baseCount);
  const [recentOrders, setRecentOrders] = useState(() => Math.max(2, Math.floor(baseCount / 3)));

  // Fluctuate viewers naturally
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewers((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        const next = prev + delta;
        return next >= 6 && next <= 25 ? next : prev;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-obsidian-surface via-obsidian to-obsidian-pure text-ivory p-3.5 rounded-lg border border-champagne/30 shadow-md space-y-2">
      {/* Live Viewers Indicator */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {/* Pulsing Green Live Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>

          <span className="font-semibold text-ivory text-xs sm:text-sm">
            <span className="text-champagne font-bold">{activeViewers} people</span> are viewing this piece right now
          </span>
        </div>

        <Eye className="w-4 h-4 text-champagne/60 hidden sm:block" />
      </div>

      {/* Social Proof Line */}
      <div className="flex items-center gap-2 text-[11px] text-ivory/70 border-t border-white/10 pt-2">
        <TrendingUp className="w-3.5 h-3.5 text-champagne-light flex-shrink-0" />
        <span>
          <strong className="text-champagne font-semibold">{recentOrders} orders</strong> placed in the last 24 hours across Bangladesh
        </span>
      </div>
    </div>
  );
};
