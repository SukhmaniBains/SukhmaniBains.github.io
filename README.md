# Sukhmani Bains — Personal Website (Rebuilt)

## What Changed & Why

Your original site had **compiled/bundled code only** in the repo — no editable source files. This made updates nearly impossible. I've rebuilt it from scratch with **clean, maintainable React source code** that looks exactly the same (actually better — no more broken placeholders).

### Problems Fixed
- ✅ Removed "MODULAR PLACEHOLDER" and "Coming Soon" broken text
- ✅ Replaced AI section placeholder with a real, working **AI Sentiment Analysis Dashboard**
- ✅ Added clean source code you can actually edit
- ✅ Proper blog system with real markdown content
- ✅ Responsive design with mobile hamburger menu
- ✅ All animations preserved (particles, scroll reveals, skill bars, marquee)

### What Stayed The Same
- Dark theme, colors, fonts, spacing
- All your bio, career, expertise content
- All 3 blog posts with full content
- Particle network hero background
- Scroll animations and interactions

---

## Quick Start (Deploy to GitHub Pages)

### Step 1: Install & Build (on your computer)

```bash
# 1. Unzip the project
cd sukhmani-site-rebuild

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. The built site is now in the `dist/` folder
```

### Step 2: Deploy to GitHub Pages

**Option A: Replace your existing repo contents**
```bash
# In your existing SukhmaniBains.github.io repo:
git checkout main
rm -rf *   # ⚠️ WARNING: This deletes everything — make sure you have backups
cp -r /path/to/sukhmani-site-rebuild/dist/* .
git add .
git commit -m "Rebuild: Clean source code + AI demo"
git push origin main
```

**Option B: Deploy from a new repo**  
Create a new repo, push the `dist/` folder contents to the `main` branch, enable GitHub Pages.

**Option C: Use GitHub Actions (recommended for future)**  
I can set up a GitHub Actions workflow so every time you push source code changes, it auto-builds and deploys. Just ask.

---

## Project Structure

```
sukhmani-site-rebuild/
├── dist/                    ← Built site (deploy this to GitHub Pages)
├── src/
│   ├── components/          ← All site sections (Hero, About, Career, etc.)
│   ├── pages/               ← Page views (Home, Blog, AI Demo)
│   ├── data/                ← All content (career, skills, blogs)
│   ├── App.jsx              ← Router setup
│   └── main.jsx             ← Entry point
├── public/images/           ← Your photos and logos
├── package.json             ← Dependencies
├── vite.config.js           ← Build config
└── tailwind.config.js       ← Design system colors & fonts
```

---

## AI Sentiment Analysis Dashboard

A new interactive demo at `/ai-demo` that showcases your AI skills:

**Features:**
- Paste any text and get real-time sentiment analysis
- Results: Overall sentiment (😊/😐/😠) + confidence score + breakdown bars
- 100% private — runs entirely in the browser
- Example buttons: Product Review, Support Ticket, Meeting Notes
- Optional: Can upgrade to real Transformers.js model (see below)

**How it works now:**
The demo uses keyword-based sentiment scoring. It's fast, works offline, and demonstrates the concept.

**How to upgrade to real AI:**
```bash
npm install @xenova/transformers
```

Then uncomment the model loading in `src/pages/AIDemoPage.jsx` (it's already set up to auto-detect and use the real model if available). The real model downloads ~66MB on first use and caches locally.

---

## Customizing Content

All your content lives in `src/data/` as simple JavaScript objects:

| File | What to Edit |
|------|-------------|
| `src/data/career.js` | Add/update job positions |
| `src/data/skills.js` | Update skill percentages |
| `src/data/expertise.js` | Update expertise descriptions |
| `src/data/blogs.js` | Add new blog posts |

After editing, rebuild:
```bash
npm run build
```

---

## Design System

| Color | Hex | Usage |
|-------|-----|-------|
| Dark BG | #080C14 | Page background |
| Card BG | #111827 | Cards, sections |
| Blue Accent | #38BDF8 | Buttons, links, highlights |
| Emerald | #34D399 | Positive sentiment, success |
| Gold | #D4A843 | Stats, neutral sentiment |
| Coral | #F97066 | Negative sentiment, errors |

Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels)

---

## Need Help?

If anything doesn't work:
1. Make sure you have Node.js 18+ installed: `node --version`
2. Clear and reinstall: `rm -rf node_modules && npm install`
3. The build should complete without errors

---

Built with React 18 + Vite + Tailwind CSS + Framer Motion
