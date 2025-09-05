import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Bot, Globe, Cpu, Instagram, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const navigate = useNavigate();

  // Stats config: add numeric value for animation
  const stats = [
    { icon: <Bot size={24} />, number: 200, suffix: "+", label: "Designed" },
    {
      icon: <Zap size={24} />,
      number: 40,
      suffix: "+",
      label: "Active client",
    },
    {
      icon: <Globe size={24} />,
      number: 10,
      suffix: "+",
      label: "Countries Deployed",
    },
    {
      icon: <Cpu size={24} />,
      number: 5,
      suffix: "+",
      label: "Years Of  Exprience",
    },
  ];

  // Custom hook for animated counting when in view
  function useCountUpWhenVisible(target: number, duration: number = 5200) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [restartNonce, setRestartNonce] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      let observer: IntersectionObserver | null = null;
      if (ref.current) {
        observer = new window.IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              setHasAnimated(true);
            }
          },
          { threshold: 0.4 }
        );
        observer.observe(ref.current);
      }
      return () => {
        if (observer) observer.disconnect();
      };
    }, []);

    useEffect(() => {
      if (!hasAnimated && restartNonce === 0) return;
      let raf: number | undefined;
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) raf = requestAnimationFrame(animate);
        else setCount(target);
      };
      setCount(0);
      raf = requestAnimationFrame(animate);
      return () => {
        if (raf !== undefined) cancelAnimationFrame(raf);
      };
    }, [hasAnimated, restartNonce, target, duration]);

    const restart = () => {
      setHasAnimated(true);
      setRestartNonce((n) => n + 1);
    };

    return [count, ref, restart] as const;
  }

  const StatNumber: React.FC<{ value: number; suffix?: string }> = ({
    value,
    suffix = "+",
  }) => {
    const [count, ref, restart] = useCountUpWhenVisible(value, 1200);
    return (
      <div
        ref={ref}
        onMouseEnter={restart}
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 text-white group-hover:text-orange-500 transition-colors duration-300"
      >
        {count}
        {suffix}
      </div>
    );
  };

  const goToAboutPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/about");
  };

  // Removed unused handlers to satisfy lint rules

  return (
    <section
      id="about"
      className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Enhanced gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/6 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/4 via-transparent to-orange-500/4"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/12 via-transparent to-orange-500/6 animate-pulse"></div>

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-orange-500/4 via-transparent to-transparent"></div>

      {/* Top fade for seamless transition from Hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>

      {/* Bottom fade for seamless transition to Services */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Mobile Layout - Single Column with Optimized Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Content Section - Optimized for Mobile */}
          <div
            data-aos="fade-up"
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 md:mb-10 leading-tight tracking-tight">
              Robotics is our
              <br />
              <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                DNA
              </span>
            </h2>

            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto lg:mx-0">
              <p className="font-light">
                At PixelPulse, we are more than a design studio. we are
                architects of the future. AI-powered branding, and intelligent
                visual systems, we craft experiences that think, learn, and
                evolve. Our work bridges advanced engineering with visionary
                design, creating solutions that are both visually striking and
                functionally superior.
              </p>
              <p className="font-light">
                From Fortune 500 tech giants to innovative startups, we engineer
                digital and physical experiences that push the boundaries of
                technology and aesthetics. Whether it’s designing autonomous
                vehicle interfaces, industrial robots, or immersive brand
                ecosystems, every project is built with precision, strategy, and
                creativity.
              </p>
              <p className="font-light">
                With over 5 years of experience, 200+ designs, and deployments
                in 10+ countries, PixelPulse is dedicated to shaping the future
                of human-machine interaction and digital brand experiences.
              </p>
              <p className="font-light">
                Crafting your visual identity—PixelPulse, where AI and design
                converge to create the extraordinary.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 flex justify-center lg:justify-start gap-4">
              <button
                onClick={goToAboutPage}
                className="group bg-gradient-to-r from-orange-500 to-red-500 text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-bold hover:from-orange-400 hover:to-red-400 transition-all duration-300 rounded-xl shadow-lg shadow-orange-500/25 transform hover:scale-105 cursor-pointer w-full sm:w-auto"
              >
                Explore Our Systems
              </button>
              {/* <button 
                onClick={scrollToTop}
                className="group border-2 border-orange-500 text-orange-500 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-bold hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-black transition-all duration-300 rounded-xl transform hover:scale-105 cursor-pointer w-full sm:w-auto"
              >
                Back to Top
              </button> */}
            </div>
          </div>

          {/* Stats Section - Optimized for Mobile */}
          <div
            className="order-1 lg:order-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto lg:mx-0">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group text-center p-4 sm:p-5 md:p-6 lg:p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl sm:rounded-2xl hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                  data-aos="zoom-in"
                  data-aos-delay={400 + index * 100}
                >
                  <div className="text-orange-500 mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <StatNumber value={stat.number} suffix={stat.suffix} />
                  <div className="text-gray-300 font-medium text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
