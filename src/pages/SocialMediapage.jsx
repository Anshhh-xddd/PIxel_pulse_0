import React, { useEffect, useState, useMemo, useCallback } from "react";
import { sectionByCategory, PortfolioItem } from "../data/portfolio";
import contentManagementService from "../services/contentManagement";
import { AnimatePresence, motion } from "framer-motion";

// Static featured assets
import image1 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-1.jpg";
import image2 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-2.jpg";
import image3 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-3.jpg";
import image4 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-4.jpg";
import image8 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-8.jpg";
import image9 from "../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-9.jpg";

const SocialMediaPage: React.FC = () => {
  // ✅ Filtered base items
  const baseItems: PortfolioItem[] = useMemo(
    () =>
      sectionByCategory.logo.filter((i) => {
        const t = (i.title || "").toLowerCase();
        const s = (i.slug || "").toLowerCase();
        return !(
          t.includes("jay khodiyar") ||
          s.includes("jay-khodiyar") ||
          t.includes("rohan") ||
          s.includes("rohans-makeover") ||
          t.includes("logo z") ||
          s.includes("logo-z")
        );
      }),
    []
  );

  // ✅ Static featured data
  const featuredData = [
    {
      image: image1,
      title: "Perfect Associate",
      subtitle: "Corporate Consulting",
    },
    {
      image: image2,
      title: "Flowmex",
      subtitle: "Industrial Solutions",
    },
    {
      image: image3,
      title: "Ashirvad Jewellers",
      subtitle: "Jewellery Brand",
    },
    {
      image: image9,
      title: "Riyal Solar Energy",
      subtitle: "Renewable Energy",
    },
    {
      image: image4,
      title: "Khodiyar Process",
      subtitle: "Manufacturing",
    },
    {
      image: image8,
      title: "Rooohans Make Over",
      subtitle: "Hair & Style",
    },
  ];

  const baseTs = Date.now();
  const featured: PortfolioItem[] = featuredData.map((d, idx) => ({
    title: d.title,
    subtitle: d.subtitle,
    image: d.image,
    category: "logo",
    slug: `logo-feature-${baseTs + idx}`,
    status: "active",
  }));

  // ✅ Admin-managed items from localStorage
  const [adminLogos, setAdminLogos] = useState<PortfolioItem[]>([]);
  useEffect(() => {
    const fetch = () => {
      const latest = contentManagementService
        .getPortfolioItems()
        .filter(
          (i) =>
            i.status === "active" &&
            String(i.category).toLowerCase() === "logo"
        );
      setAdminLogos(latest);
    };
    fetch();

    window.addEventListener("storage", fetch);
    return () => window.removeEventListener("storage", fetch);
  }, []);

  // ✅ Combined items
  const items: PortfolioItem[] = useMemo(
    () => [...adminLogos, ...featured, ...baseItems],
    [adminLogos, featured, baseItems]
  );

  // ✅ Lightbox
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? 0 : (i + 1) % items.length
      ),
    [items.length]
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? 0 : (i - 1 + items.length) % items.length
      ),
    [items.length]
  );

  // ✅ Keyboard support
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
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />

      <main className="relative z-10 pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-white text-3xl md:text-4xl font-extrabold">
              Logo Design
            </h1>
            <a
              href="/portfolio"
              className="text-orange-400 underline hover:text-orange-300"
            >
              ← Back
            </a>
          </div>

          {/* Masonry Grid */}
          <div
            className="columns-1 sm:columns-2 lg:columns-3"
            style={{ columnGap: "1rem" }}
          >
            {items.map((p, i) => (
              <figure
                key={p.slug}
                role="button"
                tabIndex={0}
                aria-label={`Open ${p.title}`}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  setActiveIndex(i)
                }
                className="group cursor-pointer mb-4 md:mb-6 break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-orange-500/40 transition select-none shadow-lg hover:shadow-orange-500/10"
              >
                <div className="relative w-full">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="img-fade block w-full h-auto object-cover"
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
                  <div className="text-gray-400 text-xs font-medium mt-0.5">
                    {p.subtitle}
                  </div>
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

export default SocialMediaPage;
