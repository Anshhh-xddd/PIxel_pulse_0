import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const animateCursor = () => {
      // Smooth interpolation for main cursor
      cursorPosRef.current.x += (mouseRef.current.x - cursorPosRef.current.x) * 0.1;
      cursorPosRef.current.y += (mouseRef.current.y - cursorPosRef.current.y) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.left = cursorPosRef.current.x + 'px';
        cursorRef.current.style.top = cursorPosRef.current.y + 'px';
      }

      requestAnimationFrame(animateCursor);
    };

    const addClickEffect = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-click');
        setTimeout(() => {
          cursorRef.current && cursorRef.current.classList.remove('cursor-click');
        }, 200);
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', addClickEffect);
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', addClickEffect);
    };
  }, []);

  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select, [role="button"]')) {
        cursorRef.current.classList.add('cursor-hover');
      } else {
        cursorRef.current.classList.remove('cursor-hover');
      }
    };
    document.addEventListener('mousemove', handleHover);
    return () => document.removeEventListener('mousemove', handleHover);
  }, []);

  return (
    <>
      {/* Main cursor with smooth movement */}
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed z-[10000] w-8 h-8 rounded-full bg-white/30 backdrop-blur-md shadow-md transition-all duration-150 -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      ></div>
    </>
  );  
};

export default CustomCursor;
