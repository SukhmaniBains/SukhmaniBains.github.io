import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Particle field animation
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const colors = ['#38BDF8', '#818CF8', '#D4A843'];
    const PARTICLE_COUNT = 80;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Headline 1 - character stagger
    if (headline1Ref.current) {
      const chars = headline1Ref.current.querySelectorAll('.char');
      tl.fromTo(chars, { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', duration: 0.6, stagger: 0.03 }, 0.3);
    }

    // Headline 2 - character stagger
    if (headline2Ref.current) {
      const chars2 = headline2Ref.current.querySelectorAll('.char');
      tl.fromTo(chars2, { opacity: 0, y: '100%' }, { opacity: 1, y: '0%', duration: 0.6, stagger: 0.03 }, 0.7);
    }

    // Tagline
    if (taglineRef.current) {
      tl.fromTo(taglineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 1.0);
    }

    // CTAs
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, 1.4);
    }

    // Scroll indicator
    if (scrollIndicatorRef.current) {
      tl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 2.0);
    }

    return () => { tl.kill(); };
  }, []);

  // Scroll-based fade out
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const splitChars = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
      >
        {char}
      </span>
    ));

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(8,12,20,0.3) 0%, rgba(8,12,20,0.85) 70%, #080C14 100%)',
        }}
      />
      {/* Particle canvas */}
      <canvas
        ref={particlesRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}
      />
      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{
          minHeight: '100dvh',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '120px var(--container-pad) 80px',
        }}
      >
        <div className="overflow-hidden" style={{ marginBottom: '8px' }}>
          <div
            ref={headline1Ref}
            className="text-hero font-heading"
            style={{ color: '#F8FAFC' }}
          >
            {splitChars('SUKHMANI BAINS')}
          </div>
        </div>
        <div className="overflow-hidden" style={{ marginBottom: '24px' }}>
          <div
            ref={headline2Ref}
            className="text-hero font-heading"
            style={{ color: '#38BDF8' }}
          >
            {splitChars('DATA LEADER')}
          </div>
        </div>

        <p
          ref={taglineRef}
          className="text-body-lg"
          style={{
            color: '#94A3B8',
            maxWidth: '640px',
            marginBottom: '40px',
          }}
        >
          At the intersection of Sales, Finance, Marketing & Operations — turning data into $100M+ decisions.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center"
          style={{ gap: '16px' }}
        >
          <button
            onClick={() => scrollToSection('metrics')}
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
            View My Impact
            <ArrowUpRight size={16} />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
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
            Get In Touch
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-300"
          style={{ opacity: scrolled ? 0 : 1 }}
        >
          <span className="text-label" style={{ color: '#475569', marginBottom: '8px' }}>
            Scroll to explore
          </span>
          <ChevronDown size={20} className="animate-bounce" style={{ color: '#475569' }} />
        </div>
      </div>
    </section>
  );
}
