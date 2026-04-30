import { motion } from 'framer-motion';

const SkillBar = ({ name, percentage, delay = 0 }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text-primary">{name}</span>
        <span className="text-sm font-mono text-accent-blue">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 1,
            delay: delay,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-blue-hover"
        />
      </div>
    </div>
  );
};

export default SkillBar;
