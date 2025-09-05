import React, { useState, useEffect } from "react";
import {
  Home,
  Settings,
  Briefcase,
  User,
  Mail,
  ExternalLink,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Pixel_Pulse from "../Assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll + active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (location.pathname === "/") {
        const sections = ["home", "services", "portfolio", "about", "contact"];
        const currentSection = sections.find((section) => {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Handle route-based section highlight
  useEffect(() => {
    if (location.pathname === "/services") setActiveSection("services");
    else if (location.pathname === "/portfolio") setActiveSection("portfolio");
    else if (location.pathname === "/about") setActiveSection("about");
    else if (location.pathname === "/contact") setActiveSection("contact");
    else if (location.pathname !== "/") setActiveSection("home");
  }, [location.pathname]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
    } else {
      navigate("/");
      setActiveSection("home");
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (["services", "portfolio", "about", "contact"].includes(sectionId)) {
      navigate(`/${sectionId}`);
      setIsOpen(false);
      setActiveSection(sectionId);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      setIsOpen(false);
      setActiveSection(sectionId);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });

    setIsOpen(false);
    setActiveSection(sectionId);
  };

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={18} />,
      description: "Back to homepage",
    },
    {
      id: "services",
      label: "Services",
      icon: <Settings size={18} />,
      description: "Explore our services",
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: <Briefcase size={18} />,
      description: "See our projects",
    },
    {
      id: "about",
      label: "About",
      icon: <User size={18} />,
      description: "Meet our team",
    },
    {
      id: "contact",
      label: "Contact",
      icon: <Mail size={18} />,
      description: "Start a conversation",
    },
  ];

  // Framer Motion animations
  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg border-b border-orange-500/30"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20 sm:h-24">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer group flex items-center"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={Pixel_Pulse}
              alt="PixelPulse Logo"
              className="h-10 sm:h-14 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-glow"
              loading="eager"
            />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group flex items-center gap-2 ${
                  activeSection === item.id
                    ? "text-orange-500 bg-orange-500/10 border border-orange-500/20 shadow-glow"
                    : "text-gray-300 hover:text-white hover:bg-orange-500/10"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-10 h-10 flex flex-col items-center justify-center rounded-lg border transition-all duration-300 ${
                isOpen
                  ? "bg-orange-500/20 border-orange-500/40"
                  : "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20"
              }`}
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
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col justify-between"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={handleBackgroundClick}
          >
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-2xl font-semibold flex items-center gap-3 transition-all ${
                    activeSection === item.id
                      ? "text-orange-500 scale-110"
                      : "text-white hover:text-orange-400"
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  {item.label}
                  <ExternalLink size={16} className="opacity-60" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Footer */}
            <div className="px-6 py-4 border-t border-orange-500/20 text-center">
              <p className="text-gray-400 text-sm mb-2">
                Ready to start your project?
              </p>
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-black font-bold px-6 py-2 rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
