import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { servicesData } from '../data/services';

const Services = () => {
  const services = servicesData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      rotateX: 15
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      rotateX: -5,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180,
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut" as const,
        delay: 0.3
      }
    },
    hover: {
      rotate: 360,
      scale: 1.2,
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: 0.4
      }
    }
  };

  const descriptionVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: 0.5
      }
    }
  };

  const featureVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  // Service Card Component with Viewport Tracking
  const ServiceCard = ({ service, index }: { service: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { 
      once: true, 
      margin: "-100px 0px -100px 0px",
      amount: 0.3
    });

    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

    return (
      <motion.div 
        ref={cardRef}
        className="group h-full"
        style={{ y, opacity, scale, rotateX }}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover="hover"
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: "easeOut"
        }}
      >
        <div className="bg-black/80 backdrop-blur-sm p-6 sm:p-8 md:p-10 lg:p-12 hover:shadow-glow-lg transition-all duration-500 border border-gray-800 hover:border-orange-500/50 rounded-xl h-full flex flex-col relative overflow-hidden">
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 1 }}
          />

          {/* Floating particles for each card */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4 sm:mb-6 md:mb-8">
              <motion.div 
                className="text-orange-500 mr-4 sm:mr-5"
                variants={iconVariants}
                whileHover="hover"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300 relative overflow-hidden">
                  {service.icon}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight tracking-wide group-hover:text-orange-400 transition-colors duration-300"
                variants={titleVariants}
              >
                {service.title}
              </motion.h3>
            </div>
            
            <motion.p 
              className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed flex-grow group-hover:text-gray-200 transition-colors duration-300"
              variants={descriptionVariants}
            >
              {service.description}
            </motion.p>
            
            <div className="space-y-2 sm:space-y-3 mt-auto">
              {service.features.map((feature: string, featureIndex: number) => (
                <motion.div 
                  key={featureIndex} 
                  className="flex items-start"
                  variants={featureVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.6 + featureIndex * 0.1 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-3 sm:mr-4 mt-2 flex-shrink-0"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: featureIndex * 0.2 
                    }}
                  />
                  <span className="text-gray-400 font-medium text-sm sm:text-base leading-relaxed group-hover:text-orange-300 transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="services" className="py-10 sm:py-16 md:py-20 bg-gray-900 relative overflow-hidden">
      {/* Enhanced gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/6 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/4 via-transparent to-orange-500/4"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/12 via-transparent to-orange-500/6 animate-pulse-slow"></div>
      
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/4 via-transparent to-transparent"></div>
      
      {/* Top fade for seamless transition from About */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>
      
      {/* Bottom fade for seamless transition to Portfolio */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-20" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            System <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Capabilities</span>
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base md:text-xl text-gray-300 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            We engineer visual systems that merge cutting-edge technology with intelligent design, creating interfaces that think as fast as they look.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 md:gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;