import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block mb-8"
          >
            <span className="px-4 py-2 rounded-full bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald font-mono text-xs tracking-widest uppercase">
              OPEN TO NEW OPPORTUNITIES
            </span>
          </motion.div>

          <h2 className="section-title mb-6">
            Let's Build Something That Matters.
          </h2>

          <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            I'm currently exploring Head of Data, Director of BI, and Senior Director of Reporting & Analytics opportunities. If you're looking for a leader who can transform how your organization thinks about data — let's talk.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://linkedin.com/in/sukhmanibains"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              <Linkedin size={18} />
              Connect on LinkedIn
            </a>
            <a
              href="mailto:sukh93@yahoo.com"
              className="btn-outline w-full sm:w-auto"
            >
              <Mail size={18} />
              Send an Email
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-text-muted text-sm">
            <a href="mailto:sukh93@yahoo.com" className="flex items-center gap-2 hover:text-accent-blue transition-colors">
              <Mail size={16} />
              sukh93@yahoo.com
            </a>
            <a href="tel:904-352-3005" className="flex items-center gap-2 hover:text-accent-blue transition-colors">
              <Phone size={16} />
              904-352-3005
            </a>
            <a
              href="https://linkedin.com/in/sukhmanibains"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent-blue transition-colors"
            >
              <Linkedin size={16} />
              linkedin.com/in/sukhmanibains
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
