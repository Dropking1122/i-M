import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** ms of stagger between each word */
  staggerDelay?: number;
}

/**
 * BlurText — reactbits-style reveal where each word animates in from a
 * blurred, slightly-shifted state to fully sharp and in place.
 * https://reactbits.dev/text-animations/blur-text
 */
export default function BlurText({ text, className = '', delay = 0, staggerDelay = 60 }: BlurTextProps) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
            delay: (delay + i * staggerDelay) / 1000,
          }}
          className="inline-block will-change-[filter,transform]"
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}
