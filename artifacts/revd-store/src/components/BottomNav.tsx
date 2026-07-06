import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { FaHome, FaBook, FaShoppingBag, FaEnvelope } from 'react-icons/fa';

const LINKS = [
  { id: 'home', Icon: FaHome, label: 'Home' },
  { id: 'projects', Icon: FaBook, label: 'Docs' },
  { id: 'products', Icon: FaShoppingBag, label: 'Shop' },
  { id: 'contact', Icon: FaEnvelope, label: 'Contact' },
];

export default function BottomNav() {
  const [active, setActive] = useState('home');
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      let cur = 'home';
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 130) cur = link.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTap = (idx: number) => {
    const el = itemRefs.current[idx];
    if (!el) return;
    // Spring bounce on tap
    animate(el, {
      scale: [1, 0.82, 1.12, 1],
      duration: 480,
      ease: 'outElastic(1, 0.55)',
    });
    // Icon pop
    const icon = el.querySelector<HTMLElement>('.bn-icon');
    if (icon) {
      animate(icon, {
        translateY: [0, -6, 0],
        duration: 380,
        ease: 'outBack(2)',
      });
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(7,10,20,0.97)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex">
        {LINKS.map(({ id, Icon, label }, idx) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              ref={(el) => { itemRefs.current[idx] = el; }}
              href={`#${id}`}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 h-[58px] relative transition-colors duration-200"
              style={{ color: isActive ? '#3b82f6' : 'rgba(148,163,184,0.65)' }}
              onClick={() => handleTap(idx)}
            >
              {/* Active pill indicator (top) */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2px] rounded-full"
                  style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
                />
              )}

              {/* Icon */}
              <span
                className="bn-icon flex items-center justify-center w-7 h-7 rounded-xl transition-all duration-200"
                style={isActive ? {
                  background: 'rgba(59,130,246,0.15)',
                  filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.6))',
                } : {}}
              >
                <Icon size={17} />
              </span>

              <span
                className="text-[9px] font-bold uppercase tracking-widest transition-colors duration-200"
                style={{ color: isActive ? '#3b82f6' : 'rgba(148,163,184,0.5)' }}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
