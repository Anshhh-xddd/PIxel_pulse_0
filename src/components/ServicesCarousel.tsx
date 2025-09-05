import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { servicesData } from '../data/services';
import { SkipperCard, SkipperCardContent, SkipperCardDescription, SkipperCardFooter, SkipperCardHeader, SkipperCardTitle } from './ui/SkipperCard';

type Slide = {
  title: string;
  description: string;
  icon: React.ReactNode;
  points: string[];
};

const buildSlides = (): Slide[] =>
  servicesData.map((s) => ({
    title: s.title,
    description: s.description,
    icon: s.icon,
    points: s.features,
  }));

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

const useResizeObserver = (ref: React.RefObject<HTMLElement>, onResize: () => void) => {
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(onResize);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref, onResize]);
};

const useAutoplay = (playing: boolean, onTick: () => void, delayMs: number) => {
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(onTick, delayMs);
    return () => window.clearInterval(id);
  }, [playing, onTick, delayMs]);
};

const ServicesCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(360);
  const [gap, setGap] = useState(24);
  const slides = useMemo(buildSlides, []);
  const initialIndex = useMemo(() => {
    const i = slides.findIndex((s) => /UI\/UX/i.test(s.title));
    return i >= 0 ? i : 0;
  }, [slides]);
  const [index, setIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);

  const total = slides.length;

  const computeLayout = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    setContainerWidth(w);
    // Show ~1.6 cards on mobile, ~2.2 on md, ~2.6 on lg; center mode
    const bp = w < 640 ? 1.6 : w < 1024 ? 2.2 : 2.6;
    const newCardWidth = clamp((w - gap * (bp - 1)) / bp, 260, 520);
    setCardWidth(newCardWidth);
    setGap(w < 640 ? 14 : 24);
  }, [gap]);

  useEffect(() => {
    computeLayout();
    window.addEventListener('resize', computeLayout);
    return () => window.removeEventListener('resize', computeLayout);
  }, [computeLayout]);

  useResizeObserver(containerRef, computeLayout);

  const goTo = useCallback((i: number) => {
    setIndex((prev) => (i + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  useAutoplay(!isPaused, next, 3500);

  // drag support
  const dragX = useMotionValue(0);
  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -50) next();
    else if (swipe > 50) prev();
  };

  // Track translation
  const translateX = useTransform(dragX, (v) => v);

  const trackOffset = useMemo(() => {
    const center = containerWidth / 2 - cardWidth / 2;
    return center - index * (cardWidth + gap);
  }, [index, cardWidth, gap, containerWidth]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Track */}
      <motion.div
        className="flex"
        style={{ x: translateX as any, gap: `${gap}px` }}
        drag="x"
        dragConstraints={{ left: -99999, right: 99999 }}
        onDragEnd={handleDragEnd}
        animate={{ x: trackOffset, transition: { type: 'spring', stiffness: 120, damping: 20 } }}
      >
        {slides.map((s, i) => {
          const distance = Math.min(
            Math.abs(i - index),
            Math.abs(i - index + total),
            Math.abs(i - index - total)
          );
          const scale = distance === 0 ? 1 : distance === 1 ? 0.94 : 0.9;
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.9 : 0.6;
          const isCore = /Brand Strategy|Visual Identity|Website|UI\/UX/i.test(s.title);
          const href = `/contact?service=${encodeURIComponent(s.title)}`;

          return (
            <motion.div
              key={i}
              className="shrink-0"
              style={{ width: `${cardWidth}px` }}
              animate={{ scale, opacity }}
              transition={{ duration: 0.35 }}
            >
              <TiltCard>
                <SkipperCard>
                  <SkipperCardHeader>
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-orange-500/20 to-red-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-12 h-12 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center ring-1 ring-orange-500/20 group-hover:ring-orange-500/40 transition">
                          {s.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <SkipperCardTitle>{s.title}</SkipperCardTitle>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${isCore ? 'border-orange-500/40 text-orange-400 bg-orange-500/10' : 'border-gray-600 text-gray-300 bg-white/5'}`}>{isCore ? 'Core' : 'Extended'}</span>
                        </div>
                        <SkipperCardDescription>{s.description}</SkipperCardDescription>
                      </div>
                    </div>
                  </SkipperCardHeader>

                  <SkipperCardContent>
                    <ul className="space-y-2">
                      {s.points.map((p, j) => (
                        <li key={j} className="text-gray-300 text-sm flex items-center gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </SkipperCardContent>

                  <SkipperCardFooter>
                    <a
                      href={href}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-black font-semibold py-2 px-3 text-sm hover:from-orange-400 hover:to-red-400 transition-colors"
                    >
                      Discuss this
                    </a>
                  </SkipperCardFooter>
                </SkipperCard>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 border border-orange-500/30 p-2 text-white hover:bg-black/70"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 border border-orange-500/30 p-2 text-white hover:bg-black/70"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-orange-500' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;

// Small helper for pointer tilt interaction
const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const translate = useMotionValue(0);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    rotY.set((px - 0.5) * 10); // -5..5
    rotX.set(-(py - 0.5) * 10);
    translate.set(hovering ? 8 : 0);
  };

  const reset = () => {
    rotX.set(0);
    rotY.set(0);
    translate.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rotX, rotateY: rotY, translateZ: translate }}
      onMouseMove={handleMove}
      onMouseLeave={() => { setHovering(false); reset(); }}
      onMouseEnter={() => setHovering(true)}
      className="[transform-style:preserve-3d]"
    >
      {children}
    </motion.div>
  );
};


