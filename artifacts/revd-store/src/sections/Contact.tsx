import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { FaInstagram, FaWhatsapp, FaTelegram, FaPaperPlane, FaArrowRight } from 'react-icons/fa';

const CONTACTS = [
  {
    name: 'Instagram', handle: '@revd.cloud',
    Icon: FaInstagram, url: 'https://instagram.com/revd.cloud',
    color: '#e1306c', glow: 'rgba(225,48,108,0.35)',
    bg: 'rgba(225,48,108,0.1)', border: 'rgba(225,48,108,0.4)',
    desc: 'Follow untuk konten & update',
  },
  {
    name: 'WhatsApp', handle: 'REVDSTORE',
    Icon: FaWhatsapp, url: 'https://wa.me/r6288214672165/',
    color: '#25d366', glow: 'rgba(37,211,102,0.35)',
    bg: 'rgba(37,211,102,0.1)', border: 'rgba(37,211,102,0.4)',
    desc: 'Chat langsung & order produk',
  },
  {
    name: 'Telegram', handle: '@ValltzID',
    Icon: FaTelegram, url: 'https://t.me/ValltzID',
    color: '#0088cc', glow: 'rgba(0,136,204,0.35)',
    bg: 'rgba(0,136,204,0.1)', border: 'rgba(0,136,204,0.4)',
    desc: 'Join channel & diskusi teknis',
  },
];

function addRipple(e: React.MouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const ripple = document.createElement('div');
  ripple.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,0.08);left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;pointer-events:none;transform:scale(0);`;
  el.appendChild(ripple);
  animate(ripple, {
    scale: [0, 1],
    opacity: [0.5, 0],
    duration: 700,
    ease: 'outExpo',
    onComplete: () => ripple.remove(),
  });
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerItems = headerRef.current?.querySelectorAll<HTMLElement>('[data-header]');
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.contact-card');
    headerItems?.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(18px)'; });
    cards?.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = `translateY(50px) rotateX(${5}deg) scale(0.94)`;
    });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;

        if (headerItems?.length) {
          animate(Array.from(headerItems), {
            opacity: [0, 1],
            translateY: [18, 0],
            duration: 600,
            delay: stagger(80),
            ease: 'outCubic',
          });
        }

        if (cards?.length) {
          animate(Array.from(cards), {
            opacity: [0, 1],
            translateY: [50, 0],
            rotateX: [5, 0],
            scale: [0.94, 1],
            duration: 750,
            delay: stagger(110, { start: 300 }),
            ease: 'outElastic(1, 0.7)',
          });
        }
      }
    }, { threshold: 0.15 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleCardEnter = (el: HTMLElement, contact: (typeof CONTACTS)[0]) => {
    el.style.transition = 'transform 0.12s ease, box-shadow 0.2s ease';
    el.style.transform = 'translateY(-6px) scale(1.02)';
    el.style.boxShadow = `0 16px 50px ${contact.glow}`;

    const iconWrap = el.querySelector<HTMLElement>('.contact-icon-wrap');
    if (iconWrap) {
      animate(iconWrap, {
        scale: [1, 1.18],
        rotate: [0, -10],
        duration: 350,
        ease: 'outBack(2.5)',
      });
    }

    const arrow = el.querySelector<HTMLElement>('.contact-arrow');
    if (arrow) {
      animate(arrow, {
        translateX: [0, 5],
        opacity: [0, 1],
        duration: 250,
        ease: 'outCubic',
      });
    }
  };

  const handleCardLeave = (el: HTMLElement) => {
    el.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease';
    el.style.transform = '';
    el.style.boxShadow = '';

    const iconWrap = el.querySelector<HTMLElement>('.contact-icon-wrap');
    if (iconWrap) {
      animate(iconWrap, {
        scale: 1,
        rotate: 0,
        duration: 400,
        ease: 'outElastic(1, 0.6)',
      });
    }

    const arrow = el.querySelector<HTMLElement>('.contact-arrow');
    if (arrow) {
      animate(arrow, {
        translateX: 0,
        opacity: 0,
        duration: 200,
        ease: 'outCubic',
      });
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-14 sm:py-24 px-3 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">

        {/* Header */}
        <div ref={headerRef}>
          <div
            data-header
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/8 text-green-400 text-[11px] font-bold tracking-widest mb-5 uppercase"
          >
            <FaPaperPlane size={10} /> Get in Touch
          </div>
          <h2 data-header className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <p data-header className="text-slate-400 text-xs xs:text-sm sm:text-base mb-10 sm:mb-14 max-w-md mx-auto">
            Ada pertanyaan? Jangan ragu untuk menghubungi saya melalui platform di bawah ini.
          </p>
        </div>

        {/* Contact cards */}
        <div ref={cardsRef} className="grid grid-cols-1 xs:grid-cols-3 gap-4 xs:gap-3 sm:gap-5">
          {CONTACTS.map((contact, idx) => (
            <a
              key={idx}
              href={contact.url}
              target="_blank"
              rel="noreferrer"
              className="contact-card ripple-wrap glass-card rounded-2xl border border-white/6 p-5 xs:p-4 sm:p-7 flex xs:flex-col items-center xs:items-center gap-4 xs:gap-3 sm:gap-4 text-left xs:text-center"
              style={{ perspective: '600px', overflow: 'hidden' }}
              onMouseEnter={(e) => handleCardEnter(e.currentTarget as HTMLElement, contact)}
              onMouseLeave={(e) => handleCardLeave(e.currentTarget as HTMLElement)}
              onClick={addRipple}
            >
              <div
                className="contact-icon-wrap w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: contact.bg, border: `1px solid ${contact.border}` }}
              >
                <contact.Icon size={24} style={{ color: contact.color }} />
              </div>
              <div className="min-w-0 flex-1 xs:flex-none">
                <p className="text-[9px] xs:text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-0.5">{contact.name}</p>
                <p className="font-bold text-white text-sm xs:text-base sm:text-lg truncate">{contact.handle}</p>
                <p className="text-[10px] xs:text-[11px] text-slate-500 mt-1 leading-snug hidden xs:block">{contact.desc}</p>
              </div>
              {/* Arrow indicator */}
              <FaArrowRight
                size={12}
                className="contact-arrow ml-auto xs:hidden text-slate-400 flex-shrink-0"
                style={{ opacity: 0 }}
              />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
