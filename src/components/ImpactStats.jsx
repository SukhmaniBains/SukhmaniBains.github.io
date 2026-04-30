import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const stats = [
  {
    value: '$15B+',
    label: 'Global Pipeline Visibility Enabled',
    color: 'text-accent-gold'
  },
  {
    value: '$40M',
    label: 'Interest Savings via Financial Visibility',
    color: 'text-accent-emerald'
  },
  {
    value: '50%',
    label: 'Financial Close Cycle Reduction',
    color: 'text-accent-blue'
  },
  {
    value: '20%',
    label: 'Forecast Accuracy Improvement',
    color: 'text-accent-coral'
  }
];

const ImpactStats = () => {
  return (
    <section id="stats" className="relative z-10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="card flex flex-col items-center text-center p-6 md:p-8"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    type: 'spring',
                    stiffness: 100
                  }}
                  className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold ${stat.color} mb-2`}
                >
                  {stat.value}
                </motion.span>
                <span className="text-sm md:text-base text-text-secondary leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
