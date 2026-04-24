import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pills = ['SALES', 'FINANCE', 'MARKETING', 'OPERATIONS'];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Portrait slide in
      gsap.fromTo('.about-portrait', { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-portrait', start: 'top 75%' },
      });

      // Label fade
      gsap.fromTo('.about-label', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-label', start: 'top 85%' },
      });

      // Headline
      gsap.fromTo('.about-headline', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-headline', start: 'top 85%' },
      });

      // Body
      gsap.fromTo('.about-body', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-body', start: 'top 85%' },
      });

      // Pills
      gsap.fromTo('.about-pill', { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.about-pills', start: 'top 90%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCareer = () => {
    const el = document.getElementById('career');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: '#0D1220', padding: 'var(--space-2xl) 0' }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 items-center"
        style={{
          maxWidth: '1280px',
          padding: '0 var(--container-pad)',
          gap: '64px',
        }}
      >
        {/* Portrait */}
        <div className="about-portrait flex justify-center lg:justify-end">
          <div className="relative">
            <div
              className="absolute"
              style={{
                inset: '-20px',
                background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.1) 0%, transparent 70%)',
                borderRadius: '24px',
              }}
            />
            <img
              src="/sukhmani-portrait.jpg"
              alt="Sukhmani Bains"
              style={{
                borderRadius: '24px',
                maxWidth: '360px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(56,189,248,0.08)',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="about-label text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>
            ABOUT
          </p>
          <h2
            className="about-headline text-h2 font-heading"
            style={{ color: '#F8FAFC', maxWidth: '600px', marginBottom: '24px' }}
          >
            Most Companies Have Data. Few Have Decision Systems. I Build Them.
          </h2>
          <p
            className="about-body text-body-lg"
            style={{ color: '#94A3B8', maxWidth: '600px', marginBottom: '28px', lineHeight: 1.7 }}
          >
            For 12+ years, I've operated at the center of Sales, Finance, Marketing, and Operations, architecting the data infrastructure, reporting systems, and analytics frameworks that transform how enterprise leaders make decisions. From building $15B pipeline visibility systems to delivering $40M in interest savings through financial intelligence, I bridge the gap between raw data and boardroom strategy.
          </p>

          {/* Pills */}
          <div className="about-pills flex flex-wrap" style={{ gap: '12px', marginBottom: '32px' }}>
            {pills.map((pill) => (
              <span
                key={pill}
                className="about-pill text-label"
                style={{
                  background: 'rgba(56,189,248,0.08)',
                  color: '#38BDF8',
                  border: '1px solid rgba(56,189,248,0.15)',
                  borderRadius: '100px',
                  padding: '6px 16px',
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          {/* CTA Link */}
          <button
            onClick={scrollToCareer}
            className="inline-flex items-center gap-2 text-body-sm font-heading font-medium transition-all duration-200 group"
            style={{ color: '#38BDF8' }}
          >
            View My Career Journey
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
