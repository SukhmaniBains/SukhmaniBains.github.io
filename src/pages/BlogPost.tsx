import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { Calendar, Clock, ArrowLeft, Tag, User, Shield } from 'lucide-react';

interface BlogPostMeta {
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
  posts: BlogPostMeta[];
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState<BlogManifest | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      fetch('/blogs/blogs.json').then((r) => r.json()),
      fetch(`/blogs/${slug}.md`).then((r) => r.text()),
    ]).then(([manifestData, markdown]) => {
      setManifest(manifestData);
      marked.use(markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        },
      }));
      marked.setOptions({ breaks: true, gfm: true });
      setContent(marked.parse(markdown) as string);
      setLoading(false);
    }).catch(() => { setLoading(false); navigate('/blog'); });
  }, [slug, navigate]);

  const post = manifest?.posts.find((p) => p.slug === slug);
  if (loading) return <div className="flex items-center justify-center" style={{ minHeight: '60vh', background: '#080C14' }}><div className="animate-pulse text-body-lg" style={{ color: '#94A3B8' }}>Loading story...</div></div>;
  if (!post || !manifest) return null;

  return (
    <div style={{ background: '#080C14', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(180deg, #0D1220 0%, #080C14 100%)', borderBottom: '1px solid var(--border-subtle)', paddingTop: '120px', paddingBottom: 'var(--space-xl)' }}>
        <div className="mx-auto" style={{ maxWidth: '800px', padding: '0 var(--container-pad)' }}>
          <button onClick={() => navigate('/blog')} className="inline-flex items-center transition-colors duration-200"
            style={{ gap: '6px', color: '#94A3B8', marginBottom: '32px', cursor: 'pointer', background: 'none', border: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; }}>
            <ArrowLeft size={16} /><span className="text-body-sm">All Stories</span>
          </button>
          <div className="flex items-center flex-wrap" style={{ gap: '8px', marginBottom: '20px' }}>
            {post.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center text-label" style={{ background: 'rgba(56,189,248,0.08)', color: '#38BDF8', padding: '4px 12px', borderRadius: '100px', fontSize: '12px' }}>
                <Tag size={10} style={{ marginRight: '4px' }} />{tag}
              </span>
            ))}
          </div>
          <h1 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#F8FAFC', marginBottom: '16px' }}>{post.title}</h1>
          <p className="text-body-lg" style={{ color: '#94A3B8', marginBottom: '24px' }}>{post.subtitle}</p>
          <div className="flex items-center flex-wrap" style={{ gap: '20px' }}>
            <div className="flex items-center" style={{ gap: '6px', color: '#94A3B8' }}><User size={14} /><span className="text-body-sm">{post.author}</span></div>
            <div className="flex items-center" style={{ gap: '6px', color: '#475569' }}><Calendar size={14} /><span className="text-body-sm">{post.date}</span></div>
            <div className="flex items-center" style={{ gap: '6px', color: '#475569' }}><Clock size={14} /><span className="text-body-sm">{post.readTime}</span></div>
          </div>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: '800px', padding: 'var(--space-xl) var(--container-pad)' }}>
        <div className="flex items-start" style={{ gap: '12px', background: 'rgba(56,189,248,0.04)', border: '1px solid rgba(56,189,248,0.12)', borderRadius: '12px', padding: '16px 20px', marginBottom: 'var(--space-lg)' }}>
          <Shield size={16} style={{ color: '#38BDF8', flexShrink: 0, marginTop: '2px' }} />
          <p className="text-body-sm" style={{ color: '#94A3B8', lineHeight: 1.6 }}>{manifest.disclaimer}</p>
        </div>
        <article className="blog-post-content" dangerouslySetInnerHTML={{ __html: content }} />
        <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)' }}>
          <p className="text-body" style={{ color: '#94A3B8', marginBottom: '24px' }}>Thanks for reading. If this resonated with your experience, I'd love to hear from you.</p>
          <div className="flex items-center flex-wrap" style={{ gap: '12px' }}>
            <a href="https://www.linkedin.com/in/sukhmanibains/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-body-sm font-semibold uppercase"
              style={{ backgroundColor: '#38BDF8', color: '#080C14', borderRadius: '8px', padding: '12px 24px', letterSpacing: '0.05em', transition: 'all 0.25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0EA5E9'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#38BDF8'; }}>Connect on LinkedIn</a>
            <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-2 text-body-sm font-semibold uppercase"
              style={{ backgroundColor: 'transparent', color: '#94A3B8', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px 24px', letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#38BDF8'; e.currentTarget.style.color = '#38BDF8'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = '#94A3B8'; }}>
              <ArrowLeft size={16} />More Stories
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .blog-post-content { color: #94A3B8; font-size: 17px; line-height: 1.8; }
        .blog-post-content h1 { display: none; }
        .blog-post-content h2 { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: #F8FAFC; margin-top: 48px; margin-bottom: 20px; line-height: 1.2; letter-spacing: -0.01em; }
        .blog-post-content h3 { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 600; color: #F8FAFC; margin-top: 36px; margin-bottom: 16px; line-height: 1.3; }
        .blog-post-content p { margin-bottom: 20px; }
        .blog-post-content strong { color: #F8FAFC; font-weight: 600; }
        .blog-post-content blockquote { border-left: 3px solid #38BDF8; margin: 28px 0; padding: 16px 24px; background: linear-gradient(90deg, rgba(56,189,248,0.06) 0%, transparent 100%); border-radius: 0 8px 8px 0; font-style: italic; }
        .blog-post-content blockquote p { color: #CBD5E1; margin-bottom: 8px; }
        .blog-post-content blockquote p:last-child { margin-bottom: 0; }
        .blog-post-content ul, .blog-post-content ol { margin-bottom: 20px; padding-left: 24px; }
        .blog-post-content li { margin-bottom: 8px; }
        .blog-post-content li::marker { color: #38BDF8; }
        .blog-post-content code { background: rgba(56,189,248,0.08); color: #38BDF8; padding: 2px 8px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 14px; }
        .blog-post-content pre { background: #0D1220; border: 1px solid rgba(56,189,248,0.1); border-radius: 12px; padding: 20px; margin: 24px 0; overflow-x: auto; }
        .blog-post-content pre code { background: none; color: #94A3B8; padding: 0; font-size: 14px; line-height: 1.6; }
        .blog-post-content hr { border: none; border-top: 1px solid var(--border-subtle); margin: 40px 0; }
        .blog-post-content a { color: #38BDF8; text-decoration: none; transition: color 0.2s; }
        .blog-post-content a:hover { color: #0EA5E9; text-decoration: underline; }
      `}</style>
    </div>
  );
}
