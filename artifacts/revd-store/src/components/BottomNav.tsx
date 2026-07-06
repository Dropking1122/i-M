import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { FaHome, FaBook, FaShoppingBag, FaEnvelope } from 'react-icons/fa';

const LINKS = [
  { id: 'home',     Icon: FaHome,        label: 'Home',    color: '#3b82f6' },
  { id: 'projects', Icon: FaBook,        label: 'Docs',    color: '#8b5cf6' },
  { id: 'products', Icon: FaShoppingBag, label: 'Shop',    color: '#06b6d4' },
  { id: 'contact',  Icon: FaEnvelope,    label: 'Contact', color: '#10b981' },
];

export default function BottomNav() {
  const [active, setActive] = useState('home');
  const [prevActive, setPrevActive] = useState('home');
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      let cur = 'home';
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (el && window.scrollY >= el.offsetTop - 130) cur = link.id;
      }
      setActive((prev) => {
        if (prev !== cur) setPrevActive(prev);
        return cur;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Animate pill glow when active changes */
  useEffect(() => {
    if (pillRef.current) {
      animate(pillRef.current, {
        scaleX: [0.6, 1], opacity: [0.4, 1],
        duration: 300, ease: 'outBack(1.8)',
      });
    }
  }, [active]);

  const handleTap = (idx: number) => {
    const el = itemRefs.current[idx];
    if (!el) return;
    /* Spring bounce */
    animate(el, {
      scale: [1, 0.8, 1.15, 1],
      duration: 520, ease: 'outElastic(1, 0.5)',
    });
    /* Icon pop up */
    const icon = el.querySelector<HTMLElement>('.bn-icon');
    if (icon) {
      animate(icon, {
        translateY: [0, -8, 0],
        duration: 420, ease: 'outBack(2)',
      });
    }
    /* Label flash */
    const label = el.querySelector<HTMLElement>('.bn-label');
    if (label) {
      animate(label, {
        scale: [1, 1.18, 1],
        duration: 320, ease: 'outBack(2)',
      });
    }
  };

  const activeColor = LINKS.find(l => l.id === active)?.color ?? '#3b82f6';

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(6,9,18,0.97)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Animated top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${activeColor}80 50%, transparent 100%)`,
          boxShadow: `0 0 12px ${activeColor}60`,
        }}
      />

      <div className="flex relative">
        {LINKS.map(({ id, Icon, label, color }, idx) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              ref={(el) => { itemRefs.current[idx] = el; }}
              href={`#${id}`}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 h-[60px] relative select-none"
              onClick={() => handleTap(idx)}
            >
              {/* Active indicator pill (top) */}
              {isActive && (
                <span
                  ref={pillRef}
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full"
                  style={{
                    width: '36px',
                    background: `linear-gradient(90deg, ${color}80, ${color}, ${color}80)`,
                    boxShadow: `0 0 10px ${color}`,
                  }}
                />
              )}

              {/* Icon wrapper */}
              <span
                className="bn-icon flex items-center justify-center w-8 h-8 rounded-2xl transition-all duration-300"
                style={isActive ? {
                  background: `${color}20`,
                  boxShadow: `0 0 14px ${color}50`,
                  color,
                } : { color: 'rgba(148,163,184,0.55)' }}
              >
                <Icon size={isActive ? 18 : 16} />
              </span>

              {/* Label */}
              <span
                className="bn-label text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                style={{ color: isActive ? color : 'rgba(148,163,184,0.45)' }}
              >
                {label}
              </span>

              {/* Active dot below label */}
              {isActive && (
                <span
                  className="absolute bottom-1 w-1 h-1 rounded-full"
                  style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
