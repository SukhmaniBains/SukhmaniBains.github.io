import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, FileText, Workflow, Plug, ArrowRight, Sparkles, Database } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const capabilities = [
  {
    id: 1,
    title: 'LLM-Assisted Analytics',
    description: 'Leveraging large language models to automate insight generation, natural language querying of enterprise data, and intelligent report summarization for executive audiences.',
    icon: Brain
  },
  {
    id: 2,
    title: 'Prompt Engineering',
    description: 'Designing structured prompts and prompt chains that enable consistent, reliable AI outputs for data analysis, report generation, and business intelligence workflows.',
    icon: FileText
  },
  {
    id: 3,
    title: 'Agentic Workflows',
    description: 'Building autonomous AI agents that can perform data extraction, transformation, analysis, and reporting tasks - reducing manual work and accelerating decision cycles.',
    icon: Workflow
  },
  {
    id: 4,
    title: 'MCP & Integration',
    description: 'Exploring Model Context Protocol (MCP) server concepts for secure, structured integration between AI systems and enterprise data platforms.',
    icon: Plug
  }
];

const demos = [
  {
    id: 'sentiment',
    title: 'AI Sentiment Analysis Dashboard',
    description: 'An interactive browser-based demo that analyzes text sentiment in real-time using AI - no backend required.',
    tags: ['Transformers.js', 'NLP', 'Interactive'],
    icon: Sparkles,
    to: '/ai-demo',
    accent: 'accent-blue'
  },
  {
    id: 'nl2sql',
    title: 'Natural Language to SQL',
    description: 'Type business questions in plain English and see AI-generated SQL queries with schema-aware mock execution.',
    tags: ['Text-to-SQL', 'Schema Parsing', 'Interactive'],
    icon: Database,
    to: '/nl-to-sql',
    accent: 'accent-emerald'
  }
];

const AIInnovation = () => {
  return (
    <section id="ai" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label mb-4 block">AI & INNOVATION</span>
          <h2 className="section-title mb-4">
            The Next Frontier. Already Underway.
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            I'm not waiting for AI to disrupt data leadership - I'm building the frameworks that put AI at the center of how enterprises think about their data.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Capability Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map((cap, index) => {
              const IconComponent = cap.icon;
              return (
                <AnimatedSection key={cap.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="card h-full"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center mb-4">
                      <IconComponent size={20} className="text-accent-blue" />
                    </div>
                    <h3 className="font-heading font-semibold text-base text-text-primary mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {cap.description}
                    </p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Demo Cards */}
          <div className="space-y-4">
            {demos.map((demo, index) => {
              const IconComponent = demo.icon;
              const accentClass = demo.accent === 'accent-emerald' ? 'text-accent-emerald' : 'text-accent-blue';
              const bgClass = demo.accent === 'accent-emerald' ? 'bg-accent-emerald/10' : 'bg-accent-blue/10';

              return (
                <AnimatedSection key={demo.id} delay={0.2 + index * 0.1}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="card h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-blue/10 to-transparent rounded-bl-full" />

                    <div className="flex items-center gap-2 mb-4">
                      <IconComponent size={18} className={accentClass} />
                      <span className={`font-mono text-xs ${accentClass} tracking-wider uppercase`}>
                        Featured Demo
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-text-primary mb-3">
                      {demo.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                      {demo.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {demo.tags.map((tag) => (
                        <span key={tag} className={`tag-pill text-[10px] ${bgClass} ${accentClass}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={demo.to}
                      className="btn-primary text-sm inline-flex items-center gap-2 group"
                    >
                      Try the Demo
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInnovation;
