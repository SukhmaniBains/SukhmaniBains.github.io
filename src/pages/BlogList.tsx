import { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowRight, Shield, Tag } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  excerpt: string;
}

interface BlogManifest {
  disclaimer: string;
  posts: BlogPost[];
}

export default function BlogList() {
  const [manifest, setManifest] = useState<BlogManifest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blogs/blogs.json')
      .then((r) => r.json())
      .then((data) => { setManifest(data); setLoading(false); })
      .catch(() => setLoading(false));
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '60vh', background: '#080C14' }}>
        <div className="animate-pulse text-body-lg" style={{ color: '#94A3B8' }}>Loading stories...</div>
      </div>
    );
  }

  if (!manifest) return null;

  const featured = manifest.posts.find((p) => p.featured);
  const regular = manifest.posts.filter((p) => !p.featured);

  return (
    <div style={{ background: '#080C14', minHeight: '100vh', paddingTop: '120px', paddingBottom: 'var(--space-2xl)' }}>
      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 var(--container-pad)' }}>
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <p className="text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>BLOG</p>
          <h1 className="text-h1 font-heading" style={{ color: '#F8FAFC', marginBottom: '16px' }}>Field Notes</h1>
          <p className="text-body-lg" style={{ color: '#94A3B8', maxWidth: '640px' }}>
            Stories from the front lines of data leadership — lessons learned, battles fought, and the future being built.
          </p>
        </div>

        <div className="flex items-start" style={{ gap: '12px', background: 'rgba(56,189,248,0.04)', border: '1px solid rgba(56,189,248,0.12)', borderRadius: '12px', padding: '16px 20px', marginBottom: 'var(--space-xl)' }}>
          <Shield size={18} style={{ color: '#38BDF8', flexShrink: 0, marginTop: '2px' }} />
          <p className="text-body-sm" style={{ color: '#94A3B8', lineHeight: 1.6 }}>{manifest.disclaimer}</p>
        </div>

        {featured && (
          <a href={`/#/blog/${featured.slug}`} className="block transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, rgba(13,18,32,0.95) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid var(--border-active)', borderRadius: '16px', overflow: 'hidden', marginBottom: 'var(--space-xl)' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(56,189,248,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div style={{ padding: '48px' }}>
                <div className="flex items-center" style={{ gap: '12px', marginBottom: '20px' }}>
                  <span className="text-label" style={{ background: 'rgba(212,168,67,0.12)', color: '#D4A843', padding: '4px 12px', borderRadius: '100px' }}>FEATURED STORY</span>
                  {featured.tags.map((tag) => <span key={tag} className="text-label" style={{ color: '#475569' }}>{tag}</span>)}
                </div>
                <h2 className="text-h2 font-heading" style={{ color: '#F8FAFC', marginBottom: '12px' }}>{featured.title}</h2>
                <p className="text-body-lg" style={{ color: '#94A3B8', marginBottom: '24px' }}>{featured.subtitle}</p>
                <p className="text-body" style={{ color: '#94A3B8', marginBottom: '24px', lineHeight: 1.7 }}>{featured.excerpt}</p>
                <div className="flex items-center" style={{ gap: '24px' }}>
                  <div className="flex items-center" style={{ gap: '6px', color: '#475569' }}><Calendar size={14} /><span className="text-body-sm">{featured.date}</span></div>
                  <div className="flex items-center" style={{ gap: '6px', color: '#475569' }}><Clock size={14} /><span className="text-body-sm">{featured.readTime}</span></div>
                </div>
                <div className="inline-flex items-center" style={{ gap: '6px', color: '#38BDF8', marginTop: '20px' }}>
                  <span className="text-body-sm font-semibold">Read Story</span><ArrowRight size={16} />
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.05) 0%, rgba(212,168,67,0.05) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px', minHeight: '300px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="font-heading" style={{ fontSize: '72px', fontWeight: 700, color: 'rgba(56,189,248,0.1)', lineHeight: 1 }}>{featured.readTime.split(' ')[0]}</div>
                  <p className="text-label" style={{ color: '#475569', marginTop: '8px' }}>MIN READ</p>
                </div>
              </div>
            </div>
          </a>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
          {regular.map((post) => (
            <a key={post.slug} href={`/#/blog/${post.slug}`} className="block transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, rgba(13,18,32,0.95) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-active)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(56,189,248,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div className="flex items-center flex-wrap" style={{ gap: '8px', marginBottom: '16px' }}>
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center text-label" style={{ background: 'rgba(56,189,248,0.08)', color: '#38BDF8', padding: '3px 10px', borderRadius: '100px', fontSize: '11px' }}>
                    <Tag size={10} style={{ marginRight: '4px' }} />{tag}
                  </span>
                ))}
              </div>
              <h3 className="text-h4 font-heading" style={{ color: '#F8FAFC', marginBottom: '8px' }}>{post.title}</h3>
              <p className="text-body-sm" style={{ color: '#94A3B8', marginBottom: '16px', lineHeight: 1.6 }}>{post.subtitle}</p>
              <p className="text-body-sm" style={{ color: '#475569', marginBottom: '20px', lineHeight: 1.6 }}>{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center" style={{ gap: '16px' }}>
                  <div className="flex items-center" style={{ gap: '4px', color: '#475569' }}><Calendar size={12} /><span className="text-label">{post.date}</span></div>
                  <div className="flex items-center" style={{ gap: '4px', color: '#475569' }}><Clock size={12} /><span className="text-label">{post.readTime}</span></div>
                </div>
                <ArrowRight size={16} style={{ color: '#38BDF8' }} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
