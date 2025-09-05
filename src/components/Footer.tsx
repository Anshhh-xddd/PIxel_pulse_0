import React from 'react';
import { Linkedin, Instagram, Mail, Phone, MapPin, ArrowUp, Heart, Zap, Sparkles, Globe, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Pixel_Pulse from '../Assets/Logo.png';

const Footer = () => {
  const location = useLocation();
  
  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openGmailCompose = () => {
    const email = 'pixelpulse2905@gmail.com';
    const subject = '🤖 New Project Inquiry - PixelPulse';
    const body = `Hello PixelPulse Team,

I'm interested in your design services and would like to discuss a potential project.

Project Details:
- Project Type: 
- Timeline: 
- Budget Range: 
- Additional Requirements: 

Please let me know the next steps.

Best regards,
[Your Name]`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const services = [
    'Brand Identity Design',
    'Web Development',
    'Mobile App Design',
    'Digital Marketing',
    'AI & Automation',
    'Consulting Services'
  ];

  const quickLinks = [
    { label: 'About Us', id: 'about', path: '/about' },
    { label: 'Our Portfolio', id: 'portfolio', path: '/portfolio' },
    { label: 'Contact Us', id: 'contact', path: '/contact' },
    { label: 'Services', id: 'services', path: '/services' }
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/_pixel_pulse._?igsh=bWdzcm8wZjhidWps', label: 'Instagram' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/pixel-pulse-9a27aa380', label: 'LinkedIn' },
    { icon: <Mail size={20} />, href: 'mailto:pixelpulse2905@gmail.com', label: 'Email' }
  ];

  const contactInfo = [
    { icon: <Mail size={16} />, text: 'pixelpulse2905@gmail.com', action: openGmailCompose },
    { icon: <Phone size={16} />, text: '+91 95122 94700', action: null },
    { icon: <MapPin size={16} />, text: 'Mavdi, Rajkot, Gujarat, India', action: null }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  // Hide footer on contact page and main page
  if (location.pathname === '/contact' || location.pathname === '/') {
    return null;
  }

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Enhanced gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/15 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-orange-500/15 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/8 via-transparent to-transparent"></div>
      
      {/* Enhanced geometric patterns */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-orange-500/20 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-orange-500/15 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 border border-orange-500/10 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 right-20 w-20 h-20 border border-orange-500/25 rounded-full opacity-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(249,115,22,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Larger floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Top fade for seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Current Page Indicator */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full">
            <motion.div
              className="w-2 h-2 bg-orange-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-orange-400 font-medium text-sm">
              Currently viewing: {location.pathname === '/' ? 'Home' : location.pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Page'}
            </span>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div 
          className="py-16 sm:py-20 md:py-24 lg:py-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Company Info */}
            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <motion.div 
                className="mb-8 relative group"
                data-animation="scale"
              >
                <div className="relative">
                  <img 
                    src={Pixel_Pulse}
                    alt="PixelPulse Logo"
                    className="h-12 sm:h-14 md:h-16 lg:h-20 cursor-pointer hover:drop-shadow-glow transition-all duration-300"
                  />
                </div>
              </motion.div>
              
              <motion.p 
                className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mb-8 relative"
                data-animation="text-reveal"
              >
                <span className="relative z-10">
                  Transforming ideas into <span className="text-orange-400 font-medium">digital reality</span> with cutting-edge design and innovative technology solutions. We create brands that <span className="text-orange-400 font-medium">think, learn, and evolve</span>.
                </span>
                <motion.div
                  className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.p>

              {/* Contact Info */}
              <motion.div 
                className="space-y-4 mb-8"
                data-animation="stagger"
                data-stagger="0.1"
              >
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    className="group flex items-center gap-4 text-gray-300 hover:text-orange-500 transition-all duration-300 p-3 rounded-xl hover:bg-orange-500/5 border border-transparent hover:border-orange-500/20"
                    data-animation="slide"
                    data-direction="left"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30 group-hover:border-orange-500/50 group-hover:scale-110 transition-all duration-300 relative overflow-hidden"
                      whileHover={{ rotateY: 5 }}
                    >
                      <div className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300 relative z-10">
                        {info.icon}
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Animated glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-orange-500/20 rounded-xl blur-md"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: index * 0.3
                        }}
                      />
                    </motion.div>
                    {info.action ? (
                      <button
                        onClick={info.action}
                        className="text-sm sm:text-base cursor-pointer font-medium hover:underline"
                      >
                        {info.text}
                      </button>
                    ) : (
                      <span className="text-sm sm:text-base font-medium">{info.text}</span>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex space-x-4"
                data-animation="fade"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="group relative p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 hover:from-orange-500/20 hover:to-red-500/20 border border-gray-700/50 hover:border-orange-500/50 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25"
                    whileHover={{ scale: 1.1, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <div className="text-gray-300 group-hover:text-orange-400 transition-colors duration-300 relative z-10">
                      {social.icon}
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Services Links */}
            <motion.div 
              variants={itemVariants}
              data-animation="slide"
              data-direction="right"
              className="relative"
            >
              <motion.h4 
                className="text-xl sm:text-2xl font-bold mb-6 text-white"
                data-animation="text-fill"
              >
                Our Services
                {location.pathname.includes('/portfolio/') && (
                  <motion.div
                    className="text-sm text-orange-400 font-normal mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Viewing {location.pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Portfolio
                  </motion.div>
                )}
              </motion.h4>
                             <motion.ul 
                 className="space-y-3"
                 data-animation="stagger"
                 data-stagger="0.1"
               >
                {services.map((service, index) => (
                  <motion.li 
                    key={index}
                    data-animation="slide"
                    data-direction="left"
                  >
                                         <motion.a
                       href="#services"
                       onClick={scrollToSection('services')}
                       className="group flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300 cursor-pointer p-2 rounded-lg hover:bg-orange-500/5 border border-transparent hover:border-orange-500/20"
                       whileHover={{ x: 5 }}
                     >
                       <motion.div
                         className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full group-hover:scale-150 transition-transform duration-300 relative"
                         animate={{ scale: [1, 1.3, 1] }}
                         transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                       >
                         {/* Animated glow around dot */}
                         <motion.div
                           className="absolute inset-0 bg-orange-500/30 rounded-full blur-sm"
                           animate={{ 
                             scale: [1, 1.5, 1],
                             opacity: [0.5, 0.8, 0.5]
                           }}
                           transition={{ 
                             duration: 2, 
                             repeat: Infinity, 
                             ease: "easeInOut",
                             delay: index * 0.2
                           }}
                         />
                       </motion.div>
                       <span className="text-sm sm:text-base font-medium">{service}</span>
                     </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              variants={itemVariants}
              data-animation="slide"
              data-direction="right"
            >
              <motion.h4 
                className="text-xl sm:text-2xl font-bold mb-6 text-white"
                data-animation="text-fill"
              >
                Quick Links
              </motion.h4>
              <motion.ul 
                className="space-y-3"
                data-animation="stagger"
                data-stagger="0.1"
              >
                {quickLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.li 
                      key={index}
                      data-animation="slide"
                      data-direction="left"
                    >
                      <a
                        href={link.path}
                        className={`text-sm sm:text-base font-normal cursor-pointer transition-all duration-300 p-2 rounded-lg ${
                          isActive 
                            ? 'text-orange-500 bg-orange-500/10 border border-orange-500/30 shadow-lg shadow-orange-500/20' 
                            : 'text-gray-300 hover:text-orange-500 hover:bg-orange-500/5 border border-transparent hover:border-orange-500/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{link.label}</span>
                          {isActive && (
                            <motion.div
                              className="w-2 h-2 bg-orange-500 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Features */}
              <motion.div 
                className="mt-8 space-y-3"
                data-animation="fade"
              >
                <motion.div 
                  className="flex items-center gap-2 text-gray-300"
                  data-animation="slide"
                  data-direction="left"
                >
                  <Zap size={16} className="text-orange-500" />
                  <span className="text-sm">Fast Response Time</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-gray-300"
                  data-animation="slide"
                  data-direction="left"
                >
                  <Users size={16} className="text-orange-500" />
                  <span className="text-sm">Professional Team</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-gray-300"
                  data-animation="slide"
                  data-direction="left"
                >
                  <Award size={16} className="text-orange-500" />
                  <span className="text-sm">Quality Guaranteed</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div 
          className="border-t border-gray-800/50 py-6 sm:py-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-gray-400 text-sm sm:text-base text-center md:text-left"
              data-animation="text-reveal"
            >
              © 2024 PixelPulse Design Studio. All rights reserved.
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-2 text-gray-400 text-sm"
              data-animation="fade"
            >
              <span>Made with</span>
              <motion.div
                className="relative"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Heart size={16} className="text-red-500" />
                <motion.div
                  className="absolute inset-0 bg-red-500/30 rounded-full blur-sm"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.div>
              <span>by PixelPulse</span>
            </motion.div>

            <motion.div 
              className="flex space-x-6"
              data-animation="fade"
            >
              <a 
                href="#" 
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm"
              >
                Terms of Service
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-[9999] p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
        whileHover={{ scale: 1.15, rotate: 8, y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 50, rotate: 180 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          rotate: 0,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 0.8, 
          delay: 1,
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          right: '2rem',
          bottom: '2rem',
          position: 'fixed',
          zIndex: 9999
        }}
      >
        <motion.div
          animate={{ 
            y: [0, -4, 0],
            rotate: [0, 2, -2, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <ArrowUp size={20} />
        </motion.div>
        
        {/* Enhanced shine effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Multiple animated glow rings */}
        <motion.div
          className="absolute inset-0 border-2 border-white/40 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.7, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute inset-0 border border-white/20 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, -90, -180]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Enhanced floating particles */}
        <motion.div
          className="absolute -top-3 -left-3 w-2.5 h-2.5 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full"
          animate={{ 
            y: [0, -12, 0],
            x: [0, -5, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.3
          }}
        />
        <motion.div
          className="absolute -bottom-3 -right-3 w-2 h-2 bg-gradient-to-r from-red-400 to-red-300 rounded-full"
          animate={{ 
            y: [0, -10, 0],
            x: [0, 5, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.8
          }}
        />
        <motion.div
          className="absolute -top-2 right-2 w-1.5 h-1.5 bg-yellow-400 rounded-full"
          animate={{ 
            y: [0, -8, 0],
            x: [0, 3, 0],
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.2
          }}
        />
        
        {/* Pulsing background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-md"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Rotating gradient border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent, rgba(255,255,255,0.3), transparent)',
            padding: '2px'
          }}
          animate={{ 
            rotate: 360
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
      </motion.button>
    </footer>
  );
};

export default Footer;
