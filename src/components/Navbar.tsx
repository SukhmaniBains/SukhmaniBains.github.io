import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'AI & Innovation', href: '#ai' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: '72px',
          background: scrolled ? 'rgba(8,12,20,0.95)' : 'rgba(8,12,20,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between h-full"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 var(--container-pad)',
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-heading font-bold text-2xl"
            style={{ color: '#D4A843', fontSize: '24px', letterSpacing: '-0.02em' }}
          >
            SB.
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center" style={{ gap: '32px' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-nav relative group"
                style={{
                  color: activeSection === link.href.replace('#', '') ? '#38BDF8' : '#94A3B8',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
                <span
                  className="absolute left-0 bottom-[-4px] h-[2px] transition-all duration-300"
                  style={{
                    width: activeSection === link.href.replace('#', '') ? '100%' : '0%',
                    backgroundColor: '#38BDF8',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                <span
                  className="absolute left-0 bottom-[-4px] h-[2px] w-0 group-hover:w-full transition-all duration-300"
                  style={{
                    backgroundColor: '#38BDF8',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden lg:inline-flex items-center gap-2 text-body-sm font-semibold uppercase"
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
            Let's Talk
            <ArrowUpRight size={16} />
          </a>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center"
            style={{ color: '#F8FAFC' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{
            background: 'rgba(8,12,20,0.98)',
            backdropFilter: 'blur(30px)',
            paddingTop: '72px',
          }}
        >
          <div className="flex flex-col items-center justify-center h-full" style={{ gap: '32px' }}>
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-h3 font-heading"
                style={{
                  color: activeSection === link.href.replace('#', '') ? '#38BDF8' : '#F8FAFC',
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-2 text-body-sm font-semibold uppercase mt-4"
              style={{
                backgroundColor: '#38BDF8',
                color: '#080C14',
                borderRadius: '8px',
                padding: '14px 32px',
                letterSpacing: '0.05em',
              }}
            >
              Let's Talk
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
