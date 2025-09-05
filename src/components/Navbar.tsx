import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Settings, Briefcase, User, Mail, ChevronDown, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Pixel_Pulse from '../Assets/Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (location.pathname === '/') {
        const sections = ['home', 'services', 'portfolio', 'about', 'contact'];
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (currentSection) setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/services') setActiveSection('services');
    else if (location.pathname === '/portfolio') setActiveSection('portfolio');
    else if (location.pathname === '/about') setActiveSection('about');
    else if (location.pathname === '/contact') setActiveSection('contact');
    else if (location.pathname !== '/') setActiveSection('home');
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (location.pathname === '/') {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      // Navigate to home page
      navigate('/');
      setActiveSection('home');
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (['services', 'portfolio', 'about', 'contact'].includes(sectionId)) {
      navigate(`/${sectionId}`);
      setIsOpen(false);
      setActiveSection(sectionId);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      setIsOpen(false);
      setActiveSection(sectionId);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setIsOpen(false);
    setActiveSection(sectionId);
  };

  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: <Home size={18} />, 
      tooltip: 'Welcome to PixelPulse',
      description: 'Back to homepage'
    },
    { 
      id: 'services', 
      label: 'Services', 
      icon: <Settings size={18} />, 
      tooltip: 'Our AI Solutions',
      description: 'Explore our services'
    },
    { 
      id: 'portfolio', 
      label: 'Portfolio', 
      icon: <Briefcase size={18} />, 
      tooltip: 'View Our Work',
      description: 'See our projects'
    },
    { 
      id: 'about', 
      label: 'About', 
      icon: <User size={18} />, 
      tooltip: 'Learn About Us',
      description: 'Meet our team'
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: <Mail size={18} />, 
      tooltip: 'Get In Touch',
      description: 'Start a conversation'
    }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      x: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.nav 
      className={`w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-orange-500/30' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Enhanced gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-orange-500/10 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/5 via-transparent to-transparent"></div>

      {/* Floating particles for desktop */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16 sm:h-20 md:h-24 lg:h-24">
          {/* Enhanced Logo */}
          <motion.div 
            className="flex-shrink-0 cursor-pointer group" 
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <img 
                src={Pixel_Pulse} 
                alt="PixelPulse Logo" 
                className="h-16 sm:h-20 md:h-24 lg:h-24 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-glow" 
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </div>
          </motion.div>

          {/* Enhanced Desktop Links */}
          <div className="hidden lg:flex space-x-1 xl:space-x-2 2xl:space-x-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`smooth-nav px-3 py-2 text-sm xl:text-base font-medium rounded-lg transition-all duration-300 relative group flex items-center gap-2 ${
                  activeSection === item.id
                    ? 'text-orange-500 bg-orange-500/10 border border-orange-500/20 shadow-glow'
                    : 'text-gray-300 hover:text-white hover:bg-orange-500/10'
                }`}
                title={item.tooltip}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className="hidden xl:inline">{item.label}</span>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                {/* Tooltip for mobile */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                  {item.description}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Enhanced Mobile Hamburger */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-10 h-10 flex flex-col items-center justify-center rounded-lg border transition-all duration-300 ${
                isOpen 
                  ? 'bg-orange-500/20 border-orange-500/40' 
                  : 'bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20'
              }`}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="block h-0.5 w-6 bg-white rounded-full"
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="block h-0.5 w-6 bg-white rounded-full mt-1"
                animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="block h-0.5 w-6 bg-white rounded-full mt-1"
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40"
              style={{ top: '3.5rem' }}
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={handleBackgroundClick}
            />
            
            {/* Menu Content */}
            <motion.div 
              className="lg:hidden fixed inset-0 z-50 flex flex-col"
              style={{ top: '3.5rem' }}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-4 sm:space-y-6 md:space-y-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative group w-full max-w-sm text-center text-white hover:text-orange-500 transition-all duration-300 flex items-center justify-center gap-3 ${
                      activeSection === item.id 
                        ? 'text-orange-500 scale-110' 
                        : 'text-2xl sm:text-3xl md:text-4xl font-semibold'
                    }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="flex items-center gap-3 relative z-10"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="font-bold">{item.label}</span>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExternalLink size={16} />
                      </motion.div>
                    </motion.div>
                    
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-orange-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.2, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
              </div>
              
              {/* Mobile menu footer */}
              <motion.div 
                className="px-6 py-4 border-t border-orange-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="text-center text-gray-400 text-sm">
                  <p className="mb-2">Ready to start your project?</p>
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-black font-bold px-6 py-2 rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
