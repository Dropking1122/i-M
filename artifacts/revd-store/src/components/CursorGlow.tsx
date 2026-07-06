import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only for pointer-accurate devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      // Slow lerp for glow blob
      glowX += (mouseX - glowX) * 0.07;
      glowY += (mouseY - glowY) * 0.07;
      // Faster lerp for small dot
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX - 180}px, ${glowY - 180}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Large soft glow blob */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-0 pointer-events-none w-[360px] h-[360px] rounded-full hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      {/* Small crisp dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[55] pointer-events-none w-2 h-2 rounded-full hidden md:block mix-blend-screen"
        style={{
          background: 'rgba(139,92,246,0.8)',
          boxShadow: '0 0 6px rgba(139,92,246,0.9)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
