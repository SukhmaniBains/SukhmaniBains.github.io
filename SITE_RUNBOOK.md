# Sukhmani Bains Portfolio — Site Runbook & Build Documentation

> **Last Updated:** 2026-04-30
> **Version:** 2.0 (Rebuild)
> **Live URL:** https://sukhmanibains.github.io/

---

## 1. What This Site Is

Personal portfolio website for **Sukhmani Bains**, a Data Strategy Leader. The site showcases 12+ years of experience in Sales, Finance, Marketing & Operations, with a focus on data leadership, BI architecture, and AI innovation.

### Key Sections
| Section | Content |
|---------|---------|
| **Hero** | Animated particle network, name, title, CTAs |
| **Impact Stats** | $15B+ pipeline, $40M savings, 50% close reduction, 20% accuracy |
| **About** | Bio, portrait, function pills (Sales, Finance, Marketing, Operations) |
| **Career** | 6 positions across Aptean, Mill Creek, FORTNA, Florida Blue |
| **Expertise** | 4 domains: Sales Intelligence, FP&A, Marketing Analytics, Operations |
| **Technical Mastery** | 15 skills across 3 categories with animated progress bars |
| **AI & Innovation** | 4 capability cards + **AI Sentiment Analysis Dashboard** demo |
| **Projects** | Dashboard gallery placeholder (expandable) |
| **Blog** | 3 full blog posts on data architecture, FP&A, AI strategy |
| **Contact** | LinkedIn, email, phone, open to opportunities |

### New Addition (v2.0)
- **AI Sentiment Analysis Dashboard** — Interactive browser-based NLP demo at `/#/ai-demo`
- Replaces old "COMING SOON" / "MODULAR PLACEHOLDER" text

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Routing | React Router (HashRouter for GitHub Pages) |
| AI Model | Keyword-based scoring (upgradeable to Transformers.js) |
| Deployment | GitHub Pages |

### Fonts
- **Headings:** Space Grotesk (Google Fonts)
- **Body:** Inter (Google Fonts)
- **Mono/Code:** JetBrains Mono (Google Fonts)

### Design System Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#080C14` | Page background |
| `--bg-secondary` | `#0D1220` | Card surfaces |
| `--bg-card` | `#111827` | Elevated cards |
| `--accent-blue` | `#38BDF8` | Primary buttons, links |
| `--accent-emerald` | `#34D399` | Positive sentiment, success |
| `--accent-gold` | `#D4A843` | Stats, highlights, neutral |
| `--accent-coral` | `#F97066` | Negative sentiment, errors |
| `--text-primary` | `#F8FAFC` | Headings |
| `--text-secondary` | `#94A3B8` | Body text |
| `--text-muted` | `#475569` | Labels |
| `--border` | `#1E293B` | Dividers, card borders |

---

## 3. Repository Structure

```
SukhmaniBains.github.io/
|
|-- main branch          ← GitHub Pages serves THIS (built files only)
|   |-- index.html
|   |-- assets/          ← JS/CSS bundles
|   |-- images/          ← Photos, logos, visuals
|   |-- .nojekyll        ← Required for GitHub Pages
|   `-- 404.html         ← SPA fallback
|
|-- source branch        ← EDIT THIS (full React source code)
|   |-- package.json
|   |-- vite.config.js
|   |-- tailwind.config.js
|   |-- index.html
|   |-- src/
|   |   |-- main.jsx           ← Entry point
|   |   |-- App.jsx            ← Router setup
|   |   |-- index.css          ← Global styles
|   |   |-- components/        ← All section components
|   |   |   |-- Navigation.jsx
|   |   |   |-- Hero.jsx
|   |   |   |-- ParticleBackground.jsx
|   |   |   |-- ImpactStats.jsx
|   |   |   |-- About.jsx
|   |   |   |-- Career.jsx
|   |   |   |-- Expertise.jsx
|   |   |   |-- TechnicalMastery.jsx
|   |   |   |-- AIInnovation.jsx      ← Contains demo showcase card
|   |   |   |-- Projects.jsx
|   |   |   |-- BlogSection.jsx
|   |   |   |-- Contact.jsx
|   |   |   |-- Footer.jsx
|   |   |   |-- AnimatedSection.jsx
|   |   |   |-- SkillBar.jsx
|   |   |   `-- Marquee.jsx
|   |   |-- pages/
|   |   |   |-- HomePage.jsx
|   |   |   |-- BlogListPage.jsx
|   |   |   |-- BlogPostPage.jsx
|   |   |   `-- AIDemoPage.jsx       ← AI Sentiment Dashboard
|   |   `-- data/               ← EDIT CONTENT HERE
|   |       |-- career.js
|   |       |-- skills.js
|   |       |-- expertise.js
|   |       `-- blogs.js
|   |-- public/images/
|   |   |-- sukhmani-portrait.jpg
|   |   |-- hero-bg.jpg
|   |   |-- dashboard-preview.jpg
|   |   |-- ai-visualization.jpg
|   |   `-- logos/
|   |       |-- logo-aptean.jpg
|   |       |-- logo-floridablue.jpg
|   |       |-- logo-fortna.jpg
|   |       `-- logo-millcreek.png
|   `-- README.md
```

