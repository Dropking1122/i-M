import { useEffect, useRef } from 'react';

/**
 * Aurora — reactbits-style animated aurora borealis background.
 * Canvas-based flowing gradient bands (lightweight, no extra deps).
 */
export default function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const bands = [
      { hue: 190, speed: 0.12, amp: 0.14, freq: 1.6, offset: 0, opacity: 0.55 },
      { hue: 265, speed: 0.09, amp: 0.18, freq: 1.1, offset: 2.1, opacity: 0.45 },
      { hue: 300, speed: 0.15, amp: 0.1, freq: 2.2, offset: 4.3, opacity: 0.35 },
      { hue: 170, speed: 0.07, amp: 0.2, freq: 0.8, offset: 1.4, opacity: 0.4 },
    ];

    let raf: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (const band of bands) {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, `hsla(${band.hue}, 90%, 65%, 0)`);
        grad.addColorStop(0.45, `hsla(${band.hue}, 90%, 60%, ${band.opacity})`);
        grad.addColorStop(1, `hsla(${band.hue}, 90%, 50%, 0)`);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, height);
        const points = 24;
        for (let i = 0; i <= points; i++) {
          const x = (i / points) * width;
          const wave =
            Math.sin(i * band.freq * 0.4 + t * band.speed + band.offset) * band.amp +
            Math.sin(i * band.freq * 0.15 - t * band.speed * 0.6 + band.offset) * band.amp * 0.6;
          const y = height * (0.28 + wave);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      t += prefersReducedMotion ? 0 : 0.02;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-70 mix-blend-screen"
        style={{ filter: 'blur(40px)' }}
        aria-hidden="true"
      />
    </div>
  );
}
