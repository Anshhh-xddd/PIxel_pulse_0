import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sectionByCategory } from '../data/portfolio';
import contentManagementService from '../services/contentManagement';
import { AnimatePresence, motion } from 'framer-motion';

const normalizeCategory = (c?: string) => {
  if (!c) return 'all';
  // Map older/alternative keys to a consistent form
  const map: Record<string, string> = {
    'visiting-card': 'visiting',
    'ui-ux': 'ui-ux',
    '3d-design': '3d-design'
  };
  return (map[c] || c).toLowerCase();
};

const PortfolioCategoryPage: React.FC = () => {
  const { category = 'brochure' } = useParams();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Pull admin-managed items from localStorage and filter by category and active status
  const serviceItems = useMemo(() => {
    const all = contentManagementService.getPortfolioItems();
    const norm = normalizeCategory(category);
    return all.filter(i => (i.status === 'active') && normalizeCategory(i.category) === norm);
  }, [category]);

  // Fallback to legacy static data when no admin-managed content exists for this category
  const legacyItems = (sectionByCategory as any)[category] || [];
  const usingLegacy = serviceItems.length === 0;

  const close = () => setActiveIndex(null);
  const activeListLength = usingLegacy ? legacyItems.length : serviceItems.length;
  const next = () => setActiveIndex((i) => (i === null ? 0 : (i + 1) % activeListLength));
  const prev = () => setActiveIndex((i) => (i === null ? 0 : (i - 1 + activeListLength) % activeListLength));

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
            <h1 className="text-white text-3xl md:text-4xl font-extrabold capitalize">{category} projects</h1>
            <Link to="/portfolio" className="text-orange-400 underline">← Back</Link>
          </div>

          {/* Pinterest-like masonry: multi-column layout with explicit column gap */}
          <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: '1rem' }}>
            {(usingLegacy ? legacyItems : serviceItems).map((p: any, i: number) => {
              const ratios = ['pt-[72%]','pt-[56%]','pt-[100%]','pt-[130%]'];
              const aspect = ratios[i % ratios.length];
              return (
                <figure
                  key={p.id || p.slug || `${p.title}-${i}`}
                  role="button"
                  aria-label={`Open ${p.title}`}
                  tabIndex={0}
                  onClick={() => setActiveIndex(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveIndex(i); }}
                  className="mb-4 md:mb-6 break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-orange-500/40 transition select-none shadow-lg hover:shadow-orange-500/10"
                >
                  <div className={`relative w-full ${aspect}`}>
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="img-fade absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <figcaption className="p-4">
                    <div className="text-white text-lg font-extrabold tracking-tight leading-tight">{p.title}</div>
                    {!usingLegacy && p.description && (
                      <div className="mt-0.5 text-orange-400 text-xs font-semibold uppercase tracking-wide">{p.description}</div>
                    )}
                    {usingLegacy && p.subtitle && (
                      <div className="mt-0.5 text-orange-400 text-xs font-semibold uppercase tracking-wide">{p.subtitle}</div>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {activeIndex !== null && (usingLegacy ? legacyItems[activeIndex] : serviceItems[activeIndex]) && (
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
                  <img src={(usingLegacy ? legacyItems[activeIndex] : serviceItems[activeIndex]).image} alt={(usingLegacy ? legacyItems[activeIndex] : serviceItems[activeIndex]).title} className="w-full h-auto rounded-xl border border-gray-800" />
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-white text-lg font-semibold">{(usingLegacy ? legacyItems[activeIndex] : serviceItems[activeIndex]).title}</div>
                      {usingLegacy ? (
                        <div className="text-orange-400 text-sm">{legacyItems[activeIndex].subtitle}</div>
                      ) : (
                        <div className="text-orange-400 text-sm">{serviceItems[activeIndex].description}</div>
                      )}
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
        </div>
      </main>
    </div>
  );
};

export default PortfolioCategoryPage;


