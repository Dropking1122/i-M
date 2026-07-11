import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface RotatingTextProps {
  words: string[];
  className?: string;
  /** ms each word stays visible before rotating to the next */
  interval?: number;
}

/**
 * RotatingText — reactbits-style word rotator: each word slides/blurs in
 * from below and out to above on a timer.
 * https://reactbits.dev/text-animations/rotating-text
 */
export default function RotatingText({ words, className = '', interval = 2200 }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className="relative inline-flex rounded-lg px-3.5 py-1 sm:px-4 sm:py-1.5 bg-cyan-400/10 border border-cyan-400/30 shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)] overflow-hidden align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${className}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
