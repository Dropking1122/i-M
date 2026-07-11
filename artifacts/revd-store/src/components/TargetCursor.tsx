import { useEffect, useRef } from 'react';

const TARGET_SELECTOR = 'a, button, [role="button"], input, textarea, select, .cursor-target';
const CORNER_SIZE = 14;
const CORNER_GAP = 6;

/**
 * TargetCursor — reactbits-style custom cursor.
 * Four corner brackets that snap around interactive elements on hover,
 * and follow the pointer as a small crosshair otherwise.
 */
export default function TargetCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const trRef = useRef<HTMLDivElement>(null);
  const blRef = useRef<HTMLDivElement>(null);
  const brRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on fine-pointer devices at the same breakpoint the visual cursor renders at (md+),
    // so we never hide the native cursor without providing the custom one in its place.
    const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isMdUp = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktopPointer || !isMdUp) return;

    document.body.classList.add('target-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let rafId: number;
    let hasMoved = false;

    let activeEl: HTMLElement | null = null;

    const setCorners = (x: number, y: number, w: number, h: number, snapped: boolean) => {
      const dur = snapped ? '0.25s' : '0s';
      const pad = snapped ? 0 : CORNER_GAP;
      const applyStyle = (el: HTMLDivElement | null, cx: number, cy: number) => {
        if (!el) return;
        el.style.transition = `transform ${dur} cubic-bezier(0.22, 1, 0.36, 1)`;
        el.style.transform = `translate(${cx}px, ${cy}px)`;
      };
      applyStyle(tlRef.current, x - pad, y - pad);
      applyStyle(trRef.current, x + w + pad - CORNER_SIZE, y - pad);
      applyStyle(blRef.current, x - pad, y + h + pad - CORNER_SIZE);
      applyStyle(brRef.current, x + w + pad - CORNER_SIZE, y + h + pad - CORNER_SIZE);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        if (rootRef.current) rootRef.current.style.opacity = '1';
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(TARGET_SELECTOR);
      if (target) {
        activeEl = target;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      const stillInside = related?.closest?.(TARGET_SELECTOR);
      if (!stillInside) activeEl = null;
    };

    const tick = () => {
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 2}px, ${dotY - 2}px)`;
        dotRef.current.style.opacity = activeEl ? '0' : '1';
      }

      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        setCorners(rect.left, rect.top, rect.width, rect.height, true);
      } else {
        const half = CORNER_SIZE + CORNER_GAP;
        setCorners(mouseX - half, mouseY - half, half * 2 - CORNER_SIZE, half * 2 - CORNER_SIZE, false);
      }

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('target-cursor-active');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] pointer-events-none hidden md:block opacity-0 transition-opacity duration-500" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-cyan-300"
        style={{ boxShadow: '0 0 8px rgba(34,211,238,0.9)', willChange: 'transform' }}
      />
      {[tlRef, trRef, blRef, brRef].map((ref, i) => (
        <div
          key={i}
          ref={ref}
          className="fixed top-0 left-0"
          style={{ width: CORNER_SIZE, height: CORNER_SIZE, willChange: 'transform' }}
        >
          <div
            className="w-full h-full border-cyan-300"
            style={{
              borderTopWidth: i < 2 ? 2 : 0,
              borderBottomWidth: i >= 2 ? 2 : 0,
              borderLeftWidth: i % 2 === 0 ? 2 : 0,
              borderRightWidth: i % 2 === 1 ? 2 : 0,
              borderStyle: 'solid',
              filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.7))',
            }}
          />
        </div>
      ))}
    </div>
  );
}
