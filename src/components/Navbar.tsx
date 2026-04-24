import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Career', href: '#career' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'AI', href: '#ai' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ height: '72px', background: scrolled ? 'rgba(8,12,20,0.95)' : 'rgba(8,12,20,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-subtle)', boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none' }}>
        <div className="flex items-center justify-between h-full" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--container-pad)' }}>
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="font-heading font-bold flex-shrink-0" style={{ color: '#D4A843', fontSize: '24px', letterSpacing: '-0.02em', marginRight: '24px' }}>SB.</a>
          <div className="hidden xl:flex items-center flex-1 justify-center" style={{ gap: '28px' }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="relative group whitespace-nowrap flex-shrink-0"
                style={{ color: activeSection === link.href.replace('#', '') ? '#38BDF8' : '#94A3B8', transition: 'color 0.2s', fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
                {link.label}
                <span className="absolute left-0 bottom-[-4px] h-[2px] transition-all duration-300" style={{ width: activeSection === link.href.replace('#', '') ? '100%' : '0%', backgroundColor: '#38BDF8' }} />
                <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#38BDF8' }} />
              </a>
            ))}
          </div>
          <div className="hidden xl:flex items-center flex-shrink-0" style={{ gap: '10px' }}>
            <a href="/SukhmaniBains_Resume.pdf" download className="inline-flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
              style={{ backgroundColor: 'transparent', color: '#D4A843', border: '1px solid rgba(212,168,67,0.3)', borderRadius: '8px', padding: '8px 16px', letterSpacing: '0.05em', transition: 'all 0.25s', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212,168,67,0.08)'; e.currentTarget.style.borderColor = '#D4A843'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,168,67,0.3)'; }}>
              <Download size={13} /> Resume
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="inline-flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
              style={{ backgroundColor: '#38BDF8', color: '#080C14', borderRadius: '8px', padding: '10px 20px', letterSpacing: '0.05em', transition: 'all 0.25s', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0EA5E9'; e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(56,189,248,0.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#38BDF8'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
              Let's Talk <ArrowUpRight size={14} />
            </a>
          </div>
          <button className="xl:hidden flex items-center justify-center" style={{ color: '#F8FAFC' }} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 xl:hidden" style={{ background: 'rgba(8,12,20,0.98)', backdropFilter: 'blur(30px)', paddingTop: '72px' }}>
          <div className="flex flex-col items-center justify-center h-full" style={{ gap: '32px' }}>
            {navLinks.map((link, i) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-h3 font-heading"
                style={{ color: activeSection === link.href.replace('#', '') ? '#38BDF8' : '#F8FAFC', animationDelay: `${i * 0.06}s` }}>{link.label}</a>
            ))}
            <a href="/SukhmaniBains_Resume.pdf" download className="inline-flex items-center gap-2 text-body-sm font-semibold uppercase mt-4"
              style={{ backgroundColor: 'transparent', color: '#D4A843', border: '1px solid rgba(212,168,67,0.4)', borderRadius: '8px', padding: '14px 32px', letterSpacing: '0.05em' }}>
              <Download size={16} /> Download Resume
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="inline-flex items-center gap-2 text-body-sm font-semibold uppercase"
              style={{ backgroundColor: '#38BDF8', color: '#080C14', borderRadius: '8px', padding: '14px 32px', letterSpacing: '0.05em' }}>
              Let's Talk <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
