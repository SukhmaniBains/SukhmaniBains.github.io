import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    title: 'Building the $15B Pipeline Visibility System',
    description: 'How I architected a medallion data platform that gave a $2B revenue company\'s board real-time visibility into every dollar in the pipeline.',
    tag: 'Data Architecture',
    readTime: '8 min read',
  },
  {
    title: 'From 15 Days to 5: Accelerating Financial Close',
    description: 'The strategy and technology stack that cut month-end close by 67% while improving accuracy — and how to replicate it.',
    tag: 'FP&A',
    readTime: '6 min read',
  },
  {
    title: 'Why Every Data Leader Needs an AI Strategy in 2025',
    description: 'How LLMs, agentic workflows, and MCP are reshaping what\'s possible in business intelligence — and how to get ahead.',
    tag: 'AI & BI',
    readTime: '10 min read',
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.blog-header', start: 'top 85%' },
      });

      gsap.fromTo('.blog-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.blog-grid', start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      style={{ background: '#0D1220', padding: 'var(--space-2xl) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 var(--container-pad)' }}>
        {/* Header */}
        <div className="blog-header text-center" style={{ marginBottom: 'var(--space-xl)' }}>
          <p className="text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>
            THOUGHTS & INSIGHTS
          </p>
          <h2 className="text-h2 font-heading" style={{ color: '#F8FAFC' }}>
            Ideas on Data, Leadership & the Future of BI.
          </h2>
        </div>

        {/* Blog Cards */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
          {blogPosts.map((post, i) => (
            <div
              key={i}
              className="blog-card relative transition-all duration-300"
              style={{
                background: '#080C14',
                border: '1px solid var(--border-subtle)',
                borderRadius: '20px',
                padding: '32px',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-active)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(56,189,248,0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Coming Soon Watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <span
                  className="text-mono-sm font-mono"
                  style={{
                    color: '#475569',
                    opacity: 0.08,
                    transform: 'rotate(-15deg)',
                    fontSize: '28px',
                    letterSpacing: '0.1em',
                  }}
                >
                  COMING SOON
                </span>
              </div>

              <div className="relative z-10">
                <span
                  className="text-label inline-block"
                  style={{
                    background: 'rgba(56,189,248,0.08)',
                    color: '#38BDF8',
                    border: '1px solid rgba(56,189,248,0.15)',
                    borderRadius: '100px',
                    padding: '4px 12px',
                    marginBottom: '16px',
                  }}
                >
                  {post.tag}
                </span>

                <h3 className="text-h3 font-heading" style={{ color: '#F8FAFC', marginBottom: '12px' }}>
                  {post.title}
                </h3>

                <p
                  className="text-body-sm"
                  style={{
                    color: '#94A3B8',
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.description}
                </p>

                <div className="flex items-center gap-2" style={{ color: '#475569' }}>
                  <Clock size={14} />
                  <span className="text-body-sm">{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
