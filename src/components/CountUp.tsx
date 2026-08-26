import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  decimals = 0,
  suffix = '',
  prefix = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 90,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView && startWhen) {
      const timeout = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [isInView, startWhen, motionValue, direction, from, to, delay]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const options = {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        };
        const formattedNumber = Intl.NumberFormat("en-US", options).format(
          Number(latest.toFixed(decimals))
        );
        ref.current.textContent = `${prefix}${
          separator ? formattedNumber.replace(/,/g, separator) : formattedNumber
        }${suffix}`;
      }
    });
  }, [springValue, decimals, separator, prefix, suffix]);

  return <span ref={ref} className={className} />;
}
