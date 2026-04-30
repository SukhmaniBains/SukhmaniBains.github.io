import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { careerPositions } from '../data/career';

const Career = () => {
  return (
    <section id="career" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label mb-4 block">CAREER JOURNEY</span>
          <h2 className="section-title mb-4">
            12+ Years. 4 Companies. One Clear Trajectory.
          </h2>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border-color -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-12">
            {careerPositions.map((position, index) => {
              const isLeft = index % 2 === 0;

              return (
                <AnimatedSection key={position.id} delay={index * 0.1}>
                  <div className={`relative flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}>
                    {/* Timeline dot */}
                    <div className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-4 h-4 rounded-full bg-accent-blue border-4 border-bg-primary"
                      />
                    </div>

                    {/* Card */}
                    <div className={`w-full lg:w-[calc(50%-2rem)] ${
                      isLeft ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
                    }`}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.3 }}
                        className="card"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-border-color flex items-center justify-center">
                              <img
                                src={position.logo}
                                alt={position.company}
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentElement.innerHTML = `<span class="font-heading text-xs font-bold text-accent-blue">${position.company.charAt(0)}</span>`;
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-heading font-semibold text-lg text-text-primary">
                                {position.company}
                              </h3>
                              <span className="text-sm text-text-muted font-mono">
                                {position.dateRange}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Role */}
                        <h4 className="font-heading font-medium text-base text-accent-blue mb-2">
                          {position.role}
                        </h4>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-sm text-text-muted mb-4">
                          <MapPin size={14} />
                          <span>{position.location}</span>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-2 mb-4">
                          {position.bullets.map((bullet, bIndex) => (
                            <li key={bIndex} className="flex items-start gap-2 text-sm text-text-secondary">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {position.tags.map((tag) => (
                            <span key={tag} className="tag-pill text-[10px]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}

            {/* Previous Roles Note */}
            <AnimatedSection delay={0.7}>
              <div className="flex justify-center mt-8 lg:mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center px-6 py-4 rounded-xl border border-border-color bg-bg-secondary/50 max-w-2xl"
                >
                  <p className="text-text-muted text-sm leading-relaxed">
                    <span className="text-accent-gold font-medium">Previous Roles (2012 - 2018)</span>
                    {' - '}include BI Developer, Data Analyst, and Reporting Specialist positions across healthcare and logistics, building the foundation in SQL, SSRS, and enterprise data warehousing.
                  </p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
