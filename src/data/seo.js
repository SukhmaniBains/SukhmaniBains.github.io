// ============================================================================
// CENTRAL SEO CONFIGURATION FOR SUKHMANI BAINS PORTFOLIO
// ============================================================================
// This file contains ALL SEO metadata, keywords, and structured data.
// Update this file to change SEO across the entire site.
// Last Updated: 2026-05-01
// ============================================================================

export const siteConfig = {
  // Brand Identity
  name: 'Sukhmani Bains',
  title: 'Data Strategy Leader',
  tagline: 'At the intersection of Sales, Finance, Marketing & Operations - turning data into $100M+ decisions.',
  
  // Contact
  email: 'sukh93@yahoo.com',
  phone: '904-352-3005',
  linkedin: 'https://linkedin.com/in/sukhmanibains',
  location: {
    city: 'Atlanta',
    state: 'GA',
    country: 'US'
  },
  
  // Site
  url: 'https://sukhmanibains.github.io',
  image: '/images/sukhmani-portrait.jpg',
  logo: '/images/sukhmani-portrait.jpg',
  
  // Social
  twitterHandle: '@sukhmanibains', // Update if you have one
  
  // Publishing
  author: 'Sukhmani Bains',
  publisher: 'Sukhmani Bains',
  language: 'en-US',
  
  // Dates
  foundedDate: '2025-04-01',
  lastUpdated: '2026-05-01',
};

// ============================================================================
// KEYWORDS (Tiered by Priority)
// ============================================================================

export const keywords = {
  // Tier 1: Brand & Name (Own These)
  brand: [
    'Sukhmani Bains',
    'Sukhmani Bains data leader',
    'Sukhmani Bains Power BI',
    'Sukhmani Bains Microsoft Fabric',
    'Sukhmani Bains Atlanta',
    'Sukhmani Bains BI director',
  ],
  
  // Tier 2: Role & Title (Target for Rankings)
  roles: [
    'Data Strategy Leader',
    'Director of BI',
    'Head of Data',
    'Director of Business Intelligence',
    'Senior Director of Reporting & Analytics',
    'BI Director Atlanta',
    'Data Leader Atlanta',
    'Head of Data Atlanta',
    'Revenue Intelligence Leader',
    'FP&A Analytics Leader',
    'Data Transformation Leader',
  ],
  
  // Tier 3: Skills & Technology
  skills: [
    'Power BI Expert',
    'Microsoft Fabric Architect',
    'Microsoft Fabric Consultant',
    'Power BI Architect',
    'Snowflake SQL Data Leader',
    'SQL Data Architect',
    'Data Analytics Leader Power BI',
    'AI Data Strategy',
    'LLM Business Intelligence',
    'Tableau to Power BI Migration',
  ],
  
  // Tier 4: Achievement Keywords (Differentiators)
  achievements: [
    'BI director 15B pipeline visibility',
    'Data leader 40M interest savings',
    'Financial close reduction data leader',
    'Data leader Sales Finance Marketing Operations',
    'Medallion architecture Power BI',
    'Revenue Intelligence dashboard Power BI',
  ],
  
  // All combined for meta keywords tag
  all: [
    'Sukhmani Bains', 'Data Strategy Leader', 'Director of BI', 'Head of Data',
    'Power BI Expert', 'Microsoft Fabric Architect', 'SQL', 'Snowflake',
    'Revenue Intelligence', 'FP&A', 'Business Intelligence', 'Data Analytics',
    'Atlanta', 'Data Leader', 'BI Director', 'AI Strategy', 'LLM',
    'Data Architecture', 'ETL', 'Data Modeling', 'Pipeline Visibility',
    'Financial Planning', 'Dashboard Design', 'Enterprise Data',
  ].join(', '),
};

// ============================================================================
// PAGE-SPECIFIC META DATA
// ============================================================================

export const pageMeta = {
  home: {
    title: "Sukhmani Bains | Data Strategy Leader | Power BI & Microsoft Fabric Expert",
    description: "Sukhmani Bains is a Data Strategy Leader with 12+ years driving $15B pipeline visibility, $40M interest savings, and 50% financial close reduction. Expert in Power BI, Microsoft Fabric, SQL, and AI-enabled analytics.",
    keywords: keywords.all,
    ogImage: '/images/sukhmani-portrait.jpg',
    ogType: 'profile',
    schema: 'Person',
  },
  
  blog: {
    title: "Blog | Sukhmani Bains - Data Leadership & BI Strategy",
    description: "Insights on data architecture, financial planning & analysis, AI strategy, and business intelligence from a 12+ year data leader.",
    keywords: 'data leadership blog, BI strategy, data architecture, FP&A, AI in business intelligence',
    ogImage: '/images/dashboard-preview.jpg',
    ogType: 'website',
    schema: 'Blog',
  },
  
  aiDemo: {
    title: "AI Sentiment Analysis Dashboard | Sukhmani Bains",
    description: "Interactive browser-based NLP demo powered by Transformers.js. Analyze text sentiment in real-time - 100% private, no data leaves your device.",
    keywords: 'AI sentiment analysis, NLP demo, Transformers.js, natural language processing, browser AI',
    ogImage: '/images/ai-visualization.jpg',
    ogType: 'website',
    schema: 'WebApplication',
  },
};

