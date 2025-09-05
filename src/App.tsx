import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import BrochurePage from './pages/BrochurePage';
import HoldingPage from './pages/HoldingPage';
import LogoPage from './pages/LogoPage';
import PackagingPage from './pages/PackagingPage';
import VisitingCardPage from './pages/VisitingCardPage';
// Removed PortfolioDetailPage
import AboutPage from './pages/AboutPage';
import PortfolioCategoryPage from './pages/PortfolioCategoryPage';
import AdminStatsPage from './pages/AdminStatsPage';
import AdminPanel from './pages/AdminPanel';

function ScrollToSectionOnRouteChange() {
  const location = useLocation();
  React.useEffect(() => {
    const state = (location.state as any) || {};
    if (state.scrollTo) {
      const el = document.getElementById(state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    } else {
      // No specific section requested: ensure each route change starts at the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  const handleLoadingFinish = () => {
    setLoading(false);
  };

  if (loading) {
    return <Loader onFinish={handleLoadingFinish} />;
  }

  const location = useLocation();
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />
      <ScrollToSectionOnRouteChange />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/brochure" element={<BrochurePage />} />
          <Route path="/portfolio/holding" element={<HoldingPage />} />
          <Route path="/portfolio/logo" element={<LogoPage />} />
          <Route path="/portfolio/packaging" element={<PackagingPage />} />
          <Route path="/portfolio/visiting-card" element={<VisitingCardPage />} />
          <Route path="/portfolio/category/:category" element={<PortfolioCategoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin-stats" element={<AdminStatsPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;