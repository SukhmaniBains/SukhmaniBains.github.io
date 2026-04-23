import { ArrowUp, Linkedin, Mail, Phone } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'AI & Innovation', href: '#ai' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      style={{
        background: '#080C14',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          padding: 'var(--space-xl) var(--container-pad)',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div>
            <div
              className="font-heading font-bold"
              style={{ color: '#D4A843', fontSize: '24px', letterSpacing: '-0.02em', marginBottom: '16px' }}
            >
              SB.
            </div>
            <p className="text-body-sm" style={{ color: '#94A3B8', lineHeight: 1.6 }}>
              Data Leadership at the Intersection of Everything
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-label" style={{ color: '#F8FAFC', marginBottom: '20px' }}>
              Quick Links
            </h4>
            <ul className="flex flex-col" style={{ gap: '12px' }}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-body-sm transition-colors duration-200 hover:text-[#38BDF8]"
                    style={{ color: '#94A3B8' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div>
            <h4 className="text-label" style={{ color: '#F8FAFC', marginBottom: '20px' }}>
              Connect
            </h4>
            <ul className="flex flex-col" style={{ gap: '12px' }}>
              <li>
                <a
                  href="https://linkedin.com/in/sukhmanibains"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#38BDF8]"
                  style={{ color: '#94A3B8' }}
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:sukh93@yahoo.com"
                  className="text-body-sm inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#38BDF8]"
                  style={{ color: '#94A3B8' }}
                >
                  <Mail size={16} />
                  sukh93@yahoo.com
                </a>
              </li>
              <li>
                <a
                  href="tel:904-352-3005"
                  className="text-body-sm inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#38BDF8]"
                  style={{ color: '#94A3B8' }}
                >
                  <Phone size={16} />
                  904-352-3005
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Back to top */}
          <div className="flex sm:justify-end">
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid var(--border-subtle)',
                background: 'rgba(13,18,32,0.6)',
                color: '#94A3B8',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#38BDF8';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-active)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#94A3B8';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            gap: '8px',
          }}
        >
          <p className="text-body-sm" style={{ color: '#475569' }}>
            &copy; 2025 Sukhmani Bains. All rights reserved.
          </p>
          <p className="text-body-sm" style={{ color: '#475569' }}>
            Built with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
