import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { animate } from 'animejs';
import { FaHome, FaBook, FaShoppingBag, FaEnvelope, FaTimes } from 'react-icons/fa';
import { RiMenuLine } from 'react-icons/ri';

const NAV_LINKS = [
  { name: 'Home', href: '#home', id: 'home', Icon: FaHome },
  { name: 'Dokumentasi', href: '#projects', id: 'projects', Icon: FaBook },
  { name: 'Products', href: '#products', id: 'products', Icon: FaShoppingBag },
  { name: 'Contact', href: '#contact', id: 'contact', Icon: FaEnvelope },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const logoRef = useRef<HTMLAnchorElement>(null);

  /* ── Scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let cur = 'home';
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 120) cur = link.id;
      }
      setActiveId(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Logo entrance with anime.js ── */
  useEffect(() => {
    if (logoRef.current) {
      animate(logoRef.current, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 700,
        delay: 100,
        ease: 'outCubic',
      });
    }
  }, []);

  /* ── Lock body scroll on mobile menu ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#0a0e1a]/85 backdrop-blur-xl border-b border-white/6 py-3 sm:py-4'
            : 'bg-transparent py-4 sm:py-6',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            ref={logoRef}
            href="#home"
            style={{ opacity: 0 }}
            className="text-xl sm:text-2xl font-black tracking-tighter z-50 select-none"
            onClick={() => setMenuOpen(false)}
          >
            <span className="gradient-text">REVD</span>
            <span className="text-white">STORE</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ name, href, id, Icon }) => (
              <a
                key={id}
                href={href}
                className={[
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  activeId === id
                    ? 'text-white bg-white/8'
                    : 'text-slate-400 hover:text-white hover:bg-white/5',
                ].join(' ')}
              >
                <Icon size={12} className={activeId === id ? 'text-blue-400' : 'text-slate-600'} />
                {name}
              </a>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-xl glass-card border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FaTimes size={18} /> : <RiMenuLine size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-2 px-6">
              {NAV_LINKS.map(({ name, href, id, Icon }, i) => (
                <motion.a
                  key={id}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.05, duration: 0.3, ease: 'easeOut' }}
                  className={[
                    'w-full max-w-xs flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-lg transition-all',
                    activeId === id
                      ? 'bg-white/8 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white',
                  ].join(' ')}
                >
                  <Icon size={18} className={activeId === id ? 'text-blue-400' : 'text-slate-600'} />
                  {name}
                </motion.a>
              ))}
            </div>

            <p className="text-center text-slate-600 text-xs pb-8">
              © 2026 REVD STORE
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
