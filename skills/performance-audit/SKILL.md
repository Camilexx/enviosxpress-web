---
name: performance-audit
description: Optimize web application performance for Lighthouse 95+ scores. Covers image optimization, font loading, bundle analysis, lazy loading, caching strategies, Core Web Vitals, and monitoring.
---

# ⚡ Performance Audit Skill

> Achieve Lighthouse scores of 95+ across all categories.
> Performance is UX — every millisecond matters for conversions.

---

## Quick Reference

```
PERFORMANCE BUDGET:
├── FCP (First Contentful Paint):    < 1.2s
├── LCP (Largest Contentful Paint):  < 2.5s
├── CLS (Cumulative Layout Shift):   < 0.1
├── TTFB (Time to First Byte):       < 200ms
├── INP (Interaction to Next Paint):  < 200ms
├── Initial Bundle Size:              < 100KB gzipped
├── Total Page Weight:                < 1.5MB
└── Lighthouse Score:                 95+ all categories

PRIORITY ORDER:
1. Reduce bundle size (biggest impact)
2. Optimize images (biggest bytes)
3. Optimize fonts (blocks rendering)
4. Add caching (repeat visits)
5. Lazy load below-fold content
```

---

## Image Optimization

### Next.js Image Component

```tsx
import Image from 'next/image';

// Above the fold — priority load
<Image
  src="/hero.webp"
  alt="Hero section image"
  width={1200}
  height={600}
  priority
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
/>

// Below the fold — lazy load with blur placeholder
<Image
  src="/feature.webp"
  alt="Feature illustration"
  width={600}
  height={400}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>
```

### Image Format Priority
```
1. AVIF → Best compression, growing support
2. WebP → Great compression, wide support
3. JPEG → Universal fallback for photos
4. PNG  → Only for images that need transparency
5. SVG  → Only for icons, logos, illustrations
```

### next.config.js Image Settings
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
};
```

---

## Font Optimization

```tsx
// ALWAYS use next/font — automatic optimization
import { Syne, DM_Sans } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',        // Prevents FOIT
  variable: '--font-display',
  preload: true,
  weight: ['600', '700', '800'],  // Only needed weights
});
```

### Font Loading Strategy
```
1. Use next/font (auto-preload, self-host, font-display: swap)
2. Limit to 2-3 font families max
3. Limit to 3-4 weights per family
4. Use variable fonts when available (1 file for all weights)
5. NEVER load from external CDN (Google Fonts CDN = extra DNS lookup)
```

---

## Bundle Optimization

### Code Splitting with dynamic()

```tsx
import dynamic from 'next/dynamic';

// Heavy components: charts, editors, maps
const Chart = dynamic(() => import('@/components/chart'), {
  loading: () => <div className="skeleton" style={{ height: 300 }} />,
  ssr: false, // Only if it truly needs browser APIs
});

// Modals and dialogs (loaded on interaction)
const SettingsDialog = dynamic(() => import('@/components/settings-dialog'));
```

### Analyzing Bundle Size

```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({/* your config */});

# Run analysis
ANALYZE=true npm run build
```

### Common Bundle Bloaters
```
REPLACE HEAVY LIBRARIES:
├── moment.js (330KB) → date-fns (tree-shakeable) or dayjs (2KB)
├── lodash (72KB)     → lodash-es (tree-shakeable) or native JS
├── axios (13KB)      → fetch (built-in)
├── fontawesome       → lucide-react (tree-shakeable)
└── chart.js          → recharts (smaller) + dynamic import
```

---

## Caching Strategy

### Next.js Headers

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/:path*.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
```

---

## Lazy Loading Patterns

### Intersection Observer (Vanilla JS)

```javascript
// Lazy load images, sections, iframes
const lazyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        // Lazy images
        if (el.dataset.src) {
          el.src = el.dataset.src;
          el.removeAttribute('data-src');
        }
        
        // Lazy sections
        el.classList.add('loaded');
        lazyObserver.unobserve(el);
      }
    });
  },
  { rootMargin: '200px' } // Start loading 200px before visible
);

document.querySelectorAll('[data-lazy]').forEach(el => lazyObserver.observe(el));
```

### Third-Party Script Loading

```tsx
import Script from 'next/script';

// Analytics — load after page is interactive
<Script src="https://..." strategy="afterInteractive" />

// Chat widget — load when idle
<Script src="https://..." strategy="lazyOnload" />

// Critical scripts only — load with page
<Script src="https://..." strategy="beforeInteractive" />
```

---

## Performance Audit Checklist

### Images
- [ ] All images use next/image component
- [ ] Above-fold images have `priority` attribute
- [ ] Below-fold images have `loading="lazy"`
- [ ] Images served in WebP/AVIF format
- [ ] Images have explicit width/height (prevents CLS)
- [ ] Use `sizes` attribute for responsive images
- [ ] SVGs for icons and illustrations (not PNGs)

### Fonts
- [ ] Using next/font (not external CDN link)
- [ ] Maximum 2-3 font families
- [ ] Maximum 3-4 weights per family
- [ ] `font-display: swap` on all fonts
- [ ] Subset to needed characters (latin)

### JavaScript
- [ ] Bundle size < 100KB gzipped (initial)
- [ ] Heavy components use dynamic() import
- [ ] No unused dependencies in package.json
- [ ] Third-party scripts use `strategy="lazyOnload"`
- [ ] Tree-shaking working (check with bundle analyzer)

### CSS
- [ ] No unused CSS rules
- [ ] Critical CSS inlined (Next.js does this automatically)
- [ ] Animations use transform/opacity only (GPU-accelerated)
- [ ] Prefer CSS animations over JS animations

### Server
- [ ] TTFB < 200ms
- [ ] Gzip/Brotli compression enabled
- [ ] CDN for static assets
- [ ] Cache headers set correctly
- [ ] HTTP/2 or HTTP/3 enabled

### Monitoring
- [ ] Lighthouse CI in CI/CD pipeline
- [ ] Real User Monitoring (Vercel Analytics or PostHog)
- [ ] Core Web Vitals tracked in Search Console
- [ ] Performance budgets set in build process
