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

const GrowInvestMobile: React.FC = () => {
  return (
    <div className="space-y-16 bg-slate-950 px-6 pb-20 pt-16 text-slate-100">
      {/* Hero */}
      <section className="space-y-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-slate-200">
          Grow Invest
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold leading-tight text-white">
            Intelligent wealth management for ambitious leaders
          </h1>
          <p className="text-base text-slate-300">
            Grow Invest partners with founders, executives, and families to design resilient portfolios aligned with your ambitions.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button className="group inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-400">
            Start a conversation
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 px-6 py-3 text-base font-semibold text-white/80 transition hover:border-white/30 hover:text-white">
            <PlayCircle className="h-6 w-6" />
            Meet our team
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/5 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-orange-300">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
              <p className="mt-2 text-xs text-slate-300">{stat.description}</p>
            </div>
          ))}
        </div>
        <div className="space-y-5 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Strategy snapshot</p>
            <p className="mt-2 text-2xl font-semibold text-white">Active + Alternative</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {marketHighlights.map((highlight) => (
              <div key={highlight.title} className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-white/5 p-4">
                <highlight.icon className="h-6 w-6 text-orange-300" />
                <p className="text-base font-medium text-white">{highlight.title}</p>
                <p className="text-sm text-slate-300">{highlight.description}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-orange-500/40 bg-gradient-to-r from-orange-500/20 to-rose-500/20 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-orange-200">In Focus</p>
            <p className="mt-2 text-xl font-semibold text-white">Q3 Market Outlook</p>
            <p className="mt-2 text-sm text-slate-200">
              Diversifying fixed income with sustainable infrastructure debt and capturing AI-led growth in public equities.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Why Grow Invest</p>
          <h2 className="text-3xl font-semibold text-white">Designed for growth, grounded in discipline</h2>
          <p className="text-base text-slate-300">
            We provide clarity, conviction, and measurable outcomes for every stage of your wealth journey.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-white/5 bg-white/5 p-6">
              <feature.icon className="h-8 w-8 text-orange-300" />
              <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="space-y-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-900 to-slate-950 p-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-orange-200">What we do</p>
          <h2 className="text-3xl font-semibold text-white">Holistic advisory for your ambitions</h2>
          <p className="text-base text-slate-300">
            Dedicated advisors, institutional research, and transparent reporting at your fingertips.
          </p>
        </div>
        <div className="space-y-6">
          {services.map((service) => (
            <div key={service.title} className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 p-6">
              <service.icon className="h-9 w-9 text-orange-300" />
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
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Our process</p>
          <h2 className="text-3xl font-semibold text-white">Collaborative at every milestone</h2>
          <p className="text-base text-slate-300">
            Stay informed and empowered with structured reviews, real-time dashboards, and swift access to specialists.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {processSteps.map((step, index) => (
            <div key={step.title} className="group rounded-3xl border border-white/5 bg-white/5 p-6">
              <div className="flex items-center justify-between text-xs text-orange-200">
                <span>Phase {index + 1}</span>
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {advantages.map((advantage) => (
            <div key={advantage.title} className="rounded-3xl border border-white/5 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">{advantage.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{advantage.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-6 rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Client voices</p>
          <h2 className="text-3xl font-semibold text-white">Trusted partners across industries</h2>
          <p className="text-base text-slate-300">
            From technology scale-ups to legacy enterprises, our clients count on us for responsive, proactive support.
          </p>
        </div>
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.author} className="rounded-3xl border border-white/5 bg-slate-900/80 p-6">
              <blockquote className="text-base text-slate-200">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-4 text-xs text-slate-400">
                <span className="font-medium text-white">{testimonial.author}</span> · {testimonial.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Partnerships */}
      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Beyond advisory</p>
          <h2 className="text-3xl font-semibold text-white">Partnerships built for longevity</h2>
          <p className="text-base text-slate-300">
            We integrate with your family office, finance team, and legal partners to deliver cohesive financial leadership.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {partnershipHighlights.map((highlight) => (
            <div key={highlight.title} className="rounded-3xl border border-white/5 bg-white/5 p-5">
              <highlight.icon className="h-7 w-7 text-orange-300" />
              <h3 className="mt-4 text-lg font-semibold text-white">{highlight.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-5 rounded-[2.5rem] border border-white/10 bg-slate-900/70 p-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-orange-200">FAQs</p>
          <h2 className="text-3xl font-semibold text-white">We make complex decisions simple</h2>
          <p className="text-base text-slate-300">
            Transparent communication ensures you know exactly how your capital is performing and why strategic shifts occur.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-white/5 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              <p className="mt-2 text-sm text-slate-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="space-y-4 rounded-[2.5rem] border border-orange-500/40 bg-gradient-to-br from-orange-500/20 via-rose-500/10 to-purple-500/20 p-8 text-white">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold">{closingCTA.heading}</h2>
          <p className="text-base text-orange-100/80">{closingCTA.subheading}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="flex-1 rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5">
            {closingCTA.primaryLabel}
          </button>
          <button className="flex-1 rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-white">
            {closingCTA.secondaryLabel}
          </button>
        </div>
      </section>
    </div>
  );
};

export default GrowInvestMobile;
