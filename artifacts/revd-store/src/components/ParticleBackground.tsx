import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── Floating dots ── */
    const colors = [
      'rgba(59,130,246,',    // bluee
      'rgba(139,92,246,',    // purple
      'rgba(6,182,212,',     // cyan
      'rgba(16,185,129,',    // green
      'rgba(245,158,11,',    // amber (accent)
    ];

    const dots: HTMLDivElement[] = [];
    const count = Math.min(60, Math.floor(window.innerWidth / 18));

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      const size = Math.random() * 3.5 + 0.8;
      const alpha = (Math.random() * 0.3 + 0.06).toFixed(2);
      const color = colors[i % colors.length];
      const riseY = -(Math.random() * 200 + 80);
      const driftX = (Math.random() - 0.5) * 100;
      const duration = Math.random() * 6000 + 5000;
      const delay = Math.random() * 8000;

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

    /* ── Shooting stars ── */
    const shootingStars: HTMLDivElement[] = [];

    function launchStar() {
      const star = document.createElement('div');
      const startX = Math.random() * 80; // % from left
      const startY = Math.random() * 50; // % from top
      const length = 60 + Math.random() * 80;

      star.style.cssText = [
        'position:absolute',
        `width:${length}px`,
        'height:1.5px',
        'border-radius:4px',
        'background:linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)',
        `left:${startX}%`,
        `top:${startY}%`,
        'transform:rotate(-35deg)',
        'opacity:0',
        'pointer-events:none',
        'will-change:transform,opacity',
      ].join(';');

      container.appendChild(star);
      shootingStars.push(star);

      animate(star, {
        translateX: [0, 160 + Math.random() * 60],
        translateY: [0, 90 + Math.random() * 40],
        opacity: [0, 0.9, 0],
        duration: 800 + Math.random() * 400,
        ease: 'inQuad',
        onComplete: () => {
          star.remove();
          const si = shootingStars.indexOf(star);
          if (si > -1) shootingStars.splice(si, 1);
        },
      });
    }

    // Occasional shooting stars — random interval 3s–9s
    let starTimeout: ReturnType<typeof setTimeout>;
    function scheduleNext() {
      const delay = 3000 + Math.random() * 6000;
      starTimeout = setTimeout(() => {
        launchStar();
        scheduleNext();
      }, delay);
    }
    scheduleNext();

    /* ── Cleanup ── */
    return () => {
      clearTimeout(starTimeout);
      dots.forEach((d) => { utils.remove(d); d.remove(); });
      shootingStars.forEach((s) => { utils.remove(s); s.remove(); });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    />
  );
}
