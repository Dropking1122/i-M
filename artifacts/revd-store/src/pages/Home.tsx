import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import Projects from '@/sections/Projects';
import Products from '@/sections/Products';
import Contact from '@/sections/Contact';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import BackToTop from '@/components/BackToTop';
import MeshBackground from '@/components/MeshBackground';
import ParticleBackground from '@/components/ParticleBackground';
import GlowDivider from '@/components/GlowDivider';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CursorGlow from '@/components/CursorGlow';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0e1a] overflow-x-hidden text-slate-200">

      <ScrollProgressBar />
      <CursorGlow />

      {/* CSS-only animated mesh - zero JS, GPU-composited */}
      <MeshBackground />

      {/* Lightweight floating dots (20 max, no shooting stars) */}
      <ParticleBackground />

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
