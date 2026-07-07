import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface Props {
  color?: string;
  color2?: string;
}

export default function GlowDivider({
  color  = 'rgba(59,130,246,0.45)',
  color2 = 'rgba(139,92,246,0.45)',
}: Props) {
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;

        /* Line sweeps in from center */
        animate(el, {
          scaleX: [0, 1],
          opacity: [0, 1],
          duration: 900,
          ease: 'outCubic',
        });

        /* Center dot pulses */
        if (dotRef.current) {
          animate(dotRef.current, {
            scale: [0, 1.4, 1],
            opacity: [0, 1],
            duration: 600,
            delay: 300,
            ease: 'outBack(2)',
          });
        }
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex items-center justify-center py-1 px-6 sm:px-12 max-w-5xl mx-auto">
      <div
        ref={lineRef}
        className="w-full h-px opacity-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, ${color2}, transparent)`,
          transformOrigin: 'center',
          boxShadow: `0 0 12px ${color}`,
        }}
      />
      <span
        ref={dotRef}
        className="absolute w-1.5 h-1.5 rounded-full opacity-0"
        style={{ background: color2, boxShadow: `0 0 10px ${color2}` }}
      />
    </div>
  );
}
