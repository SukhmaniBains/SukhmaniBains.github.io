import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const categoryPills = ['Revenue Intelligence', 'Financial Planning', 'Pipeline Analytics', 'Executive KPIs'];

const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label mb-4 block">DASHBOARD GALLERY</span>
          <h2 className="section-title mb-4">
            Executive Dashboards. Built for Decision-Makers.
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="card overflow-hidden"
          >
            {/* Dashboard Preview */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-bg-secondary border border-border-color mb-6">
              <img
                src="/images/dashboard-preview.jpg"
                alt="Executive Dashboard Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* Fallback */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary">
                <BarChart3 size={48} className="text-accent-blue/40 mb-4" />
                <span className="text-text-muted font-heading text-lg">Dashboard Preview</span>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 mb-4">
              {categoryPills.map((pill) => (
                <span key={pill} className="tag-pill">
                  {pill}
                </span>
              ))}
            </div>

            <p className="text-text-secondary text-sm leading-relaxed">
              Interactive executive dashboards with real-time drill-downs, designed for board-level decision making.
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Projects;
