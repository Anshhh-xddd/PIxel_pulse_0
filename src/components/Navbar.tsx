// src/components/Navbar.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Home, Settings, Briefcase, User, Mail, ExternalLink, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Pixel_Pulse from "../Assets/Logo.png";

/** Tiny helper */
const cx = (...xs: Array<string | false | null | undefined>) => xs.filter(Boolean).join(" ");

/** Rounded “pill” hamburger that morphs to X */
const BurgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <motion.svg
    width={28}
    height={22}
    viewBox="0 0 28 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="pointer-events-none"
  >
    {/* Top bar */}
    <motion.rect
      x="1"
      y="1.5"
      rx="6"
      ry="6"
      width="26"
      height="5"
      initial={false}
      animate={isOpen ? { y: 8.5, rotate: 45 } : { y: 0, rotate: 0 }}
      transition={{ duration: 0.24 }}
      className="fill-white"
      style={{ originX: "50%", originY: "50%" }}
    />
    {/* Middle bar */}
    <motion.rect
      x="1"
      y="8.5"
      rx="6"
      ry="6"
      width="26"
      height="5"
      initial={false}
      animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.18 }}
      className="fill-white"
    />
    {/* Bottom bar */}
    <motion.rect
      x="1"
      y="15.5"
      rx="6"
      ry="6"
      width="26"
      height="5"
      initial={false}
      animate={isOpen ? { y: -8.5, rotate: -45 } : { y: 0, rotate: 0 }}
      transition={{ duration: 0.24 }}
      className="fill-white"
      style={{ originX: "50%", originY: "50%" }}
    />
  </motion.svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // a11y focus trap in mobile drawer
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstFocusRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLButtonElement | null>(null);

  /** NAV ITEMS */
  const navItems = [
    { id: "home", label: "Home", icon: <Home size={18} />, description: "Back to homepage" },
    { id: "services", label: "Services", icon: <Settings size={18} />, description: "Explore our services" },
    { id: "portfolio", label: "Portfolio", icon: <Briefcase size={18} />, description: "See our projects" },
    { id: "about", label: "About", icon: <User size={18} />, description: "Meet our team" },
    { id: "contact", label: "Contact", icon: <Mail size={18} />, description: "Start a conversation" },
  ] as const;

  /** ===== Scroll / Active Section Tracking (rAF throttled) ===== */
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        if (location.pathname === "/") {
          const sections = ["home", "services", "portfolio", "about", "contact"];
          const current = sections.find((section) => {
            const el = document.getElementById(section);
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            return rect.top <= 120 && rect.bottom >= 120; // avoids flicker under fixed nav
          });
          if (current) setActiveSection(current);
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Route-based highlight
  useEffect(() => {
    if (location.pathname === "/services") setActiveSection("services");
    else if (location.pathname === "/portfolio") setActiveSection("portfolio");
    else if (location.pathname === "/about") setActiveSection("about");
    else if (location.pathname === "/contact") setActiveSection("contact");
    else if (location.pathname !== "/") setActiveSection("home");
  }, [location.pathname]);

  /** ===== Body Scroll Lock (no layout shift) ===== */
  useEffect(() => {
    const { body, documentElement } = document;
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      body.style.overflow = "";
      body.style.paddingRight = "";
    }
    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [isOpen]);

  /** ===== Close menu on route change / desktop resize ===== */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mql.matches) setIsOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  /** ===== A11y: focus trap + Esc ===== */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    setTimeout(() => firstFocusRef.current?.focus(), 10); // focus first actionable

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  /** ===== Handlers ===== */
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

  const scrollToSection = useCallback(
    (sectionId: string) => {
      // If these are dedicated routes, navigate directly
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
    },
    [location.pathname, navigate]
  );

  /** ===== Animations ===== */
  const navDropDuration = shouldReduceMotion ? 0 : 0.6;

  const menuVariants = {
    closed: { opacity: 0, y: -16, transition: { duration: 0.18 } },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        when: "beforeChildren",
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  } as const;

  const itemVariants = {
    closed: { opacity: 0, y: 12 },
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 24 } },
  } as const;

  return (
    <motion.nav
      className={cx(
        "w-full fixed top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg border-b border-orange-500/30"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: navDropDuration, ease: "easeOut" }}
      role="navigation"
      aria-label="Primary"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer group flex items-center"
            onClick={handleLogoClick}
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            aria-label="Go to home"
            role="link"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleLogoClick(e as any)}
          >
            <img
              src={Pixel_Pulse}
              alt="PixelPulse Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-[filter,transform] duration-300 group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.45)]"
              loading="eager"
            />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cx(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group flex items-center gap-2 transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60",
                  activeSection === item.id
                    ? "text-orange-400 bg-orange-500/10 border border-orange-500/20 shadow-[0_0_24px_rgba(249,115,22,0.15)]"
                    : "text-gray-300 hover:text-white hover:bg-orange-500/10"
                )}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.06 }}
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                aria-current={activeSection === item.id ? "page" : undefined}
                title={item.description}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen((s) => !s)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-pressed={isOpen}
              className={cx(
                "w-10 h-10 inline-flex items-center justify-center rounded-lg border transition-all duration-300 transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60",
                isOpen ? "bg-orange-500/20 border-orange-500/40" : "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20"
              )}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            >
              <BurgerIcon isOpen={isOpen} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            className="lg:hidden fixed inset-0 bg-black z-40 flex flex-col min-h-[100dvh] overscroll-contain"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onMouseDown={handleBackgroundClick}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Top Bar (close button) */}
            <div className="flex items-center justify-between px-4 pt-[calc(env(safe-area-inset-top)+8px)] pb-2 border-b border-orange-500/20">
              <button
                onClick={handleLogoClick}
                className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 rounded-lg"
                ref={firstFocusRef}
                aria-label="Go to home"
              >
                <img src={Pixel_Pulse} alt="PixelPulse Logo" className="h-8 w-auto" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg border bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60"
                aria-label="Close menu"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Menu content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const common =
                  "text-2xl font-semibold flex items-center gap-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 rounded-lg px-3 py-2";
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cx(common, isActive ? "text-orange-400 scale-[1.06]" : "text-white hover:text-orange-300")}
                    variants={itemVariants}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                    aria-current={isActive ? "page" : undefined}
                    title={item.description}
                  >
                    {item.icon}
                    {item.label}
                    <ExternalLink size={16} className="opacity-60" aria-hidden="true" />
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Footer CTA */}
            <div className="px-6 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-4 border-t border-orange-500/20 text-center">
              <p className="text-gray-400 text-sm mb-2">Ready to start your project?</p>
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="w-full max-w-xs mx-auto block bg-gradient-to-r from-orange-500 to-red-500 text-black font-bold px-6 py-3 rounded-xl hover:from-orange-400 hover:to-red-400 transition-all duration-300 shadow-[0_8px_24px_rgba(249,115,22,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                ref={lastFocusRef}
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
