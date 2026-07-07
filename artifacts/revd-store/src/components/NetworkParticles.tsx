import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

interface NodePos { x: number; y: number }

const COLORS = [
  'rgba(59,130,246',   // blue
  'rgba(139,92,246',   // purple
  'rgba(6,182,212',    // cyan
  'rgba(16,185,129',   // green
  'rgba(245,158,11',   // amber
];

export default function NetworkParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    /* ── Build nodes ── */
    const COUNT   = Math.min(55, Math.floor(W / 28));
    const targets: NodePos[] = [];
    const colors:  string[]  = [];
    const sizes:   number[]  = [];

    for (let i = 0; i < COUNT; i++) {
      const sx = Math.random() * W;
      const sy = Math.random() * H;
      targets.push({ x: sx, y: sy });
      colors.push(COLORS[i % COLORS.length]);
      sizes.push(Math.random() * 2.2 + 1.2);
    }

    /* ── Anime.js: each node wanders randomly in a loop ── */
    targets.forEach((t) => {
      const dur = 10000 + Math.random() * 12000;
      animate(t, {
        x: [
          t.x,
          Math.random() * W,
          Math.random() * W,
          Math.random() * W,
          t.x,
        ],
        y: [
          t.y,
          Math.random() * H,
          Math.random() * H,
          Math.random() * H,
          t.y,
        ],
        duration: dur,
        ease: 'inOutSine',
        loop: true,
      });
    });

    /* ── Draw loop ── */
    const THRESHOLD = Math.min(W, H) * 0.19;
    let rafId: number;

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      /* Lines */
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx   = targets[i].x - targets[j].x;
          const dy   = targets[i].y - targets[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= THRESHOLD) continue;

          const alpha = (1 - dist / THRESHOLD) * 0.22;
          const grad  = ctx!.createLinearGradient(
            targets[i].x, targets[i].y,
            targets[j].x, targets[j].y,
          );
          grad.addColorStop(0, `${colors[i]},${alpha})`);
          grad.addColorStop(1, `${colors[j]},${alpha})`);
          ctx!.beginPath();
          ctx!.strokeStyle = grad;
          ctx!.lineWidth   = 0.7;
          ctx!.moveTo(targets[i].x, targets[i].y);
          ctx!.lineTo(targets[j].x, targets[j].y);
          ctx!.stroke();
        }
      }

      /* Nodes */
      for (let i = 0; i < COUNT; i++) {
        const { x, y } = targets[i];
        const r = sizes[i];

        /* Outer glow */
        ctx!.beginPath();
        ctx!.arc(x, y, r * 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = `${colors[i]},0.07)`;
        ctx!.fill();

        /* Core dot */
        ctx!.beginPath();
        ctx!.arc(x, y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `${colors[i]},0.75)`;
        ctx!.shadowBlur  = 8;
        ctx!.shadowColor = `${colors[i]},0.5)`;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      targets.forEach((t) => utils.remove(t));
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
    />
  );
}
