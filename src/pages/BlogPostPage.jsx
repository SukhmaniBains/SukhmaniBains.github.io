import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ArrowRight, ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { blogPosts, blogDisclaimer } from '../data/blogs';

// Simple markdown-like parser
const parseMarkdown = (content) => {
  let html = content;

  // Headers (must come before other replacements)
  html = html.replace(/^# (.+)$/gm, '<h1 class="font-heading text-3xl md:text-4xl font-bold text-text-primary mt-12 mb-6">$1</h1>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="font-heading text-xl md:text-2xl font-bold text-text-primary mt-10 mb-4">$1</h2>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Numbered lists (process before unordered lists and paragraphs)
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="flex items-start gap-3 mb-2"><span class="mt-0.5 w-6 h-6 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-mono flex items-center justify-center flex-shrink-0">$1</span><span>$2</span></li>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="flex items-start gap-3 mb-2"><span class="mt-2 w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0"></span><span>$1</span></li>');

  // Wrap consecutive list items in <ul>
  html = html.replace(/(<li[^>]*>.*?<\/li>(?:\n|$))+/gs, '<ul class="mb-6 space-y-2">$&</ul>');

  // Paragraphs: lines that don't start with < and aren't empty
  html = html.replace(/^(?!<)([^\n].+)$/gm, '<p class="text-text-secondary leading-relaxed mb-4">$1</p>');

  // Clean up empty paragraphs
  html = html.replace(/<p class="text-text-secondary leading-relaxed mb-4"><\/p>/g, '');

  return html;
};

const BlogPostPage = () => {
  const { slug } = useParams();

  const post = useMemo(() => {
    return blogPosts.find((p) => p.slug === slug);
  }, [slug]);

  const currentIndex = useMemo(() => {
    return blogPosts.findIndex((p) => p.slug === slug);
  }, [slug]);

  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const categoryColors = {
    'Data Architecture': 'bg-accent-blue/10 text-accent-blue border-accent-blue/30',
    'FP&A': 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/30',
    'AI & BI': 'bg-accent-gold/10 text-accent-gold border-accent-gold/30',
  };

  if (!post) {
    return (
      <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-text-primary mb-4">Post not found</h1>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </main>
    );
  }

  const parsedContent = parseMarkdown(post.content);

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back to all posts</span>
          </Link>
        </AnimatedSection>

        {/* Post Header */}
        <AnimatedSection className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider border ${
              categoryColors[post.category] || 'bg-bg-secondary text-text-secondary border-border-color'
            }`}>
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
            {post.title}
          </h1>

          <p className="text-text-muted text-sm">{post.date}</p>
        </AnimatedSection>

        {/* Post Content */}
        <AnimatedSection delay={0.2}>
          <article
            className="prose prose-invert prose-lg max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </AnimatedSection>

        {/* Disclaimer */}
        <AnimatedSection delay={0.3}>
          <div className="card mb-16 bg-accent-blue/5 border-accent-blue/20">
            <div
              className="text-xs text-text-muted leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: blogDisclaimer
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n/g, '<br/>')
              }}
            />
          </div>
        </AnimatedSection>

        {/* Navigation */}
        <AnimatedSection delay={0.4}>
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="flex-1 card group hover:border-accent-blue/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-accent-blue text-sm mb-2">
                  <ArrowLeftIcon size={14} />
                  <span className="font-mono text-xs uppercase tracking-wider">Previous</span>
                </div>
                <h3 className="font-heading font-semibold text-base text-text-primary group-hover:text-accent-blue transition-colors line-clamp-2">
                  {prevPost.title}
                </h3>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="flex-1 card group hover:border-accent-blue/50 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-2 text-accent-blue text-sm mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider">Next</span>
                  <ArrowRight size={14} />
                </div>
                <h3 className="font-heading font-semibold text-base text-text-primary group-hover:text-accent-blue transition-colors line-clamp-2">
                  {nextPost.title}
                </h3>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default BlogPostPage;
