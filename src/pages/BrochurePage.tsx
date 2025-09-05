import React, { useEffect, useMemo, useState } from 'react';
import { sectionByCategory, PortfolioItem } from '../data/portfolio';
import contentManagementService from '../services/contentManagement';
import { AnimatePresence, motion } from 'framer-motion';


const BrochurePage: React.FC = () => {
  // Exclude specific items from brochure list
  const excludedSlugs = ['ap-investment', 'ashirvad-jewellers', 'cake-delight'];
  const excludedTitles = ['AP Investment', 'Ashirvad Jewellers', 'Cake & Delight'];
  const baseItems: PortfolioItem[] = sectionByCategory.brochure.filter(
    (i) => !excludedSlugs.includes(i.slug) && !excludedTitles.includes(i.title)
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const adminItems = useMemo(() => {
    return contentManagementService
      .getPortfolioItems()
      .filter(i => (i.status === 'active') && String(i.category).toLowerCase() === 'brochure') as unknown as PortfolioItem[];
  }, []);

  const items: PortfolioItem[] = useMemo(() => {
    return [...adminItems as any[], ...baseItems];
  }, [adminItems, baseItems]);

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
            <h1 className="text-white text-3xl md:text-4xl font-extrabold">Brochure Design</h1>
            <div className="flex items-center gap-3">
              <a href="/portfolio" className="text-orange-400 underline">← Back</a>
            </div>
          </div>

          {/* Masonry grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p, i) => (
              <figure
                key={p.slug}
                role="button"
                aria-label={`Open ${p.title}`}
                tabIndex={0}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveIndex(i); }}
                className="mb-4 md:mb-6 break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-orange-500/40 transition select-none shadow-lg hover:shadow-orange-500/10"
              >
                <div className="relative w-full">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="img-fade block w-full h-auto object-cover"
                    onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                </div>
                <figcaption className="p-4">
                  <div className="text-white text-lg font-semibold leading-tight">{p.title}</div>
                  <div className="text-gray-400 text-xs font-medium mt-0.5">{p.subtitle}</div>
                  {(p as any).description && (
                    <div className="text-gray-300 text-sm mt-2 leading-relaxed">{(p as any).description}</div>
                  )}
                  {(p as any).details && Array.isArray((p as any).details) && (
                    <ul className="flex flex-wrap gap-2 mt-3 text-[11px] text-gray-400">
                      {((p as any).details as string[]).map((d, idx) => (
                        <li key={idx} className="px-2 py-0.5 border border-gray-700 rounded">{d}</li>
                      ))}
                    </ul>
                  )}
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

export default BrochurePage;


