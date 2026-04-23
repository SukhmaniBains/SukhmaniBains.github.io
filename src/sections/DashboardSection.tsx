import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dashboardTypes = ['Revenue Intelligence', 'Financial Planning', 'Pipeline Analytics', 'Executive KPIs'];

export default function DashboardSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.dash-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.dash-header', start: 'top 85%' },
      });

      gsap.fromTo('.dash-card', { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.dash-card', start: 'top 75%' },
      });

      gsap.fromTo('.dash-image', { scale: 1.02 }, {
        scale: 1, duration: 1, ease: 'none',
        scrollTrigger: { trigger: '.dash-image', start: 'top 80%', end: 'bottom 20%', scrub: 1 },
      });

      gsap.fromTo('.dash-badge', { opacity: 0 }, {
        opacity: 1, duration: 0.6, delay: 0.3,
        scrollTrigger: { trigger: '.dash-badge', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ background: '#080C14', padding: 'var(--space-2xl) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 var(--container-pad)' }}>
        {/* Header */}
        <div className="dash-header text-center" style={{ marginBottom: '48px' }}>
          <p className="text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>
            DASHBOARD GALLERY
          </p>
          <h2 className="text-h2 font-heading" style={{ color: '#F8FAFC' }}>
            Executive Dashboards. Built for Decision-Makers.
          </h2>
        </div>

        {/* Preview Card */}
        <div
          className="dash-card relative overflow-hidden"
          style={{
            background: '#0D1220',
            border: '1px solid var(--border-subtle)',
            borderRadius: '24px',
            padding: '24px',
          }}
        >
          <div className="dash-image relative overflow-hidden" style={{ borderRadius: '16px' }}>
            <img
              src="/dashboard-preview.jpg"
              alt="Executive Dashboard Preview"
              style={{ width: '100%', borderRadius: '16px', display: 'block' }}
            />
            {/* Overlay Badge */}
            <div
              className="dash-badge absolute inset-0 flex items-center justify-center"
              style={{ borderRadius: '16px' }}
            >
              <div
                style={{
                  background: 'rgba(8,12,20,0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-active)',
                  borderRadius: '16px',
                  padding: '24px 48px',
                  textAlign: 'center',
                }}
              >
                <h3 className="text-h3 font-heading" style={{ color: '#F8FAFC', marginBottom: '8px' }}>
                  Interactive Gallery — Coming Soon
                </h3>
                <p className="text-body-sm" style={{ color: '#94A3B8', marginBottom: '12px' }}>
                  Click-through executive dashboards with live drill-downs.
                </p>
                <span
                  className="text-label inline-block"
                  style={{
                    background: 'rgba(212,168,67,0.1)',
                    color: '#D4A843',
                    border: '1px solid rgba(212,168,67,0.25)',
                    borderRadius: '100px',
                    padding: '4px 16px',
                    fontSize: '11px',
                  }}
                >
                  FUTURE MODULE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Type Pills */}
        <div className="flex flex-wrap justify-center" style={{ gap: '12px', marginTop: '32px' }}>
          {dashboardTypes.map((type) => (
            <span
              key={type}
              className="text-label"
              style={{
                background: 'rgba(56,189,248,0.08)',
                color: '#38BDF8',
                border: '1px solid rgba(56,189,248,0.15)',
                borderRadius: '100px',
                padding: '6px 16px',
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
