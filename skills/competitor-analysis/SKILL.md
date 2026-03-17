---
name: competitor-analysis
description: Analyze competitor websites systematically. Extract design patterns, tech stack, SEO strategy, conversion tactics, and performance metrics. Use findings to build superior products.
---

# 🔎 Competitor Analysis Skill

> Study competitors systematically to build something better.
> Extract patterns, not copy — then differentiate.

---

## Quick Reference

```
ANALYSIS FRAMEWORK:
1. VISUAL AUDIT     → Design, layout, colors, typography
2. TECH STACK       → Framework, hosting, tools
3. SEO ANALYSIS     → Keywords, structure, content strategy
4. CRO PATTERNS     → Conversion tactics, CTAs, pricing
5. PERFORMANCE      → Speed, Core Web Vitals
6. DIFFERENTIATION  → What they miss that you can own
```

---

## Step 1: Visual & UX Audit

### Checklist Per Competitor
```
HOMEPAGE:
- [ ] Hero section: headline formula? CTA placement?
- [ ] Navigation: items, structure, CTA in nav?
- [ ] Color palette: primary, secondary, neutrals
- [ ] Typography: fonts used (check with WhatFont)
- [ ] Layout: grid structure, whitespace usage
- [ ] Animations: scroll effects, hover states
- [ ] Mobile: responsive? Progressive? App-like?
- [ ] Dark mode: available?
- [ ] Trust signals: logos, testimonials, badges

PAGES TO ANALYZE:
- [ ] Homepage (hero, features, social proof)
- [ ] Pricing page (plans, toggle, comparison)
- [ ] Login/Register (fields, OAuth options)
- [ ] Dashboard (if accessible via free trial)
- [ ] Blog/Resources (content strategy)
```

---

## Step 2: Tech Stack Detection

### Tools
```
BROWSER EXTENSIONS:
├── Wappalyzer → Detect frameworks, CMS, analytics
├── BuiltWith  → Full technology profile
└── WhatFont   → Identify fonts in use

ONLINE TOOLS:
├── builtwith.com/[domain]
├── pagespeed.web.dev → Performance metrics
├── securityheaders.com → Security header check
└── web.archive.org → Historical changes
```

### Common Stacks to Identify
```
STACK PATTERNS:
├── Next.js + Vercel:  Check _next/ in URLs, X-Vercel header
├── React SPA:         Check for root div, bundle names
├── WordPress:         /wp-content/ in source
├── Webflow:           webflow.io in source
├── Shopify:           cdn.shopify.com
└── Custom:            No obvious framework markers
```

---

## Step 3: SEO Competitive Analysis

### What to Extract
```
FOR EACH COMPETITOR:
├── Title tag format (check <title>)
├── Meta description strategy
├── Heading structure (h1, h2, h3 hierarchy)
├── URL structure (/blog/category/post-slug)
├── Internal linking strategy
├── Schema markup (JSON-LD in source)
├── Blog content: topics, frequency, length
├── Keyword focus (what they rank for)
└── Domain authority (check with Ahrefs/Moz)
```

### Keyword Gap Analysis
```
STEPS:
1. List competitor's top 20 organic pages (use Ahrefs/SEMrush free tier)
2. Identify keywords they rank for that you don't
3. Group by intent: informational, transactional, navigational
4. Prioritize: high volume + low difficulty + high relevance
5. Create content plan targeting those gaps
```

---

## Step 4: CRO Pattern Extraction

### What Converts
```
EXTRACT THESE PATTERNS:
├── Hero: What's their headline formula?
├── Social proof: What type? Where placed?
├── Pricing: How many plans? What's featured?
├── CTA: Copy, color, placement, frequency
├── Forms: How many fields? What do they ask?
├── Urgency: Limited time? Limited seats? Counter?
├── Risk reversal: Guarantee? Free trial? Refund?
├── Onboarding: How many steps? What's first ask?
└── Exit strategy: Exit intent popup? Downsell?
```

---

## Step 5: Performance Benchmark

```
TEST EACH COMPETITOR:
├── Google PageSpeed Insights score
├── TTFB (Time to First Byte)
├── LCP (Largest Contentful Paint)
├── Bundle size (check Network tab)
├── Number of HTTP requests
├── Image optimization (WebP? Lazy loaded?)
└── Mobile performance vs desktop
```

---

## Step 6: Differentiation Matrix

### Build Your Strategy
```
COMPETITOR COMPARISON TABLE:

| Feature          | Competitor A | Competitor B | YOUR APP  |
|-----------------|-------------|-------------|-----------|
| Speed (LCP)     | 3.2s        | 2.1s        | < 1.5s ✨ |
| Dark mode       | ❌          | ✅          | ✅        |
| Mobile UX       | Basic       | Good        | Premium ✨|
| Pricing clarity | Confusing   | Clear       | Clearest ✨|
| [Your strength] | ❌          | ❌          | ✅ ✨     |

✨ = Areas where you should excel (your differentiators)
```

### Differentiation Strategies
```
1. SPEED:      Be faster than all competitors
2. DESIGN:     Be more polished and modern
3. SIMPLICITY: Be easier to use (fewer clicks)
4. PRICE:      Be more affordable (or more premium)
5. FEATURE:    Offer something they don't
6. NICHE:      Serve a specific audience better
7. TRUST:      More transparent, more social proof
8. SUPPORT:    Faster, more personal support
```

---

## Output Template

After analysis, produce a structured report:

```markdown
# Competitor Analysis: [Your Project Name]
Date: [Date]

## Competitors Analyzed
1. [Name] — [URL] — [One-line description]
2. [Name] — [URL] — [One-line description]
3. [Name] — [URL] — [One-line description]

## Key Findings
### What they do well (steal these patterns):
- ...

### What they do poorly (your opportunities):
- ...

### Gaps in the market:
- ...

## Differentiation Strategy
Our app will stand out by:
1. ...
2. ...
3. ...

## Action Items
- [ ] Implement [pattern] from Competitor A
- [ ] Avoid [mistake] that Competitor B makes
- [ ] Own [niche/feature] that nobody offers
```
