import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-28 text-center space-y-4">
      <p className="text-xs uppercase tracking-widest text-champagne-dark font-bold">404 Error</p>
      <h1 className="font-display text-4xl font-bold uppercase text-obsidian">Page Not Found</h1>
      <p className="text-xs text-obsidian/60 max-w-sm mx-auto">
        The requested page does not exist or has been relocated in the vault.
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="px-6 py-3 bg-obsidian text-ivory text-xs uppercase tracking-wider font-semibold rounded hover:bg-champagne hover:text-obsidian transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};
