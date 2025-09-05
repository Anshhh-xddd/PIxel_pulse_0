import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create motion values for mouse position
  const mouseX = useSpring(mousePosition.x, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(mousePosition.y, { stiffness: 100, damping: 30 });

  // Scroll tracking for the entire hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scroll velocity tracking
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Transform values based on scroll
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.8, 0]);
  const titleRotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const subtitleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.9]);

  // Velocity-based animations
  const titleVelocityY = useTransform(smoothVelocity, [-1, 0, 1], [20, 0, -20]);
  const titleVelocityRotate = useTransform(smoothVelocity, [-1, 0, 1], [-5, 0, 5]);
  const subtitleVelocityY = useTransform(smoothVelocity, [-1, 0, 1], [10, 0, -10]);

  // Direction-based color changes
  const titleColor = useTransform(
    smoothVelocity,
    [-1, 0, 1],
    ["rgb(249, 115, 22)", "rgb(255, 255, 255)", "rgb(239, 68, 68)"]
  );

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Navigate directly to contact page
    window.location.href = '/contact';
  };

  const scrollToPortfolio = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // First try to find portfolio section on current page
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If not found, navigate to portfolio page
      window.location.href = '/portfolio';
    }
  };

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating particles effect
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-orange-500/30 rounded-full animate-float';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      
      particlesRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 0.5, duration: 0.5 }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="min-h-screen flex flex-col justify-center bg-black relative overflow-hidden py-10 sm:py-16 md:py-20 lg:py-0"
    >
      {/* Enhanced gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-orange-500/10 animate-pulse-slow"></div>
      
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/5 via-transparent to-transparent"></div>
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>
      
      {/* Animated circuit pattern background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-10 left-4 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border border-orange-500"
          animate={{ 
            boxShadow: ['0 0 10px rgba(249,115,22,0.3)', '0 0 20px rgba(249,115,22,0.6)', '0 0 10px rgba(249,115,22,0.3)']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          className="absolute top-32 right-4 sm:right-10 md:right-32 w-10 sm:w-16 md:w-24 h-10 sm:h-16 md:h-24 border border-orange-500"
          animate={{ 
            boxShadow: ['0 0 10px rgba(249,115,22,0.3)', '0 0 20px rgba(249,115,22,0.6)', '0 0 10px rgba(249,115,22,0.3)']
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-24 left-4 sm:left-10 md:left-40 w-8 sm:w-14 md:w-20 h-8 sm:h-14 md:h-20 border border-orange-500"
          animate={{ 
            boxShadow: ['0 0 10px rgba(249,115,22,0.3)', '0 0 20px rgba(249,115,22,0.6)', '0 0 10px rgba(249,115,22,0.3)']
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-10 right-4 w-12 sm:w-20 md:w-28 h-12 sm:h-20 md:h-28 border border-orange-500"
          animate={{ 
            boxShadow: ['0 0 10px rgba(249,115,22,0.3)', '0 0 20px rgba(249,115,22,0.6)', '0 0 10px rgba(249,115,22,0.3)']
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        ></motion.div>
      </div>
      
      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 lg:px-8 relative z-10 w-full">
        <div className="text-center">

          {/* Enhanced title with scroll velocity and direction animations */}
          <motion.h1 
            ref={titleRef}
            className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            style={{
              y: useTransform([titleY, titleVelocityY], (values: number[]) => values[0] + values[1]),
              scale: titleScale,
              opacity: titleOpacity,
              rotateX: useTransform([titleRotateX, titleVelocityRotate], (values: number[]) => values[0] + values[1]),
              color: titleColor
            }}
          >
            <motion.span 
              className="title-word inline-block" 
              variants={wordVariants}
              style={{
                filter: useTransform(smoothVelocity, [-1, 0, 1], [
                  "blur(0px) brightness(1.2)",
                  "blur(0px) brightness(1)",
                  "blur(0px) brightness(1.2)"
                ])
              }}
            >
              We Build Brands
            </motion.span>
            <br />
            <motion.span 
              className="title-word inline-block"
              variants={wordVariants}
              whileHover={{ scale: 1.05 }}
              style={{
                color: useTransform(smoothVelocity, [-1, 0, 1], [
                  "rgb(249, 115, 22)",
                  "rgb(255, 255, 255)",
                  "rgb(239, 68, 68)"
                ]),
                filter: useTransform(smoothVelocity, [-1, 0, 1], [
                  "blur(0px) brightness(1.2)",
                  "blur(0px) brightness(1)",
                  "blur(0px) brightness(1.2)"
                ]),
                // x: useTransform(mouseX, [0, window.innerWidth], [-20, 20]),
                // y: useTransform(mouseY, [0, window.innerHeight], [-10, 10]),
                // rotateY: useTransform(mouseX, [0, window.innerWidth], [-15, 15]),
                // rotateX: useTransform(mouseY, [0, window.innerHeight], [15, -15]),
                // scale: useTransform(mouseX, [0, window.innerWidth], [1, 1.1])
              }}
            >
              That Think,
            </motion.span>
            <br />
            <motion.span 
              className="title-word inline-block" 
              variants={wordVariants}
              style={{
                filter: useTransform(smoothVelocity, [-1, 0, 1], [
                  "blur(0px) brightness(1.2)",
                  "blur(0px) brightness(1)",
                  "blur(0px) brightness(1.2)"
                ])
              }}
            >
              Learn, and Evolve.
            </motion.span>
          </motion.h1>

          {/* Enhanced subtitle with scroll velocity animations */}
          <motion.p 
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-2xl text-gray-300 mb-6 sm:mb-8 md:mb-12 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              y: useTransform([subtitleY, subtitleVelocityY], (values: number[]) => values[0] + values[1]),
              opacity: subtitleOpacity,
              scale: subtitleScale,
              filter: useTransform(smoothVelocity, [-1, 0, 1], [
                "blur(0.5px) brightness(1.1)",
                "blur(0px) brightness(1)",
                "blur(0.5px) brightness(1.1)"
              ])
            }}
          >
            We design cutting-edge robotic interfaces, AI-powered brands, and futuristic visual experiences that propel your technology into tomorrow.
          </motion.p>

          {/* Enhanced buttons with scroll-based animations */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -30]),
              opacity: useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, 0]),
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.9])
            }}
          >
            <motion.button 
              onClick={scrollToContact}
              className="group bg-gradient-to-r from-orange-500 to-red-500 text-black px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold hover:from-orange-400 hover:to-red-400 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-orange-500/25 rounded-lg transform hover:scale-105 cursor-pointer relative overflow-hidden"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              style={{
                filter: useTransform(smoothVelocity, [-1, 0, 1], [
                  "brightness(1.2) contrast(1.1)",
                  "brightness(1) contrast(1)",
                  "brightness(1.2) contrast(1.1)"
                ])
              }}
            >
              <span className="relative z-10">Initialize Project</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <ArrowRight className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <motion.button 
              onClick={scrollToPortfolio}
              className="group border-2 border-orange-500 text-white px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium hover:bg-orange-500 hover:text-black transition-all duration-300 flex items-center gap-2 rounded-lg transform hover:scale-105 cursor-pointer relative overflow-hidden"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              style={{
                borderColor: useTransform(smoothVelocity, [-1, 0, 1], [
                  "rgb(249, 115, 22)",
                  "rgb(249, 115, 22)",
                  "rgb(239, 68, 68)"
                ])
              }}
            >
              <span className="relative z-10">Explore Our Work</span>
              <motion.div
                className="absolute inset-0 bg-orange-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator with velocity-based animations */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])
        }}
      >
        <div className="w-4 sm:w-6 h-7 sm:h-10 border-2 border-orange-500 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 sm:h-3 bg-orange-500 rounded-full mt-1 sm:mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              backgroundColor: useTransform(smoothVelocity, [-1, 0, 1], [
                "rgb(249, 115, 22)",
                "rgb(249, 115, 22)",
                "rgb(239, 68, 68)"
              ])
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;