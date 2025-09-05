import React, { useEffect, useMemo, useState } from 'react';
import { sectionByCategory, PortfolioItem } from '../data/portfolio';
import contentManagementService from '../services/contentManagement';
import { AnimatePresence, motion } from 'framer-motion';
import image1 from '../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-1.jpg';
import image2 from '../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-2.jpg';
import image3 from '../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-3.jpg';
import image4 from '../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-4.jpg';
import image9 from '../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-9.jpg';
import image8 from '../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-8.jpg'

import { title } from 'framer-motion/client';

const LogoPage: React.FC = () => {
  const baseItems: PortfolioItem[] = sectionByCategory.logo.filter(
    (i) => {
      const t = (i.title || '').toLowerCase();
      const s = (i.slug || '').toLowerCase();
      return !(
        t.includes('jay khodiyar') ||
        t.includes('khodiyar process') ||
        s.includes('jay-khodiyar') ||
        t.includes("rohan's makeover") ||
        s.includes('rohans-makeover') ||
        t.includes('logo z') ||
        s.includes('logo-z')
      );
    }
  );
  // Extra featured logo cards (using existing assets)
  const featuredData = [
    {
      image: image1,
      title: 'Perfect Associate',
      subtitle: 'Corporate Consulting',
      description: 'A modern, professional logo for Perfect Associate, reflecting trust and expertise.',
    },
    {
      image: image2,
      title: 'Flowmex',
      subtitle: 'Industrial Solutions',
      description: 'Dynamic and fluid logo design for Flowmex, symbolizing innovation and movement.',
    },
    {
      image: image3,
      title: 'Ashirvad Jewellers',
      subtitle: 'Jewellery Brand',
      description: 'Elegant and luxurious logo for Ashirvad Jewellers, capturing the essence of fine craftsmanship.',
    },
    {
      image: image9,
      title: 'Riyal Solar Energy',
      subtitle: 'Renewable Energy',
      description: 'Clean and energetic logo for Riyal Solar Energy, symbolizing sustainability and power.',
    },
    {
      image: image4,
      title: 'Khodiyar Process',
      subtitle: 'Manufacturing',
      description: 'A bold and industrial logo for Khodiyar Process, representing strength and reliability.',
    },
    {
      image: image8,
      title: 'rooohans make over',
      subtitle: 'Hair & style',
      description: 'Your destination for stunning transformations, expert styling, and personalized hair care.',
    },
    // {
    //   image: image8,
    //   title: 'Roohans make me up!!',
    //   subtitle: 'Saloon',
    //   description: 'Your destination for stunning transformations, expert styling, and personalized hair care.',
    // },
    // {
    //   image: image9,
    //   title: 'Roohans make me over',
    //   Subtitle: 'hair and make over',
    //   Description:'A stunning and elegant logo for Roohan's Makeover, perfectly capturing the essence of beauty and transformation.'
    // },
    // {
    //   image: image6,
    //   title: 'Meenakshi Lifestyle',
    //   subtitle: 'Fashion & Lifestyle',
    //   description: 'Chic and stylish logo for Meenakshi Lifestyle, embodying elegance and modernity.',
    // },
    // {
    //   image: image7,
    //   title: 'Radhe ',
    //   subtitle: 'Apparel Brand',
    //   description: 'Trendy and fashionable logo for Radhe Fashion, appealing to contemporary tastes.',
    // },
    // {
    //   image: rohansMakeover,
    //   title: "Roohan's Makeover",
    //   subtitle: 'Beauty & Makeover',
    //   description: "A stunning and elegant logo for Roohan's Makeover, perfectly capturing the essence of beauty and transformation.",
    // },

   
  ];
  const baseTs = Date.now();
  const featured: PortfolioItem[] = featuredData.map((d: any, idx) => ({
    title: d.title,
    subtitle: d.subtitle || '',
    image: d.image as any,
    category: 'logo',
    slug: `logo-feature-${baseTs + idx}`
  } as any)).filter((i) => {
    const t = (i.title || '').toLowerCase();
    const s = (i.slug || '').toLowerCase();
    return !(
      t.includes("roohan") ||
      t.includes('logo z') ||
      s.includes('logo-z')
    );
  });

  // Admin-managed items (active Logos) from localStorage
  const adminLogos = useMemo(() => {
    return contentManagementService
      .getPortfolioItems()
      .filter((i) => (i.status === 'active') && (String(i.category).toLowerCase() === 'logo'));
  }, []);

  // Compose list: show admin items first (so new content appears immediately), then existing base items
  const items: any[] = useMemo(() => ([...adminLogos, ...featured, ...baseItems]), [adminLogos, featured, baseItems]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((i) => (i === null ? 0 : (i + 1) % items.length));
  const prev = () => setActiveIndex((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, items.length]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

      <main className="relative z-10 pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold">Logo Design</h1>
            <a href="/portfolio" className="text-orange-400 underline">← Back</a>
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: '1rem' }}>
            {items.map((p, i) => (
              <figure
                key={p.slug}
                role="button"
                aria-label={`Open ${p.title}`}
                tabIndex={0}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveIndex(i); }}
                className="group cursor-pointer mb-4 md:mb-6 break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-orange-500/40 transition select-none shadow-lg hover:shadow-orange-500/10"
              >
                {(() => {
                  const isJayKhodiyar = (p.title || '').toLowerCase().includes('jay khodiyar') || (p.slug || '').includes('jay-khodiyar');
                  return (
                    <div className={`relative w-full ${isJayKhodiyar ? 'bg-black' : ''}`}>
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        className={`img-fade block w-full h-auto ${isJayKhodiyar ? 'object-contain' : 'object-cover'}`}
                        onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  );
                })()}
                <figcaption className="p-4">
                  <div className="text-white text-lg font-semibold leading-tight">{p.title}</div>
                  <div className="text-gray-400 text-xs font-medium mt-0.5">{p.subtitle}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {activeIndex !== null && items[activeIndex] && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={close}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={items[activeIndex].image} alt={items[activeIndex].title} className="w-full h-auto rounded-xl border border-gray-800" />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-white text-lg font-semibold">{items[activeIndex].title}</div>
                    <div className="text-orange-400 text-sm">{items[activeIndex].subtitle}</div>
                  </div>
                  <div className="flex gap-2">
                    <button aria-label="Previous" onClick={prev} className="px-3 py-2 rounded-lg border border-gray-700 text-white hover:border-orange-500/50">Prev</button>
                    <button aria-label="Next" onClick={next} className="px-3 py-2 rounded-lg border border-gray-700 text-white hover:border-orange-500/50">Next</button>
                    <button aria-label="Close" onClick={close} className="px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-black font-semibold">Close</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LogoPage;