**Important:** Always edit the `source` branch, then build and copy `dist/` to `main`.

---

## 4. How to Make Changes

### Quick Edit (Content Only)

All content lives in `src/data/` as simple JavaScript arrays/objects:

```bash
# 1. Clone the repo and switch to source branch
git clone https://github.com/SukhmaniBains/SukhmaniBains.github.io.git
cd SukhmaniBains.github.io
git checkout source

# 2. Install dependencies (first time only)
npm install

# 3. Edit content files:
#    - src/data/career.js      ← Add/update jobs
#    - src/data/skills.js      ← Update skill percentages
#    - src/data/expertise.js   ← Change expertise text
#    - src/data/blogs.js       ← Add blog posts

# 4. Build
npm run build

# 5. Copy dist to main branch and deploy
git checkout main
cp -r dist/* .
git add .
git commit -m "Update: [describe what changed]"
git push origin main

# 6. Don't forget to push source changes too!
git checkout source
git add .
git commit -m "Update: [same description]"
git push origin source
```

### Development Mode (Live Preview)

```bash
git checkout source
npm install
npm run dev     # Opens http://localhost:5173 with hot reload
# Make edits, see changes instantly
npm run build   # When ready to deploy
```

### Adding a New Blog Post

1. Open `src/data/blogs.js`
2. Add a new entry to the `posts` array:

```javascript
{
  slug: 'my-new-post',
  title: 'My New Post Title',
  description: 'Brief description for the card.',
  tag: 'Category',
  date: '2026-05-01',
  readTime: '5 min read',
  featured: false,
  content: `
# My New Post Title

Your **markdown** content here...

## Section Heading

More content...
  `
}
```

3. Rebuild and deploy.

---

## 5. AI Demo — How It Works

### Current Implementation
The AI Sentiment Dashboard uses **keyword-based sentiment scoring**:
- 20 positive keywords, 20 negative keywords
- Counts matches, calculates percentages
- Runs entirely in browser, instant results
- No dependencies, works offline

### Upgrade to Real AI (Optional)
To use a real DistilBERT transformer model:

```bash
# On the source branch:
npm install @xenova/transformers
npm run build
# Deploy as usual
```

The code automatically detects if Transformers.js is available and switches to the real model. The model (~66MB) downloads on first use and caches locally.

### AI Demo Features
- Text input with character counter
- 3 example buttons (Product Review, Support Ticket, Meeting Notes)
- Real-time sentiment analysis
- Results: Overall sentiment emoji + label + confidence
- Breakdown: 3 animated bars (Positive/Negative/Neutral)
- Privacy badge: "100% Private — runs in your browser"

---

## 6. Deployment History

| Date | Version | Changes |
|------|---------|---------|
| 2026-04-24 | 1.0 | Original site (compiled bundles only) |
| 2026-04-27 | 1.1 | Portrait fix, blog clickability fixes |
| **2026-04-30** | **2.0** | **Full rebuild: clean source + AI demo + removed placeholders** |

### Git Branches
| Branch | Purpose |
|--------|---------|
| `main` | Built site — GitHub Pages serves this |
| `source` | Editable React source code |

---

## 7. Common Issues & Fixes

### "Site not updating after push"
GitHub Pages can take 1-5 minutes to propagate. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac).

### "npm install fails"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Blog post not found"
Blog posts are in `src/data/blogs.js` (not separate files anymore). Make sure the slug matches the URL.

### "Images not loading"
Images must be in `public/images/` (source branch) or `images/` (main branch). Reference them as `/images/filename.jpg` in components.

---

## 8. Future Enhancement Ideas

### Quick Wins
- [ ] Add Google Analytics (`<script>` in `index.html`)
- [ ] Add Open Graph meta tags for LinkedIn sharing
- [ ] Add a downloadable PDF resume button

### AI Section Expansions
- [ ] Natural Language → SQL converter demo
- [ ] Smart Data Summarizer demo
- [ ] Add Hugging Face model for real AI (install `@xenova/transformers`)

### Content Updates
- [ ] Add speaking engagements / conferences section
- [ ] Add testimonials/recommendations
- [ ] Add case studies for each company

---

## 9. Contact Info (For the Site)

| Field | Value |
|-------|-------|
| Name | Sukhmani Bains |
| Email | sukh93@yahoo.com |
| Phone | 904-352-3005 |
| LinkedIn | linkedin.com/in/sukhmanibains |
| Location | Atlanta, GA |

---

## 10. Build Checklist (Use for Every Update)

Before deploying, verify:

- [ ] Edits made on `source` branch only
- [ ] `npm run build` completes with no errors
- [ ] `dist/` folder generated successfully
- [ ] Copied `dist/*` to `main` branch
- [ ] `.nojekyll` file exists on `main`
- [ ] Committed and pushed `main`
- [ ] Committed and pushed `source`
- [ ] Wait 2-5 minutes for GitHub Pages
- [ ] Test live site at https://sukhmanibains.github.io/
- [ ] Test AI demo at https://sukhmanibains.github.io/#/ai-demo
- [ ] Test blog links

---

*This runbook should be referenced every time the site is updated. Keep it in sync with actual changes.*
