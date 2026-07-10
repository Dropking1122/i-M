import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import Projects from '@/sections/Projects';
import Products from '@/sections/Products';
import Contact from '@/sections/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import TargetCursor from '@/components/TargetCursor';
import Aurora from '@/components/Aurora';

// Premium Background Composition
function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Aurora />
      <div className="animated-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050810]/50 to-[#050810] pointer-events-none" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] bg-[#050810] text-slate-200 selection:bg-cyan-400 selection:text-black">
      <div className="noise-overlay" />
      <ScrollProgressBar />
      <TargetCursor />
      <CinematicBackground />

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow w-full overflow-hidden">
          <Hero />
          
          <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent my-10" />
          
          <Projects />
          
          <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-purple-500/20 to-transparent my-10" />
          
          <Products />
          
          <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-blue-500/20 to-transparent my-10" />
          
          <Contact />
        </main>
        <Footer />
      </div>

      <BackToTop />
    </div>
  );
}
