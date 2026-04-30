import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { blogPosts } from '../data/blogs';

const categoryColors = {
  'Data Architecture': 'bg-accent-blue/10 text-accent-blue',
  'FP&A': 'bg-accent-emerald/10 text-accent-emerald',
  'AI & BI': 'bg-accent-gold/10 text-accent-gold',
};

const BlogSection = () => {
  return (
    <section id="blog" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label mb-4 block">THOUGHTS & INSIGHTS</span>
          <h2 className="section-title mb-4">
            Ideas on Data, Leadership & the Future of BI.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.1}>
              <Link to={`/blog/${post.slug}`}>
                <motion.article
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="card h-full group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider ${
                      categoryColors[post.category] || 'bg-bg-secondary text-text-secondary'
                    }`}>
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border-color">
                    <div className="flex items-center gap-2 text-text-muted text-xs">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                    <span className="text-accent-blue text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.article>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
