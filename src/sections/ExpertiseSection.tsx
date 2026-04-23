import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, BarChart3, Target, Layers, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quadrants = [
  {
    icon: TrendingUp,
    title: 'Sales & Pipeline Intelligence',
    description: 'From lead scoring to closed-won, I build the systems that give sales leaders real-time visibility into what will close, when, and why.',
    color: '#38BDF8',
    capabilities: ['Pipeline forecasting', 'Lead-to-revenue analytics', 'Quota planning systems', 'Win/loss analysis'],
  },
  {
    icon: BarChart3,
    title: 'Financial Planning & Analysis',
    description: 'I architect financial data systems that transform month-end close from a 15-day marathon into a 5-day sprint — with predictive foresight.',
    color: '#D4A843',
    capabilities: ['Budget vs. actual reporting', 'Cash flow forecasting', 'Financial consolidation', 'Board-ready executive dashboards'],
  },
  {
    icon: Target,
    title: 'Marketing Analytics & Attribution',
    description: 'I connect marketing spend to revenue outcomes — building attribution models that prove ROI and optimize every dollar.',
    color: '#F97066',
    capabilities: ['Campaign performance analytics', 'Attribution modeling', 'Customer acquisition cost analysis', 'Funnel optimization'],
  },
  {
    icon: Layers,
    title: 'Operations & Supply Chain Data',
    description: 'I integrate operational data from ERP to warehouse floor — creating the single source of truth that keeps complex businesses moving.',
    color: '#34D399',
    capabilities: ['ERP data integration', 'Inventory analytics', 'Operational KPI dashboards', 'Process automation'],
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.expertise-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.expertise-header', start: 'top 85%' },
      });

      gsap.fromTo('.quadrant-card', { opacity: 0, y: 40, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.quadrant-grid', start: 'top 75%' },
      });

      gsap.fromTo('.center-badge', { scale: 0 }, {
        scale: 1, duration: 0.6, ease: 'back.out(2)', delay: 0.6,
        scrollTrigger: { trigger: '.quadrant-grid', start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      style={{ background: '#0D1220', padding: 'var(--space-2xl) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 var(--container-pad)' }}>
        {/* Header */}
        <div className="expertise-header text-center" style={{ marginBottom: 'var(--space-xl)' }}>
          <p className="text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>
            EXPERTISE
          </p>
          <h2 className="text-h2 font-heading" style={{ color: '#F8FAFC', marginBottom: '16px' }}>
            One Leader. Four Functions. Infinite Impact.
          </h2>
          <p className="text-body-lg mx-auto" style={{ color: '#94A3B8', maxWidth: '640px' }}>
            I don't sit in a silo. I sit at the center — where data meets decision-making across every function that drives revenue.
          </p>
        </div>

        {/* Quadrant Grid */}
        <div className="quadrant-grid relative grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
          {quadrants.map((q, i) => {
            const Icon = q.icon;
            return (
              <div
                key={i}
                className="quadrant-card transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,18,32,0.95) 0%, rgba(17,24,39,0.9) 100%)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '24px',
                  padding: '40px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-active)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(56,189,248,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: q.color, opacity: 0.8 }}
                />
                <Icon size={48} style={{ color: q.color, marginBottom: '20px' }} />
                <h3 className="text-h3 font-heading" style={{ color: '#F8FAFC', marginBottom: '12px' }}>
                  {q.title}
                </h3>
                <p className="text-body" style={{ color: '#94A3B8', marginBottom: '20px' }}>
                  {q.description}
                </p>
                <ul className="flex flex-col" style={{ gap: '8px' }}>
                  {q.capabilities.map((cap, j) => (
                    <li key={j} className="text-body-sm flex items-center gap-2" style={{ color: '#94A3B8' }}>
                      <CheckCircle2 size={14} style={{ color: q.color, flexShrink: 0 }} />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Center Badge (desktop only) */}
          <div
            className="center-badge hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full z-10"
            style={{
              width: '120px',
              height: '120px',
              background: '#080C14',
              border: '2px solid #38BDF8',
              boxShadow: '0 0 40px rgba(56,189,248,0.15)',
            }}
          >
            <span className="text-label text-center" style={{ color: '#38BDF8', fontSize: '11px' }}>
              DATA<br />LEADERSHIP
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
