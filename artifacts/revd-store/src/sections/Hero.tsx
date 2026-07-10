import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaInstagram, FaWhatsapp, FaTelegram, FaGithub,
  FaEnvelope, FaArrowRight, FaCheckCircle, FaStar
} from 'react-icons/fa';
import MagneticButton from '@/components/MagneticButton';
import DecryptedText from '@/components/DecryptedText';

const SOCIALS = [
  { Icon: FaInstagram, href: 'https://instagram.com/revd.cloud',    label: 'Instagram' },
  { Icon: FaWhatsapp,  href: 'https://wa.me/revdstore/',            label: 'WhatsApp' },
  { Icon: FaTelegram,  href: 'https://t.me/ValltzID',               label: 'Telegram' },
  { Icon: FaGithub,    href: 'https://github.com/Dropking1122',     label: 'GitHub' },
  { Icon: FaEnvelope,  href: 'mailto:me@revdstore.web.id',          label: 'Email' },
];

const STATS = [
  { label: 'Projects',  target: '10+'  },
  { label: 'Years Exp', target: '3+'   },
  { label: 'Clients',   target: '200+' },
];

const TITLES = ['Digital Seller', 'Networking', 'Tech Enthusiast', 'Problem Solver', 'Creative Mind'];

const AVATAR_PHOTO = '/avatar.jpg';

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [titleText, setTitleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

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

  return (
    <section id="home" className="min-h-[100svh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 relative z-10">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
            <div className="w-full h-full rounded-full bg-[#050810] flex items-center justify-center overflow-hidden">
              {!imgFailed ? (
                <img
                  src={AVATAR_PHOTO}
                  alt="Revaldi"
                  className="w-full h-full object-cover"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <span className="text-3xl sm:text-4xl font-black gradient-text-primary tracking-tighter">RV</span>
              )}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#0A0F1E] border border-white/10 px-3 py-1.5 rounded-full flex items-center justify-center gap-2 shadow-xl whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 leading-none">Available</span>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-500 text-xs sm:text-sm font-bold tracking-[0.22em] uppercase mb-3"
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-4"
        >
          <span className="shiny-text inline-block gradient-text-primary">Revaldi</span>
          <FaCheckCircle
            className="inline-block ml-2 sm:ml-3 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] align-middle"
            style={{ fontSize: 'clamp(1.2rem, 3vw, 2.6rem)' }}
          />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-1 h-8 sm:h-10 mb-6"
        >
          <span className="text-base sm:text-xl font-medium text-slate-300">I am a&nbsp;</span>
          <span className="text-base sm:text-xl font-bold text-cyan-400">{titleText}</span>
          <span className="inline-block w-0.5 h-4 sm:h-5 bg-cyan-400 animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          <DecryptedText
            text="Digital entrepreneur & tech enthusiast. Menyediakan produk digital premium dan solusi web inovatif. Mari terhubung!"
            delay={800}
            speed={30}
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <MagneticButton as="a" href="#products" primary className="px-8 py-4 text-sm sm:text-base">
            View Products <FaArrowRight size={12} />
          </MagneticButton>

          <MagneticButton as="a" href="https://wa.me/revdstore/" target="_blank" className="px-8 py-4 text-sm sm:text-base">
            <FaWhatsapp size={16} className="text-green-400" /> Contact Me
          </MagneticButton>

          <MagneticButton
            as="a"
            href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDU1MzQxNzM3MTcwMzAy?story_media_id=3710789107510843237_68244878136&igsh=MTg4YndhZzAyZjF0bg=="
            target="_blank"
            className="px-6 py-4 text-sm sm:text-base"
          >
            <FaStar size={14} className="text-pink-400" /> Lihat Testimoni
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center gap-8 sm:gap-16 pt-8 border-t border-white/5 w-full max-w-3xl mx-auto"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-display font-black text-white mb-1">
                {stat.target}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Socials - Fixed floating on desktop, bottom on mobile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-50"
        >
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:scale-110 hover:border-cyan-400/50 transition-all duration-300"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
