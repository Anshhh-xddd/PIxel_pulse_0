import React, { useEffect, useMemo, useState, useCallback } from "react";
import contentManagementService from "../services/contentManagement";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Define type for Portfolio Item
interface PortfolioItem {
  slug: string;
  title: string;
  subtitle?: string;
  image: string;
  status: "active" | "inactive";
  category: string;
}

const LogoPage: React.FC = () => {
  // ✅ Fetch and filter "logo" items
  const items: PortfolioItem[] = useMemo(() => {
    return contentManagementService
      .getPortfolioItems()
      .filter(
        (i: PortfolioItem) =>
          i.status === "active" &&
          String(i.category).toLowerCase() === "logo"
      );
  }, []);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ✅ Lightbox controls
  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? 0 : (i + 1) % (items.length || 1)
      ),
    [items.length]
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? 0 : (i - 1 + (items.length || 1)) % (items.length || 1)
      ),
    [items.length]
  );

  // ✅ Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, next, prev]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

      <main className="relative z-10 pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold">
              Logo Designs
            </h1>
            <a href="/portfolio" className="text-orange-400 underline">
              ← Back
            </a>
          </div>

          {/* Masonry grid */}
          <div
            className="columns-1 sm:columns-2 lg:columns-3"
            style={{ columnGap: "1rem" }}
          >
            {items.map((p, i) => (
              <figure
                key={p.slug}
                role="button"
                aria-label={`Open ${p.title}`}
                tabIndex={0}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActiveIndex(i);
                }}
                className="group cursor-pointer mb-4 md:mb-6 break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-orange-500/40 transition select-none shadow-lg hover:shadow-orange-500/10"
              >
                <div className="relative w-full">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="img-fade block w-full h-auto object-contain"
                    onLoad={(e) =>
                      e.currentTarget.classList.add("is-loaded")
                    }
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <figcaption className="p-4">
                  <div className="text-white text-lg font-semibold leading-tight">
                    {p.title}
                  </div>
                  {p.subtitle && (
                    <div className="text-gray-400 text-xs font-medium mt-0.5">
                      {p.subtitle}
                    </div>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Empty state */}
          {items.length === 0 && (
            <div className="text-center text-gray-400 mt-16">
              No logos available. Please add from Admin Panel.
            </div>
          )}
        </div>

        {/* Lightbox modal */}
        <AnimatePresence>
          {activeIndex !== null && items[activeIndex] && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
            >
              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {/* Prev button */}
              <button
                onClick={prev}
                className="absolute left-4 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next button */}
              <button
                onClick={next}
                className="absolute right-4 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-5xl w-full"
              >
                <img
                  src={items[activeIndex].image}
                  alt={items[activeIndex].title}
                  className="w-full h-auto rounded-xl border border-gray-800 shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <div className="text-white text-lg font-semibold">
                    {items[activeIndex].title}
                  </div>
                  {items[activeIndex].subtitle && (
                    <div className="text-orange-400 text-sm">
                      {items[activeIndex].subtitle}
                    </div>
                  )}
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
