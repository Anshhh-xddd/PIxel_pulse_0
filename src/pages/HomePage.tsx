import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import MarqueeSlider from '../components/MarqueeSlider';
import PortfolioCTA from '../components/PortfolioCTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <MarqueeSlider />
      <PortfolioCTA />
      <About />
      <Contact />
    </>
  );
};

export default HomePage; 