import React, { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { FaVideo, FaPaintBrush, FaTv, FaFilm, FaShieldAlt, FaPlay, FaWhatsapp, FaGem, FaFire, FaStar } from 'react-icons/fa';

interface Product {
  name: string; desc: string;
  Icon: React.ElementType; gradFrom: string; gradTo: string;
  badge?: { label: string; color: string };
  img?: string;
}

const PRODUCTS: Product[] = [
  { name: 'CapCut Pro Private',  desc: 'Premium video editing',      Icon: FaVideo,     gradFrom: '#1a1a2e', gradTo: '#16213e', badge: { label: 'HOT',  color: '#ef4444' }, img: '/products/capcut.png'      },
  { name: 'Canva Pro',           desc: 'Design professional',        Icon: FaPaintBrush,gradFrom: '#00c4cc', gradTo: '#7d2ae8', badge: { label: 'BEST', color: '#f59e0b' }, img: '/products/canva.png'       },
  { name: 'VIU Private',         desc: 'Premium streaming',          Icon: FaTv,        gradFrom: '#1565c0', gradTo: '#0d47a1',                                             img: '/products/viu.png'         },
  { name: 'Alight Motion',       desc: 'Motion graphics editor',     Icon: FaFilm,      gradFrom: '#6366f1', gradTo: '#8b5cf6', badge: { label: 'NEW',  color: '#10b981' }, img: '/products/alightmotion.png'},
  { name: 'VPN Tunneling',       desc: 'Secure & fast connection',   Icon: FaShieldAlt, gradFrom: '#11998e', gradTo: '#38ef7d',                                             img: '/products/vpn.jpg'         },
  { name: 'Vidio Private',       desc: 'Premium streaming access',   Icon: FaPlay,      gradFrom: '#f59e0b', gradTo: '#ef4444', badge: { label: 'HOT',  color: '#ef4444' }, img: '/products/vidio.png'       },
];

function addRipple(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.2;
  const ripple = document.createElement('div');
  ripple.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,0.12);left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;pointer-events:none;transform:scale(0);`;
  el.appendChild(ripple);
  animate(ripple, {
    scale: [0, 1], opacity: [0.6, 0], duration: 600, ease: 'outExpo',
    onComplete: () => ripple.remove(),
  });
}

function addTouchRipple(e: React.TouchEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const touch = e.touches[0];
  const size = Math.max(rect.width, rect.height) * 2.2;
  const ripple = document.createElement('div');
  ripple.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,0.10);left:${touch.clientX - rect.left - size / 2}px;top:${touch.clientY - rect.top - size / 2}px;pointer-events:none;transform:scale(0);`;
  el.appendChild(ripple);
  animate(ripple, {
    scale: [0, 1], opacity: [0.5, 0], duration: 700, ease: 'outExpo',
    onComplete: () => ripple.remove(),
  });
}

/* Sub-komponen — state-driven agar fallback aman saat re-render */
function ProductIcon({ product }: { product: Product }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (product.img && !imgFailed) {
    return (
      <div
        className="prod-icon w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-md bg-white flex-shrink-0"
        style={{ boxShadow: `0 4px 16px ${product.gradFrom}50` }}
      >
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-contain p-1"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="prod-icon w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
      style={{ background: `linear-gradient(135deg, ${product.gradFrom}, ${product.gradTo})` }}
    >
      <product.Icon size={19} className="text-white" />
    </div>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const animated   = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerItems = headerRef.current?.querySelectorAll<HTMLElement>('[data-header]');
    const cards       = gridRef.current?.querySelectorAll<HTMLElement>('.prod-card');
    headerItems?.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(18px)'; });
    cards?.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(32px) scale(0.94)'; });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;

        if (headerItems?.length) {
          animate(Array.from(headerItems), {
            opacity: [0, 1], translateY: [18, 0],
            duration: 600, delay: stagger(80), ease: 'outCubic',
          });
        }

        if (cards?.length) {
          animate(Array.from(cards), {
            opacity: [0, 1], translateY: [32, 0], scale: [0.94, 1],
            duration: 580, delay: stagger(55, { start: 200 }), ease: 'outBack(1.5)',
          });
        }
      }
    }, { threshold: 0.08 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ── Badge pulse loop ── */
  useEffect(() => {
    const badges = document.querySelectorAll<HTMLElement>('.prod-badge');
    badges.forEach((badge, i) => {
      animate(badge, {
        scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85],
        duration: 1600 + i * 200, delay: i * 300, ease: 'inOutSine', loop: true,
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-14 sm:py-24 px-3 sm:px-6 relative z-10"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,8,16,0.5) 50%, transparent 100%)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 sm:mb-14">
          <div>
            <div
              data-header
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/8 text-purple-400 text-[11px] font-bold tracking-widest mb-4 uppercase"
            >
              <FaGem size={10} /> Premium Apps
            </div>
            <h2 data-header className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-1.5">
              Digital <span className="gradient-text-cyan">Products</span>
            </h2>
            <p data-header className="text-slate-400 text-xs xs:text-sm sm:text-base">
              Produk digital berkualitas tinggi dengan harga terjangkau
            </p>
          </div>

          <a
            data-header
            href="https://wa.me/r6288214672165/"
            target="_blank" rel="noreferrer"
            className="ripple-wrap inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm whitespace-nowrap self-start sm:self-auto hover:-translate-y-0.5 active:scale-95 transition-all shadow-[0_4px_18px_rgba(6,182,212,0.3)] hover:shadow-[0_6px_28px_rgba(6,182,212,0.5)]"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}
          >
            <FaWhatsapp size={15} /> Order Sekarang
          </a>
        </div>

        {/* Product grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {PRODUCTS.map((product, idx) => (
            <div
              key={idx}
              className="prod-card card-shine ripple-wrap group glass-card rounded-2xl p-3.5 xs:p-4 sm:p-5 flex items-center gap-3 xs:gap-4 border border-white/6 cursor-pointer transition-all duration-200 hover:border-white/16 hover:bg-white/5 active:scale-95"
              onClick={addRipple}
              onTouchStart={addTouchRipple}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform  = 'translateY(-5px) scale(1.01)';
                el.style.boxShadow  = '0 16px 48px rgba(99,102,241,0.22)';
                const icon = el.querySelector<HTMLElement>('.prod-icon');
                if (icon) animate(icon, { rotate: [-4, 4, 0], scale: [1, 1.15, 1.1], duration: 420, ease: 'outBack(2)' });
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = '';
                el.style.boxShadow = '';
                const icon = el.querySelector<HTMLElement>('.prod-icon');
                if (icon) animate(icon, { rotate: 0, scale: 1, duration: 350, ease: 'outCubic' });
              }}
            >
              <div className="relative flex-shrink-0">
                <ProductIcon product={product} />
                {product.badge && (
                  <span
                    className="prod-badge absolute -top-1.5 -right-1.5 text-[8px] font-black px-1.5 py-0.5 rounded-full text-white leading-none"
                    style={{ background: product.badge.color, boxShadow: `0 2px 10px ${product.badge.color}70` }}
                  >
                    {product.badge.label}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-white text-xs xs:text-sm sm:text-base leading-tight truncate group-hover:text-cyan-400 transition-colors duration-200">
                  {product.name}
                </h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500 mt-0.5">{product.desc}</p>
                <div className="flex items-center gap-0.5 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={8} className="text-yellow-400/75" />
                  ))}
                  <span className="text-[9px] text-slate-500 ml-1">5.0</span>
                </div>
              </div>

              {/* Arrow on hover (desktop) */}
              <div
                className="hidden sm:flex flex-shrink-0 w-7 h-7 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <FaWhatsapp size={12} className="text-slate-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-8 xs:mt-10 flex flex-col xs:flex-row items-center justify-center gap-3 xs:gap-6 p-4 xs:p-5 rounded-2xl border border-white/6 glass-card text-center xs:text-left">
          <div className="flex items-center gap-2 text-amber-400">
            <FaFire size={18} className="flex-shrink-0" />
            <p className="text-xs xs:text-sm sm:text-base font-semibold text-white">
              Semua produk tersedia - <span className="text-cyan-400">chat sekarang</span> untuk harga &amp; info lebih lanjut!
            </p>
          </div>
          <a
            href="https://wa.me/r6288214672165/"
            target="_blank" rel="noreferrer"
            className="ripple-wrap whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-xs xs:text-sm flex-shrink-0 transition-all hover:-translate-y-0.5 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
          >
            <FaWhatsapp size={14} /> Tanya Harga
          </a>
        </div>

      </div>
    </section>
  );
}
