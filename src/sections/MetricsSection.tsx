import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { number: 15, prefix: '$', suffix: 'B+', label: 'Global Pipeline Visibility Enabled', color: '#D4A843' },
  { number: 40, prefix: '$', suffix: 'M', label: 'Interest Savings via Financial Visibility', color: '#38BDF8' },
  { number: 50, prefix: '', suffix: '%', label: 'Financial Close Cycle Reduction', color: '#34D399' },
  { number: 20, prefix: '', suffix: '%', label: 'Forecast Accuracy Improvement', color: '#38BDF8' },
];

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const triggers: ScrollTrigger[] = [];

    // Section entrance
    if (sectionRef.current) {
      const label = sectionRef.current.querySelector('.section-label');
      const cards = sectionRef.current.querySelectorAll('.metric-card');

      if (label) {
        gsap.fromTo(label, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: label, start: 'top 85%' },
        });
      }

      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });

      // Counter animations
      metrics.forEach((metric, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: metric.number,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${metric.prefix}${Math.round(obj.val)}${metric.suffix}`;
          },
        });
      });
    }

    return () => {
      triggers.forEach(t => t.kill());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="metrics"
      ref={sectionRef}
      style={{
        background: '#080C14',
        borderTop: '1px solid var(--border-subtle)',
        padding: 'var(--space-2xl) 0 var(--space-xl)',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          padding: '0 var(--container-pad)',
        }}
      >
        <p
          className="section-label text-label text-center"
          style={{ color: '#38BDF8', marginBottom: '48px' }}
        >
          QUANTIFIED IMPACT
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '32px' }}>
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="metric-card flex flex-col items-center text-center"
              style={{
                background: 'transparent',
                padding: '24px 16px',
                borderRadius: '16px',
              }}
            >
              <span
                ref={(el) => { numberRefs.current[i] = el; }}
                className="text-mono-lg font-mono"
                style={{ color: metric.color, marginBottom: '16px' }}
              >
                {metric.prefix}0{metric.suffix}
              </span>
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  background: 'var(--border-subtle)',
                  marginBottom: '16px',
                }}
              />
              <p className="text-body-sm" style={{ color: '#94A3B8' }}>
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
