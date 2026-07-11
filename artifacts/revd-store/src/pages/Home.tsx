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
import ClickSpark from '@/components/ClickSpark';

// Premium Background Composition
function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Aurora />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/30 via-[#050810]/70 to-[#050810] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
    </div>
  );
}

function SectionDivider({ lineClass, glowHex }: { lineClass: string, glowHex: string }) {
  return (
    <div className="w-full flex items-center justify-center py-8 sm:py-16 relative z-10 opacity-70">
      <div className={`h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent ${lineClass} to-transparent relative flex justify-center items-center`}>
        <div className="absolute w-32 h-px bg-white/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-white" style={{ boxShadow: `0 0 10px 2px ${glowHex}, 0 0 20px ${glowHex}` }} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] bg-[#050810] text-slate-200 selection:bg-cyan-400 selection:text-black">
      <ScrollProgressBar />
      <TargetCursor />
      <ClickSpark sparkColor="#00F0FF" sparkRadius={40} sparkCount={10} />
      <CinematicBackground />

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow w-full overflow-hidden">
          <Hero />
          
          <SectionDivider lineClass="via-cyan-500/40" glowHex="#00F0FF" />
          
          <Projects />
          
          <SectionDivider lineClass="via-purple-500/40" glowHex="#8A2BE2" />
          
          <Products />
          
          <SectionDivider lineClass="via-blue-500/40" glowHex="#0047FF" />
          
          <Contact />
        </main>
        <Footer />
      </div>

      <BackToTop />
    </div>
  );
}
