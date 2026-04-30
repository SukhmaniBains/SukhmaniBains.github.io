import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const titleLetters = 'SUKHMANI BAINS'.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const scrollToImpact = () => {
    const element = document.getElementById('stats');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/20 to-bg-primary pointer-events-none" style={{ zIndex: 2 }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {mounted && (
          <>
            {/* Animated Title */}
            <motion.h1
              variants={container}
              initial="hidden"
              animate="visible"
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-text-primary mb-6"
            >
              {titleLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterAnimation}
                  className={letter === ' ' ? 'mr-2 sm:mr-4' : 'inline-block'}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
              className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-accent-blue tracking-wide mb-8"
            >
              DATA LEADER
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.5 }}
              className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed mb-10"
            >
              At the intersection of Sales, Finance, Marketing & Operations — turning data into $100M+ decisions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button onClick={scrollToImpact} className="btn-primary w-full sm:w-auto">
                View My Impact
              </button>
              <button onClick={scrollToContact} className="btn-outline w-full sm:w-auto">
                Get In Touch
              </button>
            </motion.div>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-text-muted tracking-wider uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-accent-blue" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
