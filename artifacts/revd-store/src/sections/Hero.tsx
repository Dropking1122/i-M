import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaInstagram, FaWhatsapp, FaTelegram, FaGithub,
  FaEnvelope, FaArrowRight, FaCheckCircle, FaStar
} from 'react-icons/fa';
import MagneticButton from '@/components/MagneticButton';
import BlurText from '@/components/BlurText';
import RotatingText from '@/components/RotatingText';
import TiltedCard from '@/components/TiltedCard';
import CountUp from '@/components/CountUp';
import StarBorder from '@/components/StarBorder';

const SOCIALS = [
  { Icon: FaInstagram, href: 'https://instagram.com/revd.cloud',    label: 'Instagram' },
  { Icon: FaWhatsapp,  href: 'https://wa.me/6288214672165',        label: 'WhatsApp' },
  { Icon: FaTelegram,  href: 'https://t.me/ValltzID',               label: 'Telegram' },
  { Icon: FaGithub,    href: 'https://github.com/Dropking1122',     label: 'GitHub' },
  { Icon: FaEnvelope,  href: 'mailto:me@revdstore.web.id',          label: 'Email' },
];

const STATS = [
  { label: 'Projects',  target: 10, suffix: '+'  },
  { label: 'Years Exp', target: 3,  suffix: '+'  },
  { label: 'Clients',   target: 200, suffix: '+' },
];

const TITLES = ['Digital Seller', 'Networking', 'Tech Enthusiast', 'Problem Solver', 'Creative Mind'];

const AVATAR_PHOTO = '/avatar.jpg';

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="home" className="min-h-[100svh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 relative z-10 overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10"
        >
          <TiltedCard className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 cursor-pointer shadow-[0_0_40px_rgba(0,240,255,0.2)]">
            <div className="w-full h-full rounded-full bg-[#050810] flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
              {!imgFailed ? (
                <img
                  src={AVATAR_PHOTO}
                  alt="Revaldi"
                  className="w-full h-full object-cover relative z-0"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <span className="text-4xl sm:text-6xl font-black gradient-text-primary tracking-tighter relative z-0">RV</span>
              )}
            </div>
          </TiltedCard>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2"
          >
            <StarBorder color="#00F0FF" speed="4s" className="rounded-full shadow-2xl">
              <div className="bg-[#0A0F1E]/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center justify-center gap-2.5 whitespace-nowrap">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0 shadow-[0_0_8px_#00F0FF]" />
                <span className="text-[10px] sm:text-xs font-bold text-slate-200 uppercase tracking-wider leading-none mt-0.5">Available</span>
              </div>
            </StarBorder>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-4"
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[1.05] mb-6"
        >
          <span className="hero-name-shine inline-block pb-2">Revaldi</span>
          <FaCheckCircle
            className="inline-block ml-3 sm:ml-4 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] align-middle"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}
          />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="text-sm sm:text-lg font-medium text-slate-300">I am a</span>
          <RotatingText words={TITLES} className="text-sm sm:text-lg font-bold text-cyan-400 ml-1" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          <BlurText
            text="Digital entrepreneur & tech enthusiast. Menyediakan produk digital premium dan solusi web inovatif. Mari terhubung!"
            delay={600}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16"
        >
          <MagneticButton as="a" href="#products" primary className="px-8 py-4 sm:px-10 sm:py-5 text-sm sm:text-base font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            View Products <FaArrowRight size={14} className="ml-2" />
          </MagneticButton>

          <MagneticButton as="a" href="https://wa.me/6288214672165" target="_blank" className="px-8 py-4 sm:px-10 sm:py-5 text-sm sm:text-base font-bold bg-white/5 border border-white/10 hover:bg-white/10">
            <FaWhatsapp size={18} className="text-green-400 mr-2" /> Contact Me
          </MagneticButton>

          <MagneticButton
            as="a"
            href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDU1MzQxNzM3MTcwMzAy?story_media_id=3710789107510843237_68244878136&igsh=MTg4YndhZzAyZjF0bg=="
            target="_blank"
            className="px-6 py-4 sm:px-8 sm:py-5 text-sm sm:text-base font-bold bg-white/5 border border-white/10 hover:bg-white/10"
          >
            <FaStar size={16} className="text-pink-400 mr-2" /> Lihat Testimoni
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-full max-w-4xl mx-auto grid grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 pointer-events-none" />
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 sm:p-10 bg-[#0A0F1E]/80 hover:bg-[#0A0F1E]/60 transition-colors relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white mb-2 sm:mb-3 tracking-tighter drop-shadow-md">
                <CountUp to={stat.target as number} suffix={stat.suffix} delay={0.8 + i * 0.2} />
              </span>
              <span className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.25em]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Socials - Fixed floating on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-50"
        >
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:scale-110 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 group relative"
              aria-label={label}
            >
              <Icon size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              <span className="absolute left-full ml-4 px-2 py-1 bg-white/10 backdrop-blur-md rounded text-xs font-bold text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
                {label}
              </span>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-cyan-400/50 to-transparent rounded-full" />
        </motion.div>

      </div>
    </section>
  );
}

