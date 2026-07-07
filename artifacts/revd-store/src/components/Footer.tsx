import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { FaHeart, FaGithub, FaInstagram, FaTelegram } from 'react-icons/fa';

const LINKS = [
  { Icon: FaGithub,    href: 'https://github.com/Dropking1122',  label: 'GitHub'    },
  { Icon: FaInstagram, href: 'https://instagram.com/revd.cloud', label: 'Instagram' },
  { Icon: FaTelegram,  href: 'https://t.me/ValltzID',            label: 'Telegram'  },
];

export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const heartRef   = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animated   = useRef(false);

  /* ── Scroll-triggered entrance ── */
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const items = contentRef.current?.querySelectorAll<HTMLElement>('[data-fi]');
    items?.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(16px)'; });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;

        if (items?.length) {
          animate(Array.from(items), {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 500,
            delay: stagger(70),
            ease: 'outCubic',
          });
        }
      }
    }, { threshold: 0.3 });

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  /* ── Heart beat loop ── */
  useEffect(() => {
    const heart = heartRef.current;
    if (!heart) return;
    animate(heart, {
      scale: [1, 1.4, 1, 1.25, 1],
      duration: 1200,
      delay: 1000,
      ease: 'inOutQuad',
      loop: true,
      loopDelay: 2000,
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 border-t border-white/6 pt-7 sm:pt-9 pb-[80px] md:pb-9 text-center"
      style={{ background: 'rgba(5,8,16,0.92)' }}
    >
      {/* Top animated glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(139,92,246,0.5), transparent)' }}
      />

      <div ref={contentRef} className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Brand */}
        <p data-fi className="text-lg font-black tracking-wider mb-1">
          <span className="gradient-text">REVD</span>
          <span className="text-white">STORE</span>
        </p>

        {/* Made with heart */}
        <p data-fi className="text-slate-400 text-sm mb-3 flex items-center justify-center gap-1.5">
          Made with{' '}
          <span
            ref={heartRef}
            className="inline-block text-pink-500"
            style={{ filter: 'drop-shadow(0 0 8px rgba(236,72,153,0.7))' }}
          >
            <FaHeart size={12} />
          </span>{' '}
          by <span className="font-semibold text-white">Revaldi</span>
        </p>

        {/* Social links */}
        <div data-fi className="flex items-center justify-center gap-3 mb-4">
          {LINKS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-xl glass-card border border-white/8 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:-translate-y-0.5 active:scale-90 transition-all duration-200"
            >
              <Icon size={13} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p data-fi className="text-slate-600 text-xs">
          © {new Date().getFullYear()} REVD STORE. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
