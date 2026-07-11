import React, { useRef, useEffect } from "react";

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

export default function ClickSpark({
  sparkColor = "#fff",
  sparkSize = 6,
  sparkRadius = 35,
  sparkCount = 8,
  duration = 600,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationId: number;
    const draw = (timestamp: number) => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparksRef.current = sparksRef.current.filter((spark) => {
          const elapsed = timestamp - spark.startTime;
          if (elapsed >= duration) return false;

          const progress = elapsed / duration;
          const ease = 1 - Math.pow(1 - progress, 3);
          const currentRadius = ease * sparkRadius;
          
          const x = spark.x + Math.cos(spark.angle) * currentRadius;
          const y = spark.y + Math.sin(spark.angle) * currentRadius;
          
          const size = sparkSize * (1 - progress);
          
          ctx.save();
          ctx.globalAlpha = 1 - progress;
          ctx.translate(x, y);
          ctx.rotate(spark.angle);
          ctx.fillStyle = sparkColor;
          ctx.beginPath();
          ctx.roundRect(-size / 2, -size / 2, size, size, 2);
          ctx.fill();
          ctx.restore();

          return true;
        });
      }
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [duration, sparkRadius, sparkSize, sparkColor, sparkCount]);

  useEffect(() => {
    const triggerSpark = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number }>;
      const { x, y } = customEvent.detail;
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x,
          y,
          angle: (Math.PI * 2 * i) / sparkCount + (Math.random() * 0.2 - 0.1),
          startTime: now,
        });
      }
    };
    document.addEventListener("trigger-spark", triggerSpark);
    return () => document.removeEventListener("trigger-spark", triggerSpark);
  }, [sparkCount]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
