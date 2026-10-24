import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}) => {
  const heightClass = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official RENSTONE Emblem Image */}
      <img
        src="/renstone-logo.png"
        alt="RENSTONE Fashion Accessories"
        className={`${heightClass} w-auto object-contain rounded-sm border border-champagne/30 shadow-sm transition-transform duration-300 hover:scale-105`}
      />
    </div>
  );
};
