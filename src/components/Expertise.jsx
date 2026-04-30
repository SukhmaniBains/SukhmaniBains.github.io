import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Target, Settings } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { expertiseAreas } from '../data/expertise';

const iconMap = {
  TrendingUp,
  BarChart3,
  Target,
  Settings
};

const Expertise = () => {
  return (
    <section id="expertise" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label mb-4 block">EXPERTISE</span>
          <h2 className="section-title mb-4">
            One Leader. Four Functions. Infinite Impact.
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            I don't sit in a silo. I sit at the center - where data meets decision-making across every function that drives revenue.
          </p>
        </AnimatedSection>

        {/* Center Badge */}
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            className="relative z-10 bg-bg-card border border-accent-blue/30 rounded-full px-6 py-3"
          >
            <span className="font-heading font-bold text-sm tracking-widest text-accent-blue uppercase">
              DATA LEADERSHIP
            </span>
          </motion.div>
        </div>

        {/* Expertise Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {expertiseAreas.map((area, index) => {
            const IconComponent = iconMap[area.icon];

            return (
              <AnimatedSection key={area.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="card h-full"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                      <IconComponent size={24} className="text-accent-blue" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-text-primary">
                      {area.title}
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {area.items.map((item, iIndex) => (
                      <li key={iIndex} className="flex items-center gap-3 text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
