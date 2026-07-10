import React from 'react';
import { motion } from 'framer-motion';
import {
  FaInstagram, FaWhatsapp, FaTelegram, FaGithub,
  FaEnvelope, FaArrowRight
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

export default function Hero() {
  return (
    <section id="home" className="min-h-[100svh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 relative z-10">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
            <div className="w-full h-full rounded-full bg-[#050810] flex items-center justify-center overflow-hidden">
              <span className="text-3xl sm:text-4xl font-black gradient-text-primary tracking-tighter">RV</span>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-2 -right-4 bg-[#0A0F1E] border border-white/10 px-3 py-1 rounded-full flex items-center gap-2 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold text-slate-300">Available</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
        >
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-cyan-400">
            Digital Creator
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-6"
        >
          <span className="text-white">I build </span>
          <span className="shiny-text inline-block">digital</span>
          <br />
          <span className="gradient-text-primary">experiences.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          <DecryptedText 
            text="Premium digital solutions, software development, and specialized tech services tailored for modern creators."
            delay={800}
            speed={30}
          />
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <MagneticButton as="a" href="#products" primary className="px-8 py-4 text-sm sm:text-base">
            Explore Products <FaArrowRight size={12} />
          </MagneticButton>
          
          <MagneticButton as="a" href="https://wa.me/revdstore/" target="_blank" className="px-8 py-4 text-sm sm:text-base">
            <FaWhatsapp size={16} className="text-green-400" /> Let's Chat
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
