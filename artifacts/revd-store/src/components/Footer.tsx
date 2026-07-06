import React from 'react';

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-white/6 py-7 sm:py-9 text-center"
      style={{ background: 'rgba(5,8,16,0.8)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-slate-400 text-sm mb-1">
          Made with{' '}
          <span
            className="inline-block mx-0.5 text-pink-500"
            style={{ filter: 'drop-shadow(0 0 6px rgba(236,72,153,0.6))' }}
          >
            ♥
          </span>{' '}
          by <span className="font-semibold text-white">Revaldi</span>
        </p>
        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} REVD STORE. All rights reserved.</p>
      </div>
    </footer>
  );
}
