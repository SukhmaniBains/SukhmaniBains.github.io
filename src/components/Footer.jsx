import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Expertise', href: '/#expertise' },
    { label: 'AI & Innovation', href: '/#ai' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <footer className="border-t border-border-color py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-heading text-3xl font-bold text-accent-gold tracking-tight">
                SB.
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              Data Leadership at the Intersection of Everything
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-text-primary tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-text-muted text-sm hover:text-accent-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-text-primary tracking-wider uppercase mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://linkedin.com/in/sukhmanibains"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted text-sm hover:text-accent-blue transition-colors flex items-center gap-2"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:sukh93@yahoo.com"
                  className="text-text-muted text-sm hover:text-accent-blue transition-colors flex items-center gap-2"
                >
                  <Mail size={16} />
                  sukh93@yahoo.com
                </a>
              </li>
              <li>
                <a
                  href="tel:904-352-3005"
                  className="text-text-muted text-sm hover:text-accent-blue transition-colors flex items-center gap-2"
                >
                  <Phone size={16} />
                  904-352-3005
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border-color flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; 2025 Sukhmani Bains. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Built with passion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
