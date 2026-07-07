import React, { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import {
  FaInstagram, FaWhatsapp, FaTelegram, FaGithub,
  FaEnvelope, FaCheckCircle, FaArrowRight, FaStar,
} from 'react-icons/fa';

const TITLES = ['Digital Seller', 'Networking', 'Tech Enthusiast', 'Problem Solver', 'Creative Mind'];

const SOCIALS = [
  { Icon: FaInstagram, href: 'https://instagram.com/revd.cloud',    label: 'Instagram', hover: 'hover:bg-pink-500/80 hover:border-pink-400' },
  { Icon: FaWhatsapp,  href: 'https://wa.me/revdstore/',            label: 'WhatsApp',  hover: 'hover:bg-green-500/80 hover:border-green-400' },
  { Icon: FaTelegram,  href: 'https://t.me/ValltzID',               label: 'Telegram',  hover: 'hover:bg-sky-500/80 hover:border-sky-400' },
  { Icon: FaGithub,    href: 'https://github.com/Dropking1122',     label: 'GitHub',    hover: 'hover:bg-slate-600/80 hover:border-slate-500' },
  { Icon: FaEnvelope,  href: 'mailto:me@revdstore.web.id',          label: 'Email',     hover: 'hover:bg-red-500/80 hover:border-red-400' },
];

const STATS = [
  { id: 'stat-projects', label: 'Projects',  target: 10  },
  { id: 'stat-exp',      label: 'Years Exp', target: 3   },
  { id: 'stat-clients',  label: 'Clients',   target: 200 },
];

/* ─── Ganti '/avatar.jpg' dengan path foto kamu di folder public/ ───
   Contoh: taruh file di artifacts/revd-store/public/avatar.jpg
   Kalau tidak ada foto, set ke null → otomatis tampil inisial "RV"  */
const AVATAR_PHOTO: string | null = '/avatar.jpg';

const TECH_TAGS = [
  { label: 'React',        color: '#61dafb', bg: 'rgba(97,218,251,0.12)'  },
  { label: 'Node.js',      color: '#68a063', bg: 'rgba(104,160,99,0.12)'  },
  { label: 'Laravel',      color: '#ff4433', bg: 'rgba(255,68,51,0.12)'   },
  { label: 'Telegram Bot', color: '#0088cc', bg: 'rgba(0,136,204,0.12)'   },
  { label: 'Python',       color: '#ffd43b', bg: 'rgba(255,212,59,0.12)'  },
  { label: 'MySQL',        color: '#4479a1', bg: 'rgba(68,121,161,0.12)'  },
];

/* Orbiting particles config */
const ORBIT_DOTS = [
  { r: 88,  dur: '6s',  color: 'rgba(59,130,246,0.9)',   size: 7, delay: '0s',    ccw: false },
  { r: 88,  dur: '6s',  color: 'rgba(139,92,246,0.7)',   size: 5, delay: '-3s',   ccw: false },
  { r: 108, dur: '9s',  color: 'rgba(6,182,212,0.8)',    size: 6, delay: '0s',    ccw: true  },
  { r: 108, dur: '9s',  color: 'rgba(16,185,129,0.6)',   size: 4, delay: '-4.5s', ccw: true  },
  { r: 68,  dur: '4.5s',color: 'rgba(245,158,11,0.7)',   size: 5, delay: '-2s',   ccw: false },
];

function animateCounter(el: HTMLElement, target: number, duration: number) {
  const startTime = performance.now();
  const step = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = 1 - (1 - t) * (1 - t);
    el.textContent = `${Math.round(target * eased)}+`;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function Hero() {
  const [titleIdx, setTitleIdx]     = useState(0);
  const [titleText, setTitleText]   = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgFailed, setImgFailed]   = useState(false);

  const contentRef   = useRef<HTMLDivElement>(null);
  const avatarRef    = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const tagsRef      = useRef<HTMLDivElement>(null);
  const statsAnimated = useRef(false);

  /* ── Typing animation ── */
  useEffect(() => {
    const cur = TITLES[titleIdx];
    if (!isDeleting && titleText === cur) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (isDeleting && titleText === '') {
      setIsDeleting(false);
      setTitleIdx((i) => (i + 1) % TITLES.length);
      return;
    }
    const t = setTimeout(() => {
      setTitleText(cur.substring(0, titleText.length + (isDeleting ? -1 : 1)));
    }, isDeleting ? 45 : 95);
    return () => clearTimeout(t);
  }, [titleText, isDeleting, titleIdx]);

  /* ── Hero entrance stagger ── */
  useEffect(() => {
    const items = contentRef.current?.querySelectorAll<HTMLElement>('[data-anim]');
    if (items?.length) {
      animate(Array.from(items), {
        opacity: [0, 1], translateY: [32, 0],
        duration: 800, delay: stagger(100, { start: 200 }), ease: 'outCubic',
      });
    }
    if (avatarRef.current) {
      animate(avatarRef.current, {
        opacity: [0, 1], scale: [0.72, 1],
        duration: 1000, delay: 150, ease: 'outElastic(1, 0.6)',
      });
    }
  }, []);

  /* ── Floating tech tags ── */
  useEffect(() => {
    const tags = tagsRef.current?.querySelectorAll<HTMLElement>('.tech-tag');
    if (!tags) return;
    animate(Array.from(tags), {
      opacity: [0, 1], translateY: [14, 0], scale: [0.82, 1],
      duration: 500, delay: stagger(70, { start: 900 }), ease: 'outBack(1.5)',
    });
    tags.forEach((tag, i) => {
      animate(tag, {
        translateY: [0, -(5 + (i % 3) * 3), 0],
        duration: 2200 + i * 300, delay: i * 180, ease: 'inOutSine', loop: true,
      });
    });
  }, []);

  /* ── Stats counter ── */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !statsAnimated.current) {
        statsAnimated.current = true;
        STATS.forEach(({ id, target }) => {
          const span = document.getElementById(id);
          if (span) animateCounter(span, target, 2200);
        });
        const items = el.querySelectorAll<HTMLElement>('.stat-item');
        animate(Array.from(items), {
          scale: [0.88, 1.06, 1], duration: 600, delay: stagger(80), ease: 'outBack(2)',
        });
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Magnetic buttons ── */
  const handleMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleMagnetLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    animate(e.currentTarget, {
      translateX: 0, translateY: 0, duration: 500, ease: 'outElastic(1, 0.5)',
    });
  };

  /* avatar responsive size helper */
  const avatarSize = 'w-36 h-36 xs:w-44 xs:h-44 sm:w-52 sm:h-52 lg:w-64 lg:h-64';

  return (
    <section id="home" className="min-h-[100svh] flex items-center pt-20 pb-14 md:pb-20 px-3 sm:px-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-24">

          {/* ════════════ AVATAR (top on mobile, right on desktop) ════════════ */}
          <div
            ref={avatarRef}
            style={{ opacity: 0 }}
            className="relative flex-shrink-0 flex flex-col items-center gap-4 order-1 lg:order-2"
          >
            {/* ── Orbit ring container ── */}
            <div className="relative">

              {/* Outer halo (breathes) */}
              <div
                className="halo-breathe absolute rounded-full pointer-events-none"
                style={{
                  inset: '-20px',
                  background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 68%)',
                }}
              />

              {/* Second halo — cyan, offset timing */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: '-14px',
                  background: 'radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 70%)',
                  animation: 'halo-breathe 4.5s ease-in-out infinite 1.2s',
                }}
              />

              {/* Ping rings — pulse outward */}
              <div className="ping-ring" style={{ inset: '-6px' }} />
              <div className="ping-ring" style={{ inset: '-6px', animationDelay: '1.2s' }} />

              {/* ── Orbit dots ── */}
              <div className={`absolute ${avatarSize} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none`}>
                {ORBIT_DOTS.map((dot, i) => (
                  <div
                    key={i}
                    className={dot.ccw ? 'orbit-dot-ccw' : 'orbit-dot'}
                    style={{
                      '--orbit-r': `${dot.r}px`,
                      '--orbit-dur': dot.dur,
                      animationDelay: dot.delay,
                      width: dot.size,
                      height: dot.size,
                      margin: `${-dot.size / 2}px 0 0 ${-dot.size / 2}px`,
                      background: dot.color,
                      boxShadow: `0 0 ${dot.size * 2}px ${dot.color}`,
                    } as React.CSSProperties}
                  />
                ))}
              </div>

              {/* Spinning gradient ring (outer) */}
              <div
                className="spin-ring absolute rounded-full"
                style={{
                  inset: '-4px', padding: '3px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #3b82f6)',
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0a0e1a]" />
              </div>

              {/* Reverse spin ring (dashed) */}
              <div
                className="spin-ring-reverse absolute rounded-full border border-dashed border-white/10"
                style={{ inset: '-10px' }}
              />

              {/* Avatar circle */}
              <div
                className={`relative z-10 ${avatarSize} rounded-full bg-[#0d1220] flex items-center justify-center border-2 border-[#0a0e1a] overflow-hidden`}
              >
                {/* Scan line */}
                <div className="avatar-scan" />

                {/* Inner radial glow */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle at 38% 32%, rgba(59,130,246,0.25) 0%, transparent 62%)' }}
                />

                {/* Photo atau Monogram — state-driven agar aman saat re-render */}
                {AVATAR_PHOTO && !imgFailed ? (
                  <img
                    src={AVATAR_PHOTO}
                    alt="Revaldi"
                    className="w-full h-full object-cover object-center rounded-full relative z-10"
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  <span className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black gradient-text select-none tracking-tight relative z-10 flex items-center justify-center">
                    RV
                  </span>
                )}
              </div>
            </div>

            {/* Available badge */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-green-500/30 text-green-400 text-xs sm:text-sm font-semibold tracking-wide"
              style={{ animation: 'float-badge 3.5s ease-in-out infinite' }}
            >
              <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block flex-shrink-0" />
              Available for Work
            </div>

            {/* Floating tech tags */}
            <div ref={tagsRef} className="flex flex-wrap justify-center gap-1.5 max-w-[240px] xs:max-w-[280px] sm:max-w-xs">
              {TECH_TAGS.map((tag) => (
                <span
                  key={tag.label}
                  className="tech-tag tap-active text-[10px] xs:text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-default select-none transition-transform duration-150 active:scale-95"
                  style={{ color: tag.color, background: tag.bg, borderColor: `${tag.color}30`, opacity: 0 }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* ════════════ CONTENT ════════════ */}
          <div ref={contentRef} className="flex-1 text-center lg:text-left order-2 lg:order-1 min-w-0 w-full">

            <p data-anim style={{ opacity: 0 }} className="text-slate-500 text-[10px] xs:text-xs sm:text-sm font-bold tracking-[0.22em] uppercase mb-2.5">
              Hi, I&apos;m
            </p>

            <h1 data-anim style={{ opacity: 0 }} className="text-[2.4rem] xs:text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-3">
              <span className="shimmer-text">Revaldi</span>
              <FaCheckCircle
                className="inline-block ml-2 sm:ml-3 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] align-middle"
                style={{ fontSize: 'clamp(1.1rem, 2.8vw, 2.4rem)' }}
              />
            </h1>

            {/* Typing */}
            <div data-anim style={{ opacity: 0 }} className="flex items-center justify-center lg:justify-start gap-1 h-8 sm:h-10 mb-4">
              <span className="text-sm xs:text-base sm:text-xl font-medium text-slate-300">I am a&nbsp;</span>
              <span className="text-sm xs:text-base sm:text-xl font-bold text-cyan-400">{titleText}</span>
              <span className="inline-block w-0.5 h-4 sm:h-5 bg-cyan-400 animate-pulse" />
            </div>

            <p data-anim style={{ opacity: 0 }} className="text-slate-400 text-xs xs:text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
              Digital entrepreneur &amp; tech enthusiast. Menyediakan produk digital premium dan solusi web inovatif. Mari terhubung!
            </p>

            {/* Socials */}
            <div data-anim style={{ opacity: 0 }} className="flex items-center justify-center lg:justify-start gap-2 sm:gap-2.5 mb-6 flex-wrap">
              {SOCIALS.map(({ Icon, href, label, hover }) => (
                <a
                  key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-white border border-white/8 hover:-translate-y-1 active:scale-90 transition-all duration-200 ${hover}`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div data-anim style={{ opacity: 0 }} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-8">
              <a
                href="#products"
                className="ripple-wrap px-4 py-2.5 xs:px-5 xs:py-3 sm:px-7 sm:py-3.5 rounded-xl text-white font-semibold text-xs xs:text-sm sm:text-base flex items-center gap-2 transition-all active:scale-95 shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_28px_rgba(59,130,246,0.5)]"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
                onMouseMove={handleMagnet} onMouseLeave={handleMagnetLeave}
              >
                View Products <FaArrowRight size={11} />
              </a>
              <a
                href="https://wa.me/revdstore/" target="_blank" rel="noreferrer"
                className="ripple-wrap px-4 py-2.5 xs:px-5 xs:py-3 sm:px-7 sm:py-3.5 rounded-xl glass-card border border-white/10 text-white font-semibold text-xs xs:text-sm sm:text-base flex items-center gap-2 hover:border-white/20 hover:bg-white/8 active:scale-95 transition-all"
                onMouseMove={handleMagnet} onMouseLeave={handleMagnetLeave}
              >
                <FaWhatsapp size={14} /> Contact Me
              </a>
              <a
                href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDU1MzQxNzM3MTcwMzAy?story_media_id=3710789107510843237_68244878136&igsh=MTg4YndhZzAyZjF0bg=="
                target="_blank" rel="noreferrer"
                className="ripple-wrap px-4 py-2.5 xs:px-5 xs:py-3 sm:px-6 sm:py-3.5 rounded-xl border border-pink-500/30 bg-pink-500/5 text-pink-400 text-xs xs:text-sm font-medium flex items-center gap-2 hover:bg-pink-500/12 active:scale-95 transition-all"
                onMouseMove={handleMagnet} onMouseLeave={handleMagnetLeave}
              >
                <FaStar size={10} /> Lihat Testimoni
              </a>
            </div>

            {/* Stats */}
            <div
              ref={statsRef} data-anim style={{ opacity: 0 }}
              className="flex items-start justify-center lg:justify-start gap-5 xs:gap-7 sm:gap-10 pt-5 border-t border-white/8"
            >
              {STATS.map(({ id, label }) => (
                <div key={id} className="stat-item flex flex-col items-center lg:items-start">
                  <span id={id} className="text-xl xs:text-2xl sm:text-3xl font-black gradient-text leading-none tabular-nums">0+</span>
                  <span className="text-[9px] xs:text-[10px] sm:text-xs text-slate-500 mt-1 font-bold uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
