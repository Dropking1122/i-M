import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const AVATAR_PHOTO = '/avatar.jpg';

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
  const [imgFailed, setImgFailed] = useState(false);
  const [showLogoAvatar, setShowLogoAvatar] = useState(false);

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

  // Only show the small avatar in the navbar once the big hero profile photo
  // has scrolled out of view -- avoids showing the same face twice at once.
  useEffect(() => {
    const heroAvatar = document.getElementById('hero-avatar');
    if (!heroAvatar) {
      setShowLogoAvatar(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setShowLogoAvatar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(heroAvatar);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`
            flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500
            ${scrolled ? 'bg-[#0A0F1E]/80 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent border-transparent'}
          `}>
            
            <a href="#home" className="text-xl sm:text-2xl font-black tracking-tighter z-50 select-none flex items-center gap-2">
              <AnimatePresence initial={false}>
                {showLogoAvatar && (
                  <motion.div
                    initial={{ width: 0, opacity: 0, scale: 0.6, marginRight: 0 }}
                    animate={{ width: 32, opacity: 1, scale: 1, marginRight: 8 }}
                    exit={{ width: 0, opacity: 0, scale: 0.6, marginRight: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="h-8 rounded-full overflow-hidden border border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.3)] shrink-0"
                  >
                    {!imgFailed ? (
                      <img
                        src={AVATAR_PHOTO}
                        alt="Revaldi"
                        className="w-8 h-8 object-cover"
                        onError={() => setImgFailed(true)}
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-[1.5px]">
                        <div className="w-full h-full bg-[#050810] rounded-full flex items-center justify-center">
                          <span className="text-[10px] font-black text-white">RV</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <div>
                <span className="gradient-text-primary">REVD</span>
                <span className="text-white">STORE</span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
              {NAV_LINKS.map(({ name, href, id }) => (
                <a
                  key={id}
                  href={href}
                  className={`
                    relative px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300
                    ${activeId === id ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  {activeId === id && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{name}</span>
                </a>
              ))}
            </nav>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white z-50 hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className="relative w-4 h-3 flex flex-col justify-between">
                <motion.span
                  className="block h-[2px] w-full bg-current rounded-full origin-center"
                  animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <motion.span
                  className="block h-[2px] w-full bg-current rounded-full"
                  animate={menuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-[2px] w-full bg-current rounded-full origin-center"
                  animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </span>
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050810]/98 backdrop-blur-3xl flex flex-col md:hidden overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-600/10 blur-[100px]" />

            <div className="flex-1 flex flex-col items-center justify-center px-8">
              <nav className="flex flex-col items-stretch gap-1 w-full max-w-xs">
                {NAV_LINKS.map(({ name, href, id }, i) => (
                  <motion.a
                    key={id}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.35, ease: 'easeOut' }}
                    whileTap={{ scale: 0.97 }}
                    className={`group flex items-center justify-between py-4 border-b border-white/5 ${
                      activeId === id ? '' : 'text-slate-500'
                    }`}
                  >
                    <span
                      className={`text-3xl font-black tracking-tight transition-colors ${
                        activeId === id ? 'gradient-text-primary' : 'group-hover:text-white'
                      }`}
                    >
                      {name}
                    </span>
                    <span className={`text-xs font-mono ${activeId === id ? 'text-cyan-400' : 'text-slate-600'}`}>
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.08 + NAV_LINKS.length * 0.06, duration: 0.35, ease: 'easeOut' }}
                whileTap={{ scale: 0.96 }}
                className="mt-10 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-[#050810] font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <FaWhatsapp className="text-base" />
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
