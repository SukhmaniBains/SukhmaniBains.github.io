import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { blogPosts } from '../data/blogs';

const categoryColors = {
  'Data Architecture': 'bg-accent-blue/10 text-accent-blue',
  'FP&A': 'bg-accent-emerald/10 text-accent-emerald',
  'AI & BI': 'bg-accent-gold/10 text-accent-gold',
};

const BlogListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <AnimatedSection>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back to Home</span>
          </Link>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection className="mb-12">
          <span className="section-label mb-4 block">THOUGHTS & INSIGHTS</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            All Blog Posts
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Deep dives into data architecture, FP&A transformation, and the future of AI in business intelligence.
          </p>
        </AnimatedSection>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.1}>
              <Link to={`/blog/${post.slug}`}>
                <motion.article
                  whileHover={{ y: -4 }}
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

                  <h2 className="font-heading font-semibold text-xl text-text-primary mb-3 group-hover:text-accent-blue transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border-color">
                    <span className="text-text-muted text-xs">{post.date}</span>
                    <div className="flex items-center gap-2 text-text-muted text-xs">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogListPage;
