import React from 'react';
import { FaGithub, FaInstagram, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0A0F1E] pt-16 pb-24 md:pb-16 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-8 relative z-10">
        <a href="#home" className="text-3xl font-black tracking-tighter">
          <span className="gradient-text-primary">REVD</span>
          <span className="text-white">STORE</span>
        </a>

        <div className="flex items-center gap-4">
          <a href="https://github.com/Dropking1122" aria-label="GitHub" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all hover:scale-110">
            <FaGithub size={20} />
          </a>
          <a href="https://instagram.com/revd.cloud" aria-label="Instagram" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all hover:scale-110">
            <FaInstagram size={20} />
          </a>
          <a href="https://t.me/ValltzID" aria-label="Telegram" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all hover:scale-110">
            <FaTelegram size={20} />
          </a>
        </div>

        <div className="flex flex-col items-center gap-2 pt-8 border-t border-white/5 w-full max-w-xs">
          <p className="text-slate-400 text-sm font-bold flex items-center justify-center gap-2">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" aria-label="love">❤</span>
            <span>by Revaldi</span>
          </p>
          <p className="text-slate-500 text-xs font-semibold">
            © {new Date().getFullYear()} REVD STORE. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
