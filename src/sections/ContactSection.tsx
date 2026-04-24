import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Linkedin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-headline', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-headline', start: 'top 80%' },
      });

      gsap.fromTo('.contact-subtext', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-subtext', start: 'top 85%' },
      });

      gsap.fromTo('.contact-ctas', { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 0.5, delay: 0.5, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.contact-ctas', start: 'top 90%' },
      });

      gsap.fromTo('.contact-info-item', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-info-row', start: 'top 90%' },
      });

      gsap.fromTo('.availability-badge', { opacity: 0 }, {
        opacity: 1, duration: 0.5, delay: 0.8,
        scrollTrigger: { trigger: '.availability-badge', start: 'top 95%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#080C14',
        padding: 'var(--space-3xl) 0 var(--space-xl)',
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.15) 0%, transparent 70%)',
        }}
      />

      <div
        className="relative z-10 mx-auto text-center"
        style={{ maxWidth: '800px', padding: '0 var(--container-pad)' }}
      >
        <h2
          className="contact-headline text-h1 font-heading"
          style={{ color: '#F8FAFC', marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px' }}
        >
          Let's Build Something That Matters.
        </h2>

        <p
          className="contact-subtext text-body-lg"
          style={{ color: '#94A3B8', maxWidth: '600px', margin: '0 auto 40px' }}
        >
          I'm currently exploring Head of Data, Director of BI, and Senior Director of Reporting & Analytics opportunities. If you're looking for a leader who can transform how your organization thinks about data, let's talk.
        </p>

        {/* CTA Buttons */}
        <div
          className="contact-ctas flex flex-col sm:flex-row items-center justify-center"
          style={{ gap: '16px', marginBottom: '40px' }}
        >
          <a
            href="https://linkedin.com/in/sukhmanibains"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-body-sm font-semibold uppercase"
            style={{
              backgroundColor: '#38BDF8',
              color: '#080C14',
              borderRadius: '8px',
              padding: '14px 32px',
              letterSpacing: '0.05em',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#0EA5E9';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(56,189,248,0.25)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#38BDF8';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Connect on LinkedIn
            <ArrowUpRight size={16} />
          </a>
          <a
            href="mailto:sukh93@yahoo.com"
            className="inline-flex items-center gap-2 text-body-sm font-semibold uppercase"
            style={{
              backgroundColor: 'transparent',
              color: '#38BDF8',
              border: '1px solid var(--border-active)',
              borderRadius: '8px',
              padding: '14px 32px',
              letterSpacing: '0.05em',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(56,189,248,0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = '#38BDF8';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-active)';
            }}
          >
            Send an Email
          </a>
        </div>

        {/* Contact Info */}
        <div
          className="contact-info-row flex flex-col sm:flex-row items-center justify-center"
          style={{ gap: '40px', marginBottom: '24px' }}
        >
          <a
            href="mailto:sukh93@yahoo.com"
            className="contact-info-item inline-flex items-center gap-2 text-body-sm transition-colors duration-200 hover:text-[#38BDF8]"
            style={{ color: '#94A3B8' }}
          >
            <Mail size={16} />
            sukh93@yahoo.com
          </a>
          <a
            href="tel:904-352-3005"
            className="contact-info-item inline-flex items-center gap-2 text-body-sm transition-colors duration-200 hover:text-[#38BDF8]"
            style={{ color: '#94A3B8' }}
          >
            <Phone size={16} />
            904-352-3005
          </a>
          <a
            href="https://linkedin.com/in/sukhmanibains"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-item inline-flex items-center gap-2 text-body-sm transition-colors duration-200 hover:text-[#38BDF8]"
            style={{ color: '#94A3B8' }}
          >
            <Linkedin size={16} />
            linkedin.com/in/sukhmanibains
          </a>
        </div>

        {/* Availability Badge */}
        <div className="availability-badge flex items-center justify-center">
          <span
            className="inline-flex items-center gap-2 text-label"
            style={{
              background: 'rgba(52,211,153,0.1)',
              color: '#34D399',
              border: '1px solid rgba(52,211,153,0.25)',
              borderRadius: '100px',
              padding: '8px 20px',
            }}
          >
            <span
              className="inline-block rounded-full"
              style={{
                width: '8px',
                height: '8px',
                background: '#34D399',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            OPEN TO NEW OPPORTUNITIES
          </span>
        </div>
      </div>
    </section>
  );
}
