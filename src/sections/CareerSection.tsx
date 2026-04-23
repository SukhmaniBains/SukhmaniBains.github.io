import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Role {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
  color: string;
}

const roles: Role[] = [
  {
    role: 'Senior Manager, Revenue Intelligence & Insights',
    company: 'Aptean',
    period: 'Aug 2025 – Feb 2026',
    location: 'Atlanta, GA',
    bullets: [
      'Led 5-person RevInt team; architected Fabric medallion architecture',
      'Built executive dashboards for Board/CEO/COO/CMO',
      'Enabled 20% forecast accuracy improvement',
    ],
    tags: ['Power BI', 'Fabric', 'SQL', 'Clari'],
    color: '#38BDF8',
  },
  {
    role: 'BI Architect',
    company: 'Mill Creek Residential',
    period: 'Jan 2025 – Aug 2025',
    location: 'Atlanta, GA',
    bullets: [
      'Removed 1.5B legacy records reducing refresh 11h→2h',
      'Led REFINE initiative for real estate finance',
      'Fabric/OneLake for CFO predictive analytics',
    ],
    tags: ['Fabric', 'SQL', 'Power BI'],
    color: '#D4A843',
  },
  {
    role: 'Director, Business Intelligence',
    company: 'FORTNA',
    period: 'Nov 2023 – Oct 2024',
    location: 'Atlanta, GA',
    bullets: [
      'Led enterprise BI globally; $40M interest savings',
      'Integrated 5 ERPs via Vena cutting reporting 50%',
      'Financial close 15→5 days; 90% ticket SLA; 100% team retention',
    ],
    tags: ['Vena', 'Planful', 'Power BI', 'SQL'],
    color: '#38BDF8',
  },
  {
    role: 'Manager, BI & Data',
    company: 'FORTNA',
    period: 'Jul 2022 – Oct 2023',
    location: 'Atlanta, GA',
    bullets: [
      'Mentored 6-person cross-functional BI team',
      'Automated 60+ reports',
      'Built BI server with Dynamics AX replication',
    ],
    tags: ['SQL', 'SSIS', 'Power BI'],
    color: '#818CF8',
  },
  {
    role: 'Enterprise Data Architect',
    company: 'FORTNA',
    period: 'Jan 2021 – Jul 2022',
    location: 'Atlanta, GA',
    bullets: [
      'Architected enterprise BI data platform',
      'SQL-based ETL integrating ERP, CRM, operational data',
    ],
    tags: ['SQL', 'ETL', 'Data Modeling'],
    color: '#F97066',
  },
  {
    role: 'Senior BI Developer V',
    company: 'Florida Blue',
    period: 'Dec 2018 – Oct 2019',
    location: 'Jacksonville, FL',
    bullets: [
      'Led enterprise reporting for Enrollment & Billing',
      'Architected across Snowflake, DB2, Oracle, SQL Server',
    ],
    tags: ['Snowflake', 'SQL', 'Oracle', 'DB2'],
    color: '#34D399',
  },
];

const earlierRoles = [
  { role: 'BI Developer', company: 'Kforce', period: '2017–2018' },
  { role: 'Data Analyst', company: 'Jackson Hewitt', period: '2016–2017' },
  { role: 'BI Analyst', company: 'ACTS', period: '2015–2016' },
  { role: 'Data Analyst', company: 'Credit Union One', period: '2014–2015' },
  { role: 'BI Consultant', company: 'Exsilio Solutions', period: '2013–2014' },
  { role: 'Data Analyst', company: 'City of Jacksonville', period: '2012–2013' },
];

