import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import {
  heroStats,
  features,
  services,
  processSteps,
  advantages,
  marketHighlights,
  testimonials,
  faqs,
  partnershipHighlights,
  closingCTA
} from '../../data/growInvest';

const GrowInvestDesktop: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b,transparent_60%)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-12">
        {/* Hero */}
        <section className="grid min-h-[80vh] grid-cols-[1.1fr_0.9fr] gap-16 py-24">
          <div className="flex flex-col justify-center space-y-10">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-slate-200">
              Grow Invest
            </span>
            <div className="space-y-6">
              <h1 className="text-6xl font-semibold leading-tight text-white">
                Intelligent wealth management for ambitious leaders
              </h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Grow Invest partners with founders, executives, and families to design resilient portfolios
                that outperform the market while staying aligned with your values.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <button className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3 text-lg font-medium text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-400">
                Start a conversation
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-3 text-lg font-medium text-white/80 transition hover:border-white/30 hover:text-white">
                <PlayCircle className="h-6 w-6" />
                Meet our team
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.35em] text-orange-300">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center">
            <div className="relative w-full rounded-[3rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-12 shadow-2xl">
              <div className="absolute inset-x-8 -top-8 h-40 rounded-3xl bg-gradient-to-r from-orange-500/40 to-pink-500/40 blur-3xl" aria-hidden />
              <div className="relative space-y-10">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-orange-200">Strategy snapshot</p>
                  <p className="mt-3 text-4xl font-semibold text-white">Active + Alternative</p>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {marketHighlights.map((highlight) => (
                    <div key={highlight.title} className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-5">
                      <highlight.icon className="h-6 w-6 text-orange-300" />
                      <p className="text-base font-medium text-white">{highlight.title}</p>
                      <p className="text-sm text-slate-300">{highlight.description}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-orange-500/40 bg-gradient-to-r from-orange-500/20 to-rose-500/20 p-6">
                  <p className="text-sm uppercase tracking-[0.4em] text-orange-200">In Focus</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Q3 Market Outlook</p>
                  <p className="mt-3 text-sm text-slate-200">
                    Diversifying fixed income with sustainable infrastructure debt and capturing AI-led growth in public equities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-12 py-20">
          <div className="max-w-4xl space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-orange-200">Why Grow Invest</p>
            <h2 className="text-4xl font-semibold text-white">Designed for growth, grounded in discipline</h2>
            <p className="text-lg text-slate-300">
              From high-growth entrepreneurs to multigenerational families, we provide clarity, conviction, and
              measurable outcomes.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-white/5 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-orange-400/40">
                <feature.icon className="h-10 w-10 text-orange-300" />
                <h3 className="mt-6 text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-base text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950 p-16 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.7)]">
          <div className="flex items-end justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.4em] text-orange-200">What we do</p>
              <h2 className="text-4xl font-semibold text-white">Holistic advisory for every chapter of your wealth journey</h2>
            </div>
            <div className="text-right text-sm text-slate-300">
              <p>Dedicated advisors • Institutional research • Transparent reporting</p>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-10">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-white/[0.04] p-8">
                <service.icon className="h-10 w-10 text-orange-300" />
                <div>
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{service.description}</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-200">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="grid grid-cols-[0.8fr_1.2fr] gap-12 py-24">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-orange-200">Our process</p>
            <h2 className="text-4xl font-semibold text-white">Collaborative at every milestone</h2>
            <p className="text-lg text-slate-300">
              Stay informed and empowered with structured reviews, real-time dashboards, and swift access to
              specialists.
            </p>
            <div className="space-y-5">
              {advantages.map((advantage) => (
                <div key={advantage.title} className="rounded-2xl border border-white/5 bg-white/5 p-5">
                  <h3 className="text-xl font-semibold text-white">{advantage.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.title} className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/20 opacity-0 transition group-hover:opacity-100" aria-hidden />
                <div className="relative">
                  <div className="flex items-center justify-between text-sm text-orange-200">
                    <span>Phase {index + 1}</span>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="grid grid-cols-[1fr_1fr] gap-12 rounded-[3rem] border border-white/10 bg-white/[0.04] p-16">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-orange-200">Client voices</p>
            <h2 className="text-4xl font-semibold text-white">Trusted partners across industries</h2>
            <p className="text-lg text-slate-300">
              From technology scale-ups to legacy enterprises, our clients count on us for responsive, proactive
              support.
            </p>
          </div>
          <div className="grid gap-6">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.author} className="rounded-3xl border border-white/5 bg-slate-900/80 p-8">
                <blockquote className="text-lg text-slate-200">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-6 text-sm text-slate-400">
                  <span className="font-medium text-white">{testimonial.author}</span> · {testimonial.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Partnership */}
        <section className="py-24">
          <div className="flex items-start gap-20">
            <div className="w-1/3 space-y-4">
              <p className="text-sm uppercase tracking-[0.4em] text-orange-200">Beyond advisory</p>
              <h2 className="text-4xl font-semibold text-white">Partnerships built for longevity</h2>
              <p className="text-lg text-slate-300">
                We integrate with your family office, finance team, and legal partners to deliver cohesive financial
                leadership.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-8">
              {partnershipHighlights.map((highlight) => (
                <div key={highlight.title} className="rounded-3xl border border-white/5 bg-white/5 p-6">
                  <highlight.icon className="h-8 w-8 text-orange-300" />
                  <h3 className="mt-5 text-xl font-semibold text-white">{highlight.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="rounded-[3rem] border border-white/10 bg-slate-900/70 p-16">
          <div className="grid grid-cols-[0.8fr_1.2fr] gap-12">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.4em] text-orange-200">FAQs</p>
              <h2 className="text-4xl font-semibold text-white">We make complex decisions simple</h2>
              <p className="text-lg text-slate-300">
                Transparent communication ensures you know exactly how your capital is performing and why strategic
                shifts occur.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-white/5 bg-white/5 p-6">
                  <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                  <p className="mt-3 text-sm text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative my-24 rounded-[3rem] border border-orange-500/40 bg-gradient-to-br from-orange-500/20 via-rose-500/10 to-purple-500/20 p-16 text-white">
          <div className="absolute inset-0 -z-10 blur-3xl" aria-hidden />
          <div className="flex items-center justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl font-semibold">{closingCTA.heading}</h2>
              <p className="text-lg text-orange-100/80">{closingCTA.subheading}</p>
            </div>
            <div className="flex gap-4">
              <button className="rounded-full bg-white px-7 py-3 text-lg font-semibold text-slate-900 transition hover:-translate-y-0.5">
                {closingCTA.primaryLabel}
              </button>
              <button className="rounded-full border border-white/60 px-7 py-3 text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:border-white">
                {closingCTA.secondaryLabel}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GrowInvestDesktop;
