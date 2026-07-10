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

    /* Reactbits-style palette: emerald / cyan / violet ribbons hugging the top */
    const bands = [
      { hue: 160, speed: 0.1,  amp: 0.16, freq: 1.5, offset: 0,   opacity: 0.7, base: 0.14 },
      { hue: 190, speed: 0.14, amp: 0.12, freq: 2.0, offset: 1.8, opacity: 0.6, base: 0.2  },
      { hue: 265, speed: 0.08, amp: 0.2,  freq: 1.0, offset: 3.4, opacity: 0.55, base: 0.22 },
      { hue: 300, speed: 0.12, amp: 0.14, freq: 1.7, offset: 5.1, opacity: 0.4, base: 0.16 },
    ];

    let raf: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      /* Base glow washing the top of the viewport */
      const baseGlow = ctx.createLinearGradient(0, 0, 0, height * 0.6);
      baseGlow.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
      baseGlow.addColorStop(0.5, 'rgba(59, 130, 246, 0.08)');
      baseGlow.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = baseGlow;
      ctx.fillRect(0, 0, width, height * 0.6);

      ctx.globalCompositeOperation = 'lighter';

      for (const band of bands) {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, `hsla(${band.hue}, 95%, 65%, 0)`);
        grad.addColorStop(0.35, `hsla(${band.hue}, 95%, 62%, ${band.opacity})`);
        grad.addColorStop(0.7, `hsla(${band.hue}, 95%, 55%, ${band.opacity * 0.3})`);
        grad.addColorStop(1, `hsla(${band.hue}, 95%, 50%, 0)`);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        const points = 32;
        for (let i = 0; i <= points; i++) {
          const x = (i / points) * width;
          const wave =
            Math.sin(i * band.freq * 0.4 + t * band.speed + band.offset) * band.amp +
            Math.sin(i * band.freq * 0.15 - t * band.speed * 0.6 + band.offset) * band.amp * 0.6;
          const y = height * (band.base + wave);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, 0);
        ctx.closePath();
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      t += prefersReducedMotion ? 0 : 0.018;
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
        className="w-full h-full opacity-90 mix-blend-screen"
        style={{ filter: 'blur(50px)' }}
        aria-hidden="true"
      />
    </div>
  );
}
