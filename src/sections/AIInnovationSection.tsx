import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Sparkles, Globe, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Brain,
    title: 'LLM-Assisted Analytics',
    description: 'Leveraging large language models to automate insight generation, natural language querying of enterprise data, and intelligent report summarization for executive audiences.',
  },
  {
    icon: Sparkles,
    title: 'Prompt Engineering',
    description: 'Designing structured prompts and prompt chains that enable consistent, reliable AI outputs for data analysis, report generation, and business intelligence workflows.',
  },
  {
    icon: Globe,
    title: 'Agentic Workflows',
    description: 'Building autonomous AI agents that can perform data extraction, transformation, analysis, and reporting tasks — reducing manual work and accelerating decision cycles.',
  },
  {
    icon: Code2,
    title: 'MCP & Integration',
    description: 'Exploring Model Context Protocol (MCP) server concepts for secure, structured integration between AI systems and enterprise data platforms.',
  },
];

export default function AIInnovationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.ai-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.ai-header', start: 'top 85%' },
      });

      gsap.fromTo('.ai-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.ai-grid', start: 'top 75%' },
      });

      gsap.fromTo('.ai-banner', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: 'power3.out',
        scrollTrigger: { trigger: '.ai-banner', start: 'top 90%' },
      });

      gsap.fromTo('.ai-visual', { opacity: 0, x: 40 }, {
        opacity: 0.6, x: 0, duration: 1.0, ease: 'power2.out',
        scrollTrigger: { trigger: '.ai-visual', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ai"
      ref={sectionRef}
      style={{ background: '#0D1220', padding: 'var(--space-2xl) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 var(--container-pad)' }}>
        {/* Header */}
        <div className="ai-header text-center" style={{ marginBottom: 'var(--space-xl)' }}>
          <p className="text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>
            AI & INNOVATION
          </p>
          <h2 className="text-h2 font-heading" style={{ color: '#F8FAFC', marginBottom: '16px' }}>
            The Next Frontier. Already Underway.
          </h2>
          <p className="text-body-lg mx-auto" style={{ color: '#94A3B8', maxWidth: '640px' }}>
            I'm not waiting for AI to disrupt data leadership — I'm building the frameworks that put AI at the center of how enterprises think about their data.
          </p>
        </div>

        {/* Grid with visual */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3" style={{ gap: '24px', marginBottom: '40px' }}>
          {/* Capabilities cards - span 2 cols */}
          <div className="ai-grid lg:col-span-2 grid grid-cols-1 sm:grid-cols-2" style={{ gap: '24px' }}>
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="ai-card transition-all duration-300"
                  style={{
                    background: 'rgba(13,18,32,0.6)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '20px',
                    padding: '32px',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.25)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <Icon
                    size={40}
                    style={{ color: '#38BDF8', marginBottom: '16px', filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.2))' }}
                  />
                  <h3 className="text-h3 font-heading" style={{ color: '#F8FAFC', marginBottom: '10px' }}>
                    {cap.title}
                  </h3>
                  <p className="text-body-sm" style={{ color: '#94A3B8', lineHeight: 1.6 }}>
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* AI Visual */}
          <div className="ai-visual hidden lg:block relative">
            <img
              src="/ai-visualization.jpg"
              alt="AI Visualization"
              style={{
                borderRadius: '20px',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.6,
              }}
            />
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div
          className="ai-banner"
          style={{
            background: 'linear-gradient(90deg, rgba(56,189,248,0.05) 0%, rgba(212,168,67,0.05) 100%)',
            border: '1px dashed var(--border-active)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <Sparkles size={24} style={{ color: '#D4A843', flexShrink: 0 }} />
          <div className="flex-1">
            <h4 className="text-h4 font-heading" style={{ color: '#F8FAFC', marginBottom: '4px' }}>
              AI Projects Showcase — Coming Soon
            </h4>
            <p className="text-body-sm" style={{ color: '#94A3B8' }}>
              Interactive demos of AI-powered analytics, LLM-integrated dashboards, and intelligent data agents.
            </p>
          </div>
          <span
            className="text-label"
            style={{
              background: 'rgba(249,112,102,0.1)',
              color: '#F97066',
              border: '1px solid rgba(249,112,102,0.25)',
              borderRadius: '100px',
              padding: '6px 16px',
              fontSize: '11px',
            }}
          >
            MODULAR PLACEHOLDER
          </span>
        </div>
      </div>
    </section>
  );
}