export default function CareerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.career-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.career-header', start: 'top 85%' },
      });

      // Timeline line
      gsap.fromTo('.timeline-line', { scaleY: 0 }, {
        scaleY: 1, duration: 1.5, ease: 'power2.inOut',
        scrollTrigger: { trigger: '.timeline-line', start: 'top 70%', end: 'bottom 50%', scrub: 1 },
      });

      // Role cards
      gsap.utils.toArray<HTMLElement>('.role-card').forEach((card, i) => {
        const xDir = i % 2 === 0 ? -40 : 40;
        gsap.fromTo(card, { opacity: 0, x: xDir }, {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });

      // Timeline nodes
      gsap.utils.toArray<HTMLElement>('.timeline-node').forEach((node) => {
        gsap.fromTo(node, { scale: 0 }, {
          scale: 1, duration: 0.4, ease: 'back.out(2)',
          scrollTrigger: { trigger: node, start: 'top 85%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="career"
      ref={sectionRef}
      style={{ background: '#080C14', padding: 'var(--space-2xl) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1000px', padding: '0 var(--container-pad)' }}>
        {/* Header */}
        <div className="career-header text-center" style={{ marginBottom: 'var(--space-xl)' }}>
          <p className="text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>
            CAREER JOURNEY
          </p>
          <h2 className="text-h2 font-heading" style={{ color: '#F8FAFC' }}>
            12+ Years. 4 Companies. One Clear Trajectory.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div
            className="timeline-line absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] lg:-translate-x-1/2"
            style={{
              background: 'linear-gradient(180deg, #38BDF8 0%, #D4A843 50%, #F97066 100%)',
              transformOrigin: 'top',
            }}
          />

          {roles.map((role, i) => (
            <div
              key={i}
              className={`relative flex items-start mb-8 lg:mb-12 ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Timeline node */}
              <div
                className="timeline-node absolute left-4 lg:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 mt-6 z-10"
                style={{
                  background: role.color,
                  border: '3px solid #080C14',
                  boxShadow: i === 0 ? `0 0 20px ${role.color}40` : 'none',
                }}
              >
                {i === 0 && (
                  <span
                    className="absolute inset-0 rounded-full animate-pulse-dot"
                    style={{ background: role.color }}
                  />
                )}
              </div>

              {/* Card */}
              <div
                className={`role-card ml-12 lg:ml-0 ${
                  i % 2 === 0 ? 'lg:mr-[52%] lg:ml-0' : 'lg:ml-[52%] lg:mr-0'
                } w-full`}
              >
                <div
                  className="transition-all duration-300"
                  style={{
                    background: '#0D1220',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '28px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-active)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(56,189,248,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Company badge */}
                  <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
                    <span
                      className="text-label"
                      style={{ color: role.color }}
                    >
                      {role.company}
                    </span>
                    <span className="text-mono-sm font-mono" style={{ color: '#475569' }}>
                      {role.period}
                    </span>
                  </div>

                  <h4 className="text-h4 font-heading" style={{ color: '#F8FAFC', marginBottom: '4px' }}>
                    {role.role}
                  </h4>
                  <p className="text-body-sm" style={{ color: '#475569', marginBottom: '16px' }}>
                    {role.location}
                  </p>

                  <ul className="flex flex-col" style={{ gap: '8px', marginBottom: '16px' }}>
                    {role.bullets.map((b, j) => (
                      <li key={j} className="text-body-sm flex items-start gap-2" style={{ color: '#94A3B8' }}>
                        <span style={{ color: role.color, marginTop: '2px' }}>•</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap" style={{ gap: '8px' }}>
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-label"
                        style={{
                          background: 'rgba(56,189,248,0.08)',
                          color: '#38BDF8',
                          border: '1px solid rgba(56,189,248,0.15)',
                          borderRadius: '100px',
                          padding: '4px 12px',
                          fontSize: '11px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Earlier Career Toggle */}
        <div className="flex justify-center" style={{ marginTop: '32px' }}>
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-body-sm font-heading font-medium transition-colors duration-200"
            style={{ color: '#94A3B8' }}
          >
            <ChevronDown
              size={16}
              className="transition-transform duration-300"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
            View Earlier Career (2012–2018)
          </button>
        </div>

        {expanded && (
          <div
            className="mx-auto"
            style={{
              marginTop: '24px',
              maxWidth: '600px',
              background: '#0D1220',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            {earlierRoles.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between"
                style={{
                  padding: '10px 0',
                  borderBottom: i < earlierRoles.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <div>
                  <span className="text-body-sm font-medium" style={{ color: '#F8FAFC' }}>
                    {r.role}
                  </span>
                  <span className="text-body-sm" style={{ color: '#475569', marginLeft: '8px' }}>
                    — {r.company}
                  </span>
                </div>
                <span className="text-mono-sm font-mono" style={{ color: '#475569' }}>
                  {r.period}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
