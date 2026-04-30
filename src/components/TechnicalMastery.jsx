import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import SkillBar from './SkillBar';
import Marquee from './Marquee';
import { skillCategories } from '../data/skills';

const TechnicalMastery = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label mb-4 block">TECHNICAL MASTERY</span>
          <h2 className="section-title mb-4">
            The Toolkit Behind the Impact.
          </h2>
        </AnimatedSection>

        {/* Skill Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, catIndex) => (
            <AnimatedSection key={category.id} delay={catIndex * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="card h-full"
              >
                <h3 className="font-heading font-semibold text-sm tracking-widest text-accent-gold uppercase mb-6">
                  {category.title}
                </h3>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    delay={catIndex * 0.15 + skillIndex * 0.1}
                  />
                ))}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <Marquee />
    </section>
  );
};

export default TechnicalMastery;
