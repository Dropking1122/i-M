import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  primary?: boolean;
}

export default function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  as = 'button',
  href,
  target,
  rel,
  primary = false
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = as as any;

  return (
    <div 
      className="magnetic-btn"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <Component
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={`
            relative overflow-hidden rounded-full font-sans font-semibold tracking-wide
            flex items-center justify-center gap-2 transition-all duration-300
            ${primary 
              ? 'bg-white text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
              : 'glass-card text-white hover:bg-white/10 hover:border-white/20'
            }
            ${className}
          `}
        >
          {primary && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-150%] animate-[shine_3s_infinite]" />
          )}
          {children}
        </Component>
      </motion.div>
    </div>
  );
}
