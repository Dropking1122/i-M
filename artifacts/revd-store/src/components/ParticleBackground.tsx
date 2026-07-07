import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = [
      'rgba(59,130,246,',
      'rgba(139,92,246,',
      'rgba(6,182,212,',
      'rgba(16,185,129,',
    ];

    /* Reduced to 20 dots - much lighter */
    const dots: HTMLDivElement[] = [];
    const count = Math.min(20, Math.floor(window.innerWidth / 50));

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      const size  = Math.random() * 2.5 + 0.8;
      const alpha = (Math.random() * 0.25 + 0.05).toFixed(2);
      const color = colors[i % colors.length];
      const riseY = -(Math.random() * 180 + 60);
      const driftX = (Math.random() - 0.5) * 80;
      const duration = Math.random() * 7000 + 6000;
      const delay   = Math.random() * 8000;

      dot.style.cssText = [
        'position:absolute',
        `width:${size}px`,
        `height:${size}px`,
        'border-radius:50%',
        `background:${color}${alpha})`,
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        'will-change:transform,opacity',
        'opacity:0',
      ].join(';');

      container.appendChild(dot);
      dots.push(dot);

      animate(dot, {
        translateY: ['0px', `${riseY}px`],
        translateX: ['0px', `${driftX}px`],
        opacity: [{ to: parseFloat(alpha), duration: 400 }, { to: 0, duration: duration - 400 }],
        duration,
        delay,
        ease: 'linear',
        loop: true,
      });
    }

    return () => {
      dots.forEach((d) => { utils.remove(d); d.remove(); });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    />
  );
}
