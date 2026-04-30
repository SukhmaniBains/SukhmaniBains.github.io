import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  siteConfig,
  pageMeta,
  personSchema,
  websiteSchema,
  professionalServiceSchema,
  generateBlogPostSchema,
  generateBreadcrumbSchema,
  socialMeta,
} from '../data/seo';
import { posts } from '../data/blogs';

/**
 * SEO Component - Injects meta tags and JSON-LD structured data
 * Updates document head dynamically based on current route
 */
const SEO = () => {
  const location = useLocation();
  const canonicalUrl = `${siteConfig.url}${location.pathname}${location.hash}`;

  useEffect(() => {
    const path = location.pathname + location.hash;
    
    // Determine page config
    let meta = pageMeta.home;
    let schemas = [personSchema, websiteSchema, professionalServiceSchema];
    let breadcrumbs = [
      { name: 'Home', url: siteConfig.url },
    ];

    // Route-specific SEO
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const post = posts.find(p => p.slug === slug);
      if (post) {
        meta = {
          title: `${post.title} | ${siteConfig.name}`,
          description: post.description,
          keywords: `${post.tag}, ${post.keywords || pageMeta.blog.keywords}`,
          ogImage: post.ogImage || pageMeta.blog.ogImage,
          ogType: 'article',
          schema: 'BlogPosting',
        };
        schemas = [generateBlogPostSchema(post), websiteSchema];
        breadcrumbs = [
          { name: 'Home', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/#/blog` },
          { name: post.title, url: `${siteConfig.url}/#/blog/${post.slug}` },
        ];
      } else {
        meta = pageMeta.blog;
      }
    } else if (path === '/blog' || path === '/#/blog') {
      meta = pageMeta.blog;
      breadcrumbs = [
        { name: 'Home', url: siteConfig.url },
        { name: 'Blog', url: `${siteConfig.url}/#/blog` },
      ];
    } else if (path.startsWith('/ai-demo') || path.startsWith('/#/ai-demo')) {
      meta = pageMeta.aiDemo;
      breadcrumbs = [
        { name: 'Home', url: siteConfig.url },
        { name: 'AI Demo', url: `${siteConfig.url}/#/ai-demo` },
      ];
    }

    // Update document title
    document.title = meta.title;

    // Helper to set/update meta tag
    const setMetaTag = (selector, attr, attrValue, content) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Standard meta tags
    setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', meta.keywords);
    setMetaTag('meta[name="author"]', 'name', 'author', siteConfig.author);
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Open Graph meta tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType || socialMeta.og.type);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', socialMeta.og.siteName);
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', socialMeta.og.locale);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', `${siteConfig.url}${meta.ogImage || siteConfig.image}`);
    setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', `${siteConfig.name} - ${siteConfig.title}`);

    // OG Profile tags (for homepage)
    if (meta.ogType === 'profile') {
      setMetaTag('meta[property="og:profile:first_name"]', 'property', 'og:profile:first_name', socialMeta.og.profile.firstName);
      setMetaTag('meta[property="og:profile:last_name"]', 'property', 'og:profile:last_name', socialMeta.og.profile.lastName);
      setMetaTag('meta[property="og:profile:username"]', 'property', 'og:profile:username', socialMeta.og.profile.username);
    }

    // Twitter Card meta tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', socialMeta.twitter.card);
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', socialMeta.twitter.site);
    setMetaTag('meta[name="twitter:creator"]', 'name', 'twitter:creator', socialMeta.twitter.creator);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', `${siteConfig.url}${meta.ogImage || siteConfig.image}`);
    setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', `${siteConfig.name} - ${siteConfig.title}`);

    // Inject JSON-LD structured data
    const existingScript = document.getElementById('seo-schema-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    // Add breadcrumb schema if we have breadcrumbs
    if (breadcrumbs.length > 1) {
      schemas.push(generateBreadcrumbSchema(breadcrumbs));
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'seo-schema-jsonld';
    script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById('seo-schema-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location, canonicalUrl]);

  return null; // This component renders nothing visible
};

export default SEO;