// ============================================================================
// SCHEMA.ORG STRUCTURED DATA
// ============================================================================

// Person Schema (for homepage)
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  description: siteConfig.tagline,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.image}`,
  email: `mailto:${siteConfig.email}`,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.state,
    addressCountry: siteConfig.location.country,
  },
  sameAs: [
    siteConfig.linkedin,
  ],
  knowsAbout: [
    'Business Intelligence',
    'Power BI',
    'Microsoft Fabric',
    'SQL',
    'Snowflake',
    'Data Architecture',
    'Financial Planning & Analysis',
    'Revenue Intelligence',
    'AI Strategy',
    'LLM Applications',
    'Data Engineering',
    'ETL/ELT',
    'Dashboard Design',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Open to Opportunities',
    description: 'Seeking Head of Data, Director of BI, and Senior Director of Reporting & Analytics roles',
  },
  alumniOf: [
    { '@type': 'Organization', name: 'Aptean' },
    { '@type': 'Organization', name: 'Mill Creek Residential' },
    { '@type': 'Organization', name: 'FORTNA' },
    { '@type': 'Organization', name: 'Florida Blue' },
  ],
};

// WebSite Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${siteConfig.name} - ${siteConfig.title}`,
  url: siteConfig.url,
  description: siteConfig.tagline,
  author: {
    '@type': 'Person',
    name: siteConfig.name,
  },
  publisher: {
    '@type': 'Person',
    name: siteConfig.name,
  },
  inLanguage: siteConfig.language,
  dateModified: siteConfig.lastUpdated,
};

// ProfessionalService Schema (for career positioning)
export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${siteConfig.name} - Data Leadership Consulting`,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.image}`,
  description: 'Data strategy and business intelligence leadership services. Expert in Power BI, Microsoft Fabric, SQL, and enterprise data architecture.',
  provider: {
    '@type': 'Person',
    name: siteConfig.name,
  },
  areaServed: {
    '@type': 'City',
    name: 'Atlanta',
    containedInPlace: {
      '@type': 'State',
      name: 'Georgia',
    },
  },
  serviceType: [
    'Business Intelligence Strategy',
    'Data Architecture',
    'Power BI Implementation',
    'Microsoft Fabric Migration',
    'Revenue Intelligence',
    'Financial Planning & Analytics',
    'Data Engineering',
  ],
};

// BlogPosting Schema Generator (for individual blog posts)
export const generateBlogPostSchema = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  url: `${siteConfig.url}/#/blog/${post.slug}`,
  image: post.ogImage || `${siteConfig.url}/images/dashboard-preview.jpg`,
  author: {
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  publisher: {
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}${siteConfig.logo}`,
    },
  },
  datePublished: post.date,
  dateModified: post.date,
  articleSection: post.tag,
  keywords: post.keywords || keywords.all,
  inLanguage: siteConfig.language,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/#/blog/${post.slug}`,
  },
});

// BreadcrumbList Schema Generator
export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// ============================================================================
// SITEMAP DATA
// ============================================================================

export const sitemapUrls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/#/blog', priority: '0.8', changefreq: 'weekly' },
  { loc: '/#/ai-demo', priority: '0.7', changefreq: 'monthly' },
  { loc: '/#/blog/building-a-single-source-of-truth', priority: '0.6', changefreq: 'monthly' },
  { loc: '/#/blog/from-15-days-to-5', priority: '0.6', changefreq: 'monthly' },
  { loc: '/#/blog/why-every-data-leader-needs-an-ai-strategy', priority: '0.6', changefreq: 'monthly' },
];

// ============================================================================
// OPEN GRAPH / TWITTER CARD DEFAULTS
// ============================================================================

export const socialMeta = {
  og: {
    siteName: `${siteConfig.name} - ${siteConfig.title}`,
    locale: 'en_US',
    type: 'profile',
    profile: {
      firstName: 'Sukhmani',
      lastName: 'Bains',
      username: 'sukhmanibains',
      gender: 'male',
    },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sukhmanibains', // Update if you have a Twitter handle
    creator: '@sukhmanibains',
  },
};

// ============================================================================
// CAREER ACHIEVEMENTS (for rich snippets / featured content)
// ============================================================================

export const keyAchievements = [
  { metric: '$15B+', label: 'Global Pipeline Visibility Enabled' },
  { metric: '$40M', label: 'Interest Savings via Financial Visibility' },
  { metric: '50%', label: 'Financial Close Cycle Reduction' },
  { metric: '20%', label: 'Forecast Accuracy Improvement' },
];

export default {
  siteConfig,
  keywords,
  pageMeta,
  personSchema,
  websiteSchema,
  professionalServiceSchema,
  generateBlogPostSchema,
  generateBreadcrumbSchema,
  sitemapUrls,
  socialMeta,
  keyAchievements,
};
