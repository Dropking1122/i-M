import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaBook, FaShoppingBag, FaEnvelope } from 'react-icons/fa';

const LINKS = [
  { id: 'home',     Icon: FaHome },
  { id: 'projects', Icon: FaBook },
  { id: 'products', Icon: FaShoppingBag },
  { id: 'contact',  Icon: FaEnvelope },
];

export default function BottomNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      let cur = 'home';
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 200) cur = link.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-2 rounded-full bg-[#0A0F1E]/90 backdrop-blur-xl border border-white/10 shadow-2xl">
        {LINKS.map(({ id, Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={id.charAt(0).toUpperCase() + id.slice(1)}
              aria-current={isActive ? 'page' : undefined}
              className={`
                relative w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300
                ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={20} className="relative z-10" />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
