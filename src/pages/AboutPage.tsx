import React from 'react';
import Team from '../Assets/Team.png'

type CountUpProps = {
  end: number;
  durationMs?: number;
  className?: string;
  suffix?: string;
};

const CountUp: React.FC<CountUpProps> = ({ end, durationMs = 1500, className = '', suffix = '' }) => {
  const spanRef = React.useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!hasStarted) return;

    let startTs: number | null = null;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (startTs === null) startTs = ts;
      const progress = Math.min((ts - startTs) / durationMs, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(end * eased);
      setValue(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    const rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [hasStarted, end, durationMs]);

  return (
    <span ref={spanRef} className={className}>
      {value}
      {suffix}
    </span>
  );
};

const AboutPage: React.FC = () => {
  const startNewConversation = () => {
    const email = "pixelpulse2905@gmail.com";
    const subject = "🤖 New Project Inquiry - PixelPulse";
    const body = `Hello PixelPulse Team,

I'm interested in your design services and would like to discuss a potential project.

Project Details:
- Project Type: 
- Timeline: 
- Budget Range: 
- Additional Requirements: 

Best regards,
[Your Name]`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans">
      {/* Background gradients & aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[140%] h-[320px] bg-gradient-radial from-orange-500/20 via-transparent to-transparent blur-3xl opacity-40"></div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-28 md:pt-32 pb-16 md:pb-20 text-center">
          <div className="max-w-4xl mx-auto px-4 md:px-8" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              We Build Brands That Think, Evolve, and Inspire
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              PixelPulse is a premium branding and design agency that blends strategy, creativity, and technology. 
              From identity systems to interactive digital experiences, we craft brands that resonate and drive impact.
            </p>
            <a href="/contact" className="mt-6 inline-block bg-orange-500 text-black font-semibold px-8 py-3 rounded-lg hover:bg-orange-400 transition-colors">
              Let’s Collaborate
            </a>
          </div>
        </section>

        {/* Company Overview */}
        <section className="pb-16 md:pb-20">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center" data-aos="fade-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About PixelPulse</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Founded with a vision to redefine branding, PixelPulse combines design, AI-powered insights, and innovative strategies to help companies stand out in a crowded market. We specialize in identity design, interactive experiences, and storytelling that leaves a lasting impression.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our team of strategists, designers, and technologists collaborate closely with clients to create bold, functional, and visually stunning solutions that align with their goals and values.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 flex justify-center items-center">
              <img src={Team} alt="Team Collaboration Illustration" className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center" data-aos="fade-up">
            {[
              { label: 'Projects Completed', value: '200+' },
              { label: 'Brands Served', value: '60+' },
              { label: 'Active Client', value: '40+' },
              { label: 'Years in Industry', value: '5+' },
            ].map((stat, i) => {
              const numeric = parseInt(String(stat.value).replace(/[^0-9]/g, ''), 10) || 0;
              const suffix = String(stat.value).replace(/[0-9]/g, '');
              return (
                <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-orange-500/40 transition-colors">
                  <CountUp end={numeric} suffix={suffix} className="text-3xl md:text-4xl font-extrabold text-white" />
                  <div className="text-gray-400 mt-1 text-sm md:text-base">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8" data-aos="fade-up">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                Empower businesses with brand systems that are scalable, consistent, and innovative. We turn ideas into visual languages that communicate clearly and emotionally.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                A world where brands convey clarity, purpose, and delight. Through strategic design and subtle technology, we aim to create meaningful connections between companies and their audiences.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h3 className="text-white text-3xl md:text-4xl font-bold mb-8 text-center" data-aos="fade-up">Our Core Values</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { t: 'Craftsmanship', d: 'Precision and artistry guide everything we create, from typography to motion design.' },
                { t: 'Clarity', d: 'Every element has purpose. We value simplicity and transparency in design and communication.' },
                { t: 'Partnership', d: 'Collaboration drives our success. We work closely with clients to achieve shared goals.' },
              ].map((v, i) => (
                <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-orange-500/40 transition-colors" data-aos="fade-up" data-aos-delay={(i + 1) * 100}>
                  <div className="text-white font-semibold text-lg mb-2">{v.t}</div>
                  <div className="text-gray-300">{v.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Start New Conversation */}
        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-4 md:px-8 text-center" data-aos="fade-up">
            <div className="bg-gradient-to-br from-gray-900/60 to-black/80 border border-gray-800 rounded-2xl p-10">
              <h4 className="text-white text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Brand?</h4>
              <p className="text-gray-300 mb-6">Share your goals—branding, website, or digital presence—and we’ll craft a strategic plan that delivers impact and value.</p>
              <button
                onClick={startNewConversation}
                className="inline-block bg-orange-500 text-black font-semibold px-8 py-3 rounded-lg hover:bg-orange-400 transition-colors"
              >
                Start New Conversation
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
