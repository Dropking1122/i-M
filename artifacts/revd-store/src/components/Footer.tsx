import React from 'react';
import { FaGithub, FaInstagram, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0A0F1E] pt-12 pb-24 md:pb-12 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6 relative z-10">
        <a href="#home" className="text-2xl font-black tracking-tighter">
          <span className="gradient-text-primary">REVD</span>
          <span className="text-white">STORE</span>
        </a>

        <div className="flex items-center gap-4">
          <a href="https://github.com/Dropking1122" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <FaGithub size={18} />
          </a>
          <a href="https://instagram.com/revd.cloud" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <FaInstagram size={18} />
          </a>
          <a href="https://t.me/ValltzID" aria-label="Telegram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <FaTelegram size={18} />
          </a>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <p className="text-slate-400 text-sm font-semibold flex items-center justify-center gap-1.5">
            <span>Made with</span>
            <span className="text-red-500" aria-label="love">❤</span>
            <span>by Revaldi</span>
          </p>
          <p className="text-slate-600 text-xs font-medium">
            © {new Date().getFullYear()} REVD STORE. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
