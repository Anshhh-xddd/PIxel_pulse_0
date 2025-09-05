import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

// Import images using ES modules so bundler can optimize and ensure correct paths
import logo1 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-1.jpg";
import logo2 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-2.jpg";
import logo3 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-3.jpg";
import logo4 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-4.jpg";
import logo5 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-5.jpg";
import logo6 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-6.jpg";
import logo7 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-7.jpg";
import logo8 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-8.jpg";
import logo9 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-9.jpg";

type Brand = { src: string; alt: string };

const brands: Brand[] = [
  { src: logo1, alt: "Client logo 1" },
  { src: logo2, alt: "Client logo 2" },
  { src: logo3, alt: "Client logo 3" },
  { src: logo4, alt: "Client logo 4" },
  { src: logo5, alt: "Client logo 5" },
  { src: logo6, alt: "Client logo 6" },
  { src: logo7, alt: "Client logo 7" },
  { src: logo8, alt: "Client logo 8" },
  { src: logo9, alt: "Client logo 9" },
];

type BrandCardProps = { src: string; alt: string };

const BrandCard: React.FC<BrandCardProps> = ({ src, alt }) => {
  const [transformStyle, setTransformStyle] = useState<string>("rotateX(0deg) rotateY(0deg)");
  const [shineStyle, setShineStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;

    const cardElement = e.currentTarget;
    const rect = cardElement.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    const normalizedX = (localX / rect.width) * 2 - 1;
    const normalizedY = (localY / rect.height) * 2 - 1;

    const maxTiltDegrees = 10;
    const rotateY = normalizedX * maxTiltDegrees;
    const rotateX = -normalizedY * maxTiltDegrees;

    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`);

    setShineStyle({
      opacity: 0.45,
      background: `radial-gradient(400px circle at ${localX}px ${localY}px,
        rgba(249,115,22,0.35),
        rgba(249,115,22,0.12) 25%,
        transparent 60%)`,
    });
  };

  const handlePointerEnter = () => {
    setIsHovering(true);
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale(1.1)");
  };

  const handlePointerLeave = () => {
    setIsHovering(false);
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale(1)");
    setShineStyle({ opacity: 0 });
  };

  return (
    <motion.div
      className="shrink-0 tilt-wrapper my-2 transition-all duration-300 ease-out hover:mt-6 hover:mb-2"
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="relative z-10 tilt-card"
        onMouseMove={handlePointerMove}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        style={{
          transform: transformStyle,
          transition: "transform 0.25s ease-out",
        }}
      >
        <div
          className="relative bg-gradient-to-br from-gray-900/85 to-black/90 
                     backdrop-blur-md rounded-2xl p-10 
                     shadow-xl border border-orange-500/30 
                     transition-all duration-500 ease-out 
                     hover:border-orange-500/70 group 
                     hover:shadow-[0_0_40px_12px_rgba(249,115,22,0.45)] hover:-translate-y-1 md:hover:-translate-y-2"
        >
          {/* Enlarged Card Container */}
          <div
            className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 
                       bg-black/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 
                       shadow-inner border border-gray-700/40 
                       flex items-center justify-center 
                       transition-all duration-500 
                       group-hover:border-orange-500/60"
          >
            <img
              src={src}
              className="w-full h-full object-contain rounded-lg 
                         transition-transform duration-500 ease-out 
                         group-hover:scale-110"
              alt={alt}
              loading="lazy"
            />
          </div>

          {/* Shine overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none 
                       transition-opacity duration-500 mix-blend-screen"
            style={shineStyle}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

const MarqueeSlider: React.FC = () => {
  const isLargeScreen = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 1024px)').matches; // lg and up
  }, []);

  const [isDesktop, setIsDesktop] = useState<boolean>(isLargeScreen);
  const trackWrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [segmentWidth, setSegmentWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isDesktop) return;
    const compute = () => {
      const track = trackRef.current;
      if (!track) return;
      const width = track.scrollWidth / 2; // since we render duplicated items
      setSegmentWidth(width);
    };
    compute();
    window.addEventListener('resize', compute);
    window.addEventListener('orientationchange', compute);
    return () => {
      window.removeEventListener('resize', compute);
      window.removeEventListener('orientationchange', compute);
    };
  }, [isDesktop]);

  useAnimationFrame((_t, delta) => {
    if (isDesktop) return;
    if (isDragging) return;
    if (segmentWidth <= 0) return;
    const speedPxPerMs = 0.12; // tune speed
    let nextX = x.get() - speedPxPerMs * delta;
    // wrap within [-segmentWidth, 0]
    if (nextX <= -segmentWidth) {
      nextX += segmentWidth;
    } else if (nextX > 0) {
      nextX -= segmentWidth;
    }
    x.set(nextX);
  });

  return (
    <section
      className="w-full min-h-[60vh] lg:h-screen bg-black relative overflow-hidden flex flex-col justify-center"
    >
      {/* Enhanced Background aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[140%] h-[300px] 
                      bg-gradient-radial from-orange-500/20 via-transparent to-transparent blur-3xl opacity-40"></div>
      
      {/* Additional aesthetic elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-orange-500/20 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-orange-500/15 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 border border-orange-500/10 rounded-full opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 right-20 w-20 h-20 border border-orange-500/25 rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}></div>

      <div className="w-full h-full flex flex-col justify-center items-center relative z-10 px-4">
        <div className="text-center mb-16">
          <h3 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-400">Visual Stories</span> for
          </h3>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          </div>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            From startups to enterprises, we transform ideas into <span className="text-orange-400 font-medium">iconic brand identities</span>
          </p>
        </div>

        {/* Smooth Marquee on desktop; draggable on mobile/tablet */}
        <div ref={trackWrapperRef} className="relative w-full overflow-hidden">
          {isDesktop ? (
            <motion.div
              className="flex gap-8 sm:gap-10 md:gap-12 mt-2 md:mt-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...brands, ...brands].map((brand, i) => (
                <BrandCard key={i} src={brand.src} alt={brand.alt} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              ref={trackRef}
              className="flex gap-6 sm:gap-8 md:gap-10 mt-2 cursor-grab active:cursor-grabbing"
              style={{ x }}
              drag="x"
              dragElastic={0.04}
              dragMomentum={true}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => {
                // allow momentum to settle briefly before resuming auto scroll
                setTimeout(() => setIsDragging(false), 150);
              }}
            >
              {[...brands, ...brands].map((brand, i) => (
                <BrandCard key={i} src={brand.src} alt={brand.alt} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSlider;
