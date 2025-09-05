import React, { useEffect, useMemo, useState } from "react";
import { sectionByCategory, PortfolioItem } from "../data/portfolio";
import contentManagementService from "../services/contentManagement";
import { AnimatePresence, motion } from "framer-motion";
import Brochure from "../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/ALMONDS 5.jpg";
import Brochure2 from "../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/ALMONDS 6.jpg";
import Brochure3 from "../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/Box-3.jpg";
import Brochure4 from "../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/Box-4.jpg";
import Brochure5 from "../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/Box-5.jpg";
import Brochure6 from "../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/Box-6.jpg";
import Brochure7 from "../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/Box-7.jpg";
import Brochure8 from "../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/box2.jpg";
import Brochure9 from "../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/Kulfi_packaging (1).jpg";

const PackagingPage: React.FC = () => {
  // Exclude specific items from brochure list
  const excludedSlugs = ["ap-investment", "ashirvad-jewellers", "cake-delight"];
  const excludedTitles = [
    "AP Investment",
    "Ashirvad Jewellers",
    "Cake & Delight",
  ];
  const baseItems: PortfolioItem[] = sectionByCategory.brochure.filter(
    (i) => !excludedSlugs.includes(i.slug) && !excludedTitles.includes(i.title)
  );
  // Extra brochure-style cards (using existing assets) to enrich the page
  const featured: PortfolioItem[] = [
    {
      title: "Almonds",
      subtitle: "Packaging",
      image: Brochure,
      slug: "Almonds-" + Date.now(),
      description:
        "Product packaging design for 'The Nut Sixer' flavored roasted almonds. The pouch features a warm orange and cream color scheme with a cricket theme illustration, highlighting premium flavored roasted almonds (Almond Sizzler).",
    } as any,
    {
      title: "Almonds",
      subtitle: "Packaging",
      image: Brochure2,
      slug: "Almonds-" + Date.now(),
      description:
        "Product packaging design for 'The Nut Sixer' flavored roasted almonds. The pouch features a blue and white color scheme with a cricket theme illustration, emphasizing high-quality flavored roasted almonds (Almond Sizzler).",
    } as any,
    {
      title: "Dplus",
      subtitle: "Packaging",
      image: Brochure3,
      slug: "Dplus-" + Date.now(),
      description:
        "Product packaging design for 'Dplus' Architectural Hardware Fittings. The box features a premium red and black color scheme with a gold accent, showcasing a modern and professional look for hardware fitting products.",
    } as any,
    {
      title: "Dplus",
      subtitle: "Packaging",
      image: Brochure4,
      slug: "Dplus-GoldBlack-" + Date.now(),
    "description": "Premium packaging design for 'Dplus' Architectural Hardware Fittings. The box features a black and gold combination with a bold arrow design, reflecting strength and quality in construction fittings."
    } as any,
    {
      title: "Architectural Hardware Fittings",
    subtitle: "Packaging",
    image: Brochure5,
    slug: "Dplus-RedYellow-" + Date.now(),
    description: "Product packaging for 'Dplus' Architectural Hardware Fittings. The red box with a yellow accent creates a modern and energetic design, emphasizing durability and architectural precision."
    } as any,
    {
      title: "Architectural Hardware Fittings",
    subtitle: "Packaging",
    image: Brochure6,
    slug: "Dplus-CreamRed-" + Date.now(),
    description: "Stylish packaging for 'Dplus' Architectural Hardware Fittings. The cream and red box with geometric accents highlights sophistication and reliability for hardware products."
    } as any,
    {
      title: "Architectural Hardware Fittings",
      subtitle: "Packaging",
      image: Brochure7,
      slug: "Dplus-NavyBlue-" + Date.now(),
      description:
        "Elegant packaging design for 'Dplus' Architectural Hardware Fittings. The navy blue and gold accents on a long rectangular box give a premium and professional look.",
    } as any,
    {
      title: "Architectural Hardware Fittings",
      subtitle: "Packaging",
      image: Brochure8,
      slug: "Dplus-AquaBlue-" + Date.now(),
    description:
      "Fresh packaging design for 'Dplus' Architectural Hardware Fittings. The aqua blue shade with subtle patterns conveys innovation and modernity in hardware solutions.",

    } as any,
    {
      title: "Crunchy Chocobar",
      subtitle: "Ice Cream Packaging",
      image: Brochure9,
      slug: "Aditya-Chocobar-" + Date.now(),
      description:
        "Packaging design for 'Aditya Ice Cream' Crunchy Chocobar. The wrapper features rich chocolate tones with a tempting chocobar visual, accompanied by the tagline 'Big happiness comes in small packs'.",
    } as any,
  ];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customSubtitle, setCustomSubtitle] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [customItems, setCustomItems] = useState<PortfolioItem[]>(() => {
    try {
      const raw = localStorage.getItem("brochure_custom_items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const adminItems = useMemo(() => {
    return contentManagementService
      .getPortfolioItems()
      .filter(i => (i.status === 'active') && String(i.category).toLowerCase() === 'packaging') as unknown as PortfolioItem[];
  }, []);

  const items: PortfolioItem[] = useMemo(() => {
    return [...adminItems as any[], ...featured, ...customItems, ...baseItems];
  }, [adminItems, featured, customItems, baseItems]);

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
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, items.length]);

  const saveCustomItems = (nextItems: PortfolioItem[]) => {
    setCustomItems(nextItems);
    try {
      localStorage.setItem("brochure_custom_items", JSON.stringify(nextItems));
    } catch {}
  };

  const toSlug = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") +
    "-" +
    Date.now();

  const addCustomCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customImage) return;
    const newItem: PortfolioItem = {
      title: customTitle,
      subtitle: customSubtitle || "Custom",
      image: customImage,
      category: "brochure",
      slug: toSlug(customTitle),
    } as any;
    const next = [newItem, ...customItems];
    saveCustomItems(next);
    setCustomOpen(false);
    setCustomTitle("");
    setCustomSubtitle("");
    setCustomImage("");
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
              Brochure Design
            </h1>
            <div className="flex items-center gap-3">
              <a href="/portfolio" className="text-orange-400 underline">
                ← Back
              </a>
              <a
                href="/portfolio/packaging"
                className="text-orange-400 underline"
              >
                View All Packaging
              </a>
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActiveIndex(i);
                }}
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
                  {/* Remove for customs */}
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
                  {(p as any).description && (
                    <div className="text-gray-300 text-sm mt-2 leading-relaxed">
                      {(p as any).description}
                    </div>
                  )}
                  {(p as any).details && Array.isArray((p as any).details) && (
                    <ul className="flex flex-wrap gap-2 mt-3 text-[11px] text-gray-400">
                      {((p as any).details as string[]).map((d, idx) => (
                        <li
                          key={idx}
                          className="px-2 py-0.5 border border-gray-700 rounded"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
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

export default PackagingPage;
