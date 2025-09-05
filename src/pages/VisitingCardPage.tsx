import React, { useEffect, useMemo, useState } from 'react';
import { PortfolioItem } from '../data/portfolio';
import contentManagementService from '../services/contentManagement';
import { AnimatePresence, motion } from 'framer-motion';

const VisitingCardPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [customImage, setCustomImage] = useState('');
  const [customItems, setCustomItems] = useState<PortfolioItem[]>(() => {
    try {
      const raw = localStorage.getItem('visiting_custom_items');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // ✅ Only fetch visiting cards from Admin Panel
  const adminItems = useMemo(() => {
    return contentManagementService
      .getPortfolioItems()
      .filter(
        (i) =>
          i.status === 'active' &&
          (String(i.category).toLowerCase() === 'visiting' ||
            String(i.category).toLowerCase() === 'visiting-card')
      ) as PortfolioItem[];
  }, []);

  // ✅ Combine Admin + Custom items only
  const items: PortfolioItem[] = useMemo(() => {
    return [...adminItems, ...customItems];
  }, [adminItems, customItems]);

  const close = () => setActiveIndex(null);
  const next = () =>
    setActiveIndex((i) => (i === null ? 0 : (i + 1) % items.length));
  const prev = () =>
    setActiveIndex((i) =>
      i === null ? 0 : (i - 1 + items.length) % items.length
    );

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

  const saveCustomItems = (nextItems: PortfolioItem[]) => {
    setCustomItems(nextItems);
    try {
      localStorage.setItem('visiting_custom_items', JSON.stringify(nextItems));
    } catch {}
  };

  const toSlug = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') +
    '-' +
    Date.now();

  const addCustomCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customImage) return;
    const newItem: PortfolioItem = {
      title: customTitle,
      subtitle: customSubtitle || 'Custom',
      image: customImage,
      category: 'visiting',
      slug: toSlug(customTitle),
    } as any;
    const next = [newItem, ...customItems];
    saveCustomItems(next);
    setCustomOpen(false);
    setCustomTitle('');
    setCustomSubtitle('');
    setCustomImage('');
  };

  const removeCustom = (slug: string) => {
    const next = customItems.filter((i) => i.slug !== slug);
    saveCustomItems(next);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

      <main className="relative z-10 pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold">
              Visiting Card
            </h1>
            <a href="/portfolio" className="text-orange-400 underline">
              ← Back
            </a>
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveIndex(i);
                }}
                className="group mb-4 md:mb-6 break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-orange-500/40 transition select-none shadow-lg hover:shadow-orange-500/10"
              >
                <div className="relative w-full">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="img-fade block w-full h-auto object-cover"
                    onLoad={(e) =>
                      e.currentTarget.classList.add('is-loaded')
                    }
                  />
                  {customItems.find((ci) => ci.slug === p.slug) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustom(p.slug);
                      }}
                      className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-black/70 text-white border border-gray-700 hover:border-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <figcaption className="p-4">
                  <div className="text-white text-lg font-semibold leading-tight">
                    {p.title}
                  </div>
                  <div className="text-gray-400 text-xs font-medium mt-0.5">
                    {p.subtitle}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center text-gray-400 mt-16">
              No visiting cards available. Please add from Admin Panel.
            </div>
          )}
        </div>

        {/* Add Custom Modal */}
        <AnimatePresence>
          {customOpen && (
            <motion.div
              key="custom-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setCustomOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/60 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-white text-xl font-semibold mb-4">
                  Add custom card
                </div>
                <form onSubmit={addCustomCard} className="space-y-3">
                  <div>
                    <label
                      className="block text-sm text-gray-300 mb-1"
                      htmlFor="customTitle"
                    >
                      Title
                    </label>
                    <input
                      id="customTitle"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="w-full bg-black/40 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm text-gray-300 mb-1"
                      htmlFor="customSubtitle"
                    >
                      Subtitle
                    </label>
                    <input
                      id="customSubtitle"
                      value={customSubtitle}
                      onChange={(e) => setCustomSubtitle(e.target.value)}
                      className="w-full bg-black/40 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm text-gray-300 mb-1"
                      htmlFor="customImage"
                    >
                      Image URL
                    </label>
                    <input
                      id="customImage"
                      type="url"
                      value={customImage}
                      onChange={(e) => setCustomImage(e.target.value)}
                      className="w-full bg-black/40 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-orange-500 outline-none"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setCustomOpen(false)}
                      className="px-3 py-2 rounded-lg border border-gray-700 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-black font-semibold"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                <img
                  src={items[activeIndex].image}
                  alt={items[activeIndex].title}
                  className="w-full h-auto rounded-xl border border-gray-800"
                />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-white text-lg font-semibold">
                      {items[activeIndex].title}
                    </div>
                    <div className="text-orange-400 text-sm">
                      {items[activeIndex].subtitle}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      aria-label="Previous"
                      onClick={prev}
                      className="px-3 py-2 rounded-lg border border-gray-700 text-white hover:border-orange-500/50"
                    >
                      Prev
                    </button>
                    <button
                      aria-label="Next"
                      onClick={next}
                      className="px-3 py-2 rounded-lg border border-gray-700 text-white hover:border-orange-500/50"
                    >
                      Next
                    </button>
                    <button
                      aria-label="Close"
                      onClick={close}
                      className="px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-black font-semibold"
                    >
                      Close
                    </button>
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

export default VisitingCardPage;
