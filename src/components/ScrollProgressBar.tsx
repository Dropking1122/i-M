import { useEffect, useRef } from 'react';

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const bar = barRef.current;
      if (!bar) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-[3px] pointer-events-none bg-transparent">
      <div
        ref={barRef}
        className="h-full w-0"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6 50%, #06b6d4)',
          boxShadow: '0 0 8px rgba(139,92,246,0.7)',
          transition: 'width 0.08s linear',
        }}
      />
    </div>
  );
}
