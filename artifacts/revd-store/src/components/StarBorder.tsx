import React from 'react';

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  color?: string;
  speed?: string;
}

export default function StarBorder({
  as: Component = 'div',
  className = '',
  children,
  color = 'cyan',
  speed = '6s',
  ...rest
}: StarBorderProps) {
  return (
    <Component className={`relative inline-block overflow-hidden p-[1px] ${className}`} {...rest}>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-10 w-full h-full bg-transparent">
        {children}
      </div>
    </Component>
  );
}
