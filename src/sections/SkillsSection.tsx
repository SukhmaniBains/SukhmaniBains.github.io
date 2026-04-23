import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Code2, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    icon: Database,
    title: 'DATA & BI PLATFORMS',
    color: '#38BDF8',
    skills: [
      { name: 'Power BI', level: 95 },
      { name: 'Microsoft Fabric', level: 90 },
      { name: 'Tableau', level: 85 },
      { name: 'Qlik', level: 75 },
      { name: 'Snowflake', level: 85 },
    ],
  },
  {
    icon: Code2,
    title: 'DATA ENGINEERING',
    color: '#D4A843',
    skills: [
      { name: 'SQL Server / T-SQL', level: 98 },
      { name: 'SSIS / ETL', level: 95 },
      { name: 'Azure Data Factory', level: 88 },
      { name: 'Data Modeling', level: 95 },
      { name: 'API Integration', level: 85 },
    ],
  },
  {
    icon: Zap,
    title: 'SYSTEMS & INNOVATION',
    color: '#F97066',
    skills: [
      { name: 'Salesforce / CRM', level: 90 },
      { name: 'Clari / Revenue Ops', level: 88 },
      { name: 'Planful / Vena (FP&A)', level: 92 },
      { name: 'Boomi / Integration', level: 80 },
      { name: 'LLM / AI Applications', level: 75 },
    ],
  },
];

const marqueeItems = [
  'POWER BI', 'FABRIC', 'SQL', 'SNOWFLAKE', 'TABLEAU', 'PYTHON',
  'Salesforce', 'Clari', 'Vena', 'Planful', 'ETL/ELT', 'Azure', 'LLMs', 'LangChain',
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-header', start: 'top 85%' },
      });

      gsap.fromTo('.skill-category', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 75%' },
      });

      // Progress bars
      gsap.utils.toArray<HTMLElement>('.skill-bar-fill').forEach((bar, i) => {
        const target = bar.getAttribute('data-width') || '0%';
        gsap.fromTo(bar, { width: '0%' }, {
          width: target, duration: 1.2, ease: 'power2.out', delay: i * 0.1,
          scrollTrigger: { trigger: bar, start: 'top 85%', once: true },
        });
      });

      gsap.fromTo('.tech-marquee', { opacity: 0 }, {
        opacity: 1, duration: 0.6, delay: 0.5,
        scrollTrigger: { trigger: '.tech-marquee', start: 'top 90%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ background: '#080C14', padding: 'var(--space-2xl) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 var(--container-pad)' }}>
        {/* Header */}
        <div className="skills-header text-center" style={{ marginBottom: 'var(--space-xl)' }}>
          <p className="text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>
            TECHNICAL MASTERY
          </p>
          <h2 className="text-h2 font-heading" style={{ color: '#F8FAFC' }}>
            The Toolkit Behind the Impact.
          </h2>
        </div>

        {/* Categories */}
        <div className="skills-grid grid grid-cols-1 lg:grid-cols-3" style={{ gap: '32px' }}>
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="skill-category"
                style={{
                  background: '#0D1220',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '32px',
                }}
              >
                <div className="flex items-center gap-3" style={{ marginBottom: '24px' }}>
                  <Icon size={24} style={{ color: cat.color }} />
                  <h4 className="text-h4 font-heading" style={{ color: '#F8FAFC' }}>
                    {cat.title}
                  </h4>
                </div>

                <div className="flex flex-col" style={{ gap: '16px' }}>
                  {cat.skills.map((skill, j) => (
                    <div key={j}>
                      <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                        <span className="text-body-sm" style={{ color: '#94A3B8' }}>
                          {skill.name}
                        </span>
                        <span className="text-mono-sm font-mono" style={{ color: cat.color }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: '6px',
                          background: 'rgba(56,189,248,0.1)',
                          borderRadius: '3px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          className="skill-bar-fill"
                          data-width={`${skill.level}%`}
                          style={{
                            height: '100%',
                            width: '0%',
                            background: cat.color,
                            borderRadius: '3px',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Marquee */}
        <div className="tech-marquee overflow-hidden" style={{ marginTop: 'var(--space-xl)' }}>
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center" style={{ marginRight: '80px' }}>
                <span className="text-mono-md font-mono" style={{ color: '#475569' }}>
                  {item}
                </span>
                <span style={{ color: '#38BDF8', marginLeft: '80px' }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
