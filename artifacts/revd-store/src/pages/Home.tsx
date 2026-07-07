import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import Projects from '@/sections/Projects';
import Products from '@/sections/Products';
import Contact from '@/sections/Contact';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import BackToTop from '@/components/BackToTop';
import ParticleBackground from '@/components/ParticleBackground';
import NetworkParticles from '@/components/NetworkParticles';
import GlowDivider from '@/components/GlowDivider';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CursorGlow from '@/components/CursorGlow';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0e1a] overflow-x-hidden text-slate-200">

      {/* Scroll progress */}
      <ScrollProgressBar />

      {/* Cursor glow (desktop only) */}
      <CursorGlow />

      {/* Network particles — canvas layer */}
      <NetworkParticles />

      {/* Floating dots + shooting stars */}
      <ParticleBackground />

      {/* Slow-drifting ambient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.18, 1], x: [0, 40, 0], y: [0, -60, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[25%] -left-[15%] w-[55%] h-[55%] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], x: [0, -50, 0], y: [0, 70, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-[35%] -right-[12%] w-[45%] h-[45%] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], x: [0, 25, 0], y: [0, 40, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -bottom-[20%] left-[15%] w-[50%] h-[50%] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)' }}
        />
        {/* Aurora band */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute top-[60%] left-[5%] w-[90%] h-[1px] blur-[40px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.15), rgba(139,92,246,0.2), transparent)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Hero />

          <GlowDivider
            color="rgba(59,130,246,0.5)"
            color2="rgba(139,92,246,0.5)"
          />

          <Projects />

          <GlowDivider
            color="rgba(6,182,212,0.5)"
            color2="rgba(59,130,246,0.5)"
          />

          <Products />

          <GlowDivider
            color="rgba(139,92,246,0.5)"
            color2="rgba(16,185,129,0.5)"
          />

          <Contact />
        </main>
        <Footer />
      </div>

      <BottomNav />
      <BackToTop />
    </div>
  );
}
