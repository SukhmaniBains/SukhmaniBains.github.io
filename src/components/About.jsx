import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const About = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const pills = ['SALES', 'FINANCE', 'MARKETING', 'OPERATIONS'];

  const scrollToCareer = () => {
    const element = document.getElementById('career');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-bg-secondary border border-border-color">
                {!imgError && (
                  <img
                    src="/images/sukhmani-portrait.jpg"
                    alt="Sukhmani Bains - Data Strategy Leader"
                    className={`w-full h-full object-cover relative z-10 transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgError(true)}
                  />
                )}
                {/* Fallback: only show when image fails or hasn't loaded */}
                {(!imgLoaded || imgError) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-emerald/10 flex items-center justify-center z-0">
                    <span className="font-heading text-6xl font-bold text-accent-blue/30">SB</span>
                  </div>
                )}
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-accent-blue/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-accent-gold/20 rounded-2xl -z-10" />
            </motion.div>

            {/* Content */}
            <div>
              <span className="section-label mb-4 block">ABOUT</span>
              <h2 className="section-title mb-6">
                I Don't Just Build Dashboards. I Build the Systems That Power Decisions.
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8">
                For 12+ years, I've operated at the center of Sales, Finance, Marketing, and Operations - architecting the data infrastructure, reporting systems, and analytics frameworks that transform how enterprise leaders make decisions. From building $15B pipeline visibility systems to delivering $40M in interest savings through financial intelligence, I bridge the gap between raw data and boardroom strategy.
              </p>

              {/* Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {pills.map((pill, index) => (
                  <motion.span
                    key={pill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="tag-pill"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>

              {/* CTA */}
              <button onClick={scrollToCareer} className="btn-outline group">
                View My Career Journey
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
