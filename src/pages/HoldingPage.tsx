import React, { useEffect, useMemo, useState } from 'react';
import { sectionByCategory, PortfolioItem } from '../data/portfolio';
import contentManagementService from '../services/contentManagement';
import { AnimatePresence, motion } from 'framer-motion';
import image1 from '../Assets/Hordings-20250821T104541Z-1-001/Hordings/1-1.jpg';
import image2 from '../Assets/Hordings-20250821T104541Z-1-001/Hordings/1-2.jpg';
import image3 from '../Assets/Hordings-20250821T104541Z-1-001/Hordings/1-3.jpg';
import image4 from '../Assets/Hordings-20250821T104541Z-1-001/Hordings/1-4.jpg';
// import image5 from '../Assets/Hordings-20250821T104541Z-1-001/Hordings/Free Billboard Mockup PSD.jpg';
// import image6 from '../Assets/Hordings-20250821T104541Z-1-001/Hordings/Free Parking Lot Billboard Mockup PSD.jpg';
// import image7 from '../Assets/Hordings-20250821T104541Z-1-001/Hordings/Billboard Mockup with Large Size.jpg';


const HoldingPage: React.FC = () => {
  // Exclude specific holding cards per request
  const excludedSlugs = ['creatolive', 'donzel-makeover', 'duplex-engineered', 'card-to-remove'];
  const excludedTitles = ['Creatolive', 'Donzel Makeover', 'Duplex Engineered', 'Card to Remove'];
  type HoldingItem = PortfolioItem & {
    compositeImages?: string[];
    lightboxImage?: string;
  };

  const baseItems: HoldingItem[] = useMemo(
    () =>
      sectionByCategory.holding.filter(
        (i) =>
          !excludedSlugs.includes(i.slug) &&
          !excludedTitles.includes(i.title) &&
          !i.title.toLowerCase().includes('ashirvad jewellers')
      ),
    []
  );
  // Featured extras to enrich holding page (unique slugs, clearer titles)
  const featuredData = [
    { image: image1, title: 'Ashirvad Jewellers – Billboard 1', subtitle: 'Billboard ' },
    { image: image2, title: 'Ashirvad Jewellers – Hoarding 2', subtitle: 'Billboard ' },
    { image: image3, title: 'Ashirvad Jewellers – Hoarding 3', subtitle: 'Billboard ' },
    { image: image4, title: 'Ashirvad Jewellers – Hoarding 4', subtitle: 'Billboard ' },
    // { image: image5, title: 'Billboard Mockup – Concept 5', subtitle: 'Billboard / Outdoor' },
    // { image: image6, title: 'Parking Lot Billboard – Concept 6', subtitle: 'Billboard / Outdoor' },
  ];
  const baseTs = Date.now();
  const featured: HoldingItem[] = featuredData.map((d, idx) => ({
    title: d.title,
    subtitle: d.subtitle,
    image: d.image as string,
    category: 'holding',
    slug: `holding-feature-${baseTs + idx}`,
  }));

  const [customItems] = useState<HoldingItem[]>(() => {
    try {
      const raw = localStorage.getItem('holding_custom_items');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const adminItems = useMemo(() => {
    return contentManagementService
      .getPortfolioItems()
      .filter(i => (i.status === 'active') && String(i.category).toLowerCase() === 'holding') as unknown as HoldingItem[];
  }, []);

  const items: HoldingItem[] = useMemo(() => {
    // Admin first so new content shows immediately, then featured, then customs, then defaults
    return [...adminItems as any[], ...featured, ...customItems.slice(0, 3), ...baseItems];
  }, [adminItems, featured, customItems, baseItems]);

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

  // No adding or editing on holding page per request

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

      <main className="relative z-10 pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold">Holding Design</h1>
            <a href="/portfolio" className="text-orange-400 underline">← Back</a>
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem]">
            {items.map((p: HoldingItem, i: number) => (
              <figure
                key={p.slug}
                role="button"
                aria-label={`Open ${p.title}`}
                tabIndex={0}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveIndex(i); }}
                className="group cursor-pointer mb-4 md:mb-6 break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-orange-500/40 transition select-none shadow-lg hover:shadow-orange-500/10"
              >
                <div className="relative w-full">
                  {p.compositeImages && p.compositeImages.length === 2 ? (
                    <div className="grid grid-cols-2 gap-1">
                      <img src={p.compositeImages[0]} alt={`${p.title} A`} loading="lazy" decoding="async" className="block w-full h-auto object-cover" />
                      <img src={p.compositeImages[1]} alt={`${p.title} B`} loading="lazy" decoding="async" className="block w-full h-auto object-cover" />
                    </div>
                  ) : (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="img-fade block w-full h-auto object-cover"
                      onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
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
                <img src={(items[activeIndex] as HoldingItem).lightboxImage || items[activeIndex].image} alt={items[activeIndex].title} className="w-full h-auto rounded-xl border border-gray-800" />
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

export default HoldingPage;


