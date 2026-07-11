import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NAV_LINKS = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'Dokumentasi', href: '#projects', id: 'projects' },
  { name: 'Products', href: '#products', id: 'products' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      let cur = 'home';
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 200) cur = link.id;
      }
      setActiveId(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`
            flex items-center justify-between px-6 py-3 rounded-[2rem] transition-all duration-500
            ${scrolled ? 'bg-[#0A0F1E]/80 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent border-transparent'}
          `}>
            
            <a href="#home" className="text-xl sm:text-2xl font-black tracking-tighter z-50 select-none flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-[1.5px]">
                <div className="w-full h-full bg-[#050810] rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-black text-white">RV</span>
                </div>
              </div>
              <div>
                <span className="gradient-text-primary">REVD</span>
                <span className="text-white">STORE</span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
              {NAV_LINKS.map(({ name, href, id }) => (
                <a
                  key={id}
                  href={href}
                  className={`
                    relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                    ${activeId === id ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {activeId === id && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{name}</span>
                </a>
              ))}
            </nav>

            <button 
              className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white z-50 hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050810]/95 backdrop-blur-3xl flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {NAV_LINKS.map(({ name, href, id }) => (
                <a
                  key={id}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-4xl font-black tracking-tight ${activeId === id ? 'gradient-text-primary' : 'text-slate-500 hover:text-white transition-colors'}`}
                >
                  {name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
