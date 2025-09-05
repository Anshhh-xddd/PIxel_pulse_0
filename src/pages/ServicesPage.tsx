import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { servicesData } from "../data/services";
import {
  SkipperCard,
  SkipperCardContent,
  SkipperCardDescription,
  SkipperCardFooter,
  SkipperCardHeader,
  SkipperCardTitle,
} from "../components/ui/SkipperCard";

// ----------------------
// Types & Helpers
// ----------------------
interface Service {
  icon?: React.ReactNode;
  title: string;
  description: string;
  points: string[];
  status?: "active" | "inactive";
  type?: string;
}

// Safely fetch dynamic services from localStorage
const getDynamicServices = (): Service[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("pixel_pulse_content_items");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item: any) => item.type === "service" && item.status === "active"
      )
      .map(mapToServiceShape);
  } catch {
    return [];
  }
};

// Map raw data → Service
const mapToServiceShape = (svc: any): Service => ({
  icon: svc.icon || null,
  title: svc.title || "Untitled Service",
  description: svc.description || "",
  points: Array.isArray(svc.features)
    ? svc.features
    : Array.isArray(svc.points)
    ? svc.points
    : [],
  status: svc.status || "active",
  type: svc.type || "service",
});

// Static services fallback
const defaultServices: Service[] = servicesData.map(mapToServiceShape);

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ----------------------
// Component
// ----------------------
const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(defaultServices);

  useEffect(() => {
    const dynamic = getDynamicServices();
    if (dynamic.length > 0) setServices(dynamic);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />

      <main className="relative z-10 pt-24 md:pt-28 pb-20">
        {/* Hero Section */}
        <section className="pb-10 md:pb-14 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              We Build Brands That Think, Learn, and Evolve.
            </motion.h1>
            <motion.p
              className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              From strategy to execution—across identity, digital products,
              motion, and growth—we engineer systems that move your brand
              forward.
            </motion.p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" aria-labelledby="services-heading" className="pb-14 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-8">
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-orange-400/90 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
                Capabilities
              </span>
              <h2
                id="services-heading"
                className="mt-3 text-white text-3xl md:text-4xl font-bold"
              >
                What We Deliver
              </h2>
              <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
                From strategy to systems and execution—scalable across brand and product.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {services.map((svc, idx) => {
                const isCore = /Brand Strategy|Visual Identity|Website|UI\/UX/i.test(svc.title);
                const badge = isCore ? "Core" : "Extended";

                return (
                  <motion.div key={idx} variants={item} whileHover={{ y: -6 }} className="group">
                    <SkipperCard>
                      <SkipperCardHeader>
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="relative w-12 h-12">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-orange-500/20 to-red-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-12 h-12 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center ring-1 ring-orange-500/20 group-hover:ring-orange-500/40 transition">
                              {svc.icon || <Check className="w-5 h-5" />}
                            </div>
                          </div>

                          {/* Title + Badge + Description */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <SkipperCardTitle>{svc.title}</SkipperCardTitle>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                  isCore
                                    ? "border-orange-500/40 text-orange-400 bg-orange-500/10"
                                    : "border-gray-600 text-gray-300 bg-white/5"
                                }`}
                              >
                                {badge}
                              </span>
                            </div>
                            <SkipperCardDescription>
                              {svc.description}
                            </SkipperCardDescription>
                          </div>
                        </div>
                      </SkipperCardHeader>

                      <SkipperCardContent>
                        <ul className="space-y-2">
                          {svc.points.map((p, i) => (
                            <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-orange-400" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </SkipperCardContent>
                      <SkipperCardFooter />
                    </SkipperCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="pb-14 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-8">
              <h2 className="text-white text-3xl md:text-4xl font-bold">How We Work</h2>
              <p className="text-gray-300 mt-2">A clear path from idea to launch.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { t: "Discover", d: "Audit, research, and align on goals and constraints." },
                { t: "Define", d: "Craft strategy, principles, and success metrics." },
                { t: "Design", d: "Build identity, systems, and experience design." },
                { t: "Deploy", d: "Develop, hand off, launch, and iterate." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
                >
                  <div className="text-orange-500 font-bold">{String(i + 1).padStart(2, "0")}</div>
                  <div className="text-white text-xl font-semibold mt-1">{step.t}</div>
                  <div className="text-gray-300 mt-2 text-sm">{step.d}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-14 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-8">
              <h2 className="text-white text-3xl md:text-4xl font-bold">FAQs</h2>
              <p className="text-gray-300 mt-2">Quick answers to common questions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: "How do we get started?", a: "Begin with a discovery call to align on goals, scope, and timing." },
                { q: "Do you offer custom scopes?", a: "Absolutely—every engagement is tailored to outcomes, not just deliverables." },
                { q: "Can you work with our team?", a: "Yes! Collaboration with your team’s context helps us move faster and smarter." },
                { q: "What does success look like?", a: "Consistency, conversion, adoption, and long-term brand equity." },
              ].map((f, i) => (
                <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                  <div className="text-white font-semibold text-lg">{f.q}</div>
                  <div className="text-gray-300 mt-2 text-sm">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-gray-900/60 to-black/80 p-8 md:p-10">
              <h3 className="text-white text-3xl md:text-4xl font-bold mb-3">
                Ready to build something strong?
              </h3>
              <p className="text-gray-300 mb-6">
                Tell us your goals—brand, product, or launch—and we’ll propose a roadmap.
              </p>
              <a
                href="https://wa.me/919512294700"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-black font-semibold py-3 px-6 hover:from-orange-400 hover:to-red-400 transition-colors"
              >
                Talk to us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServicesPage;
