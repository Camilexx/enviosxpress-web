---
name: seo-masterclass
description: Implement advanced SEO for maximum organic visibility. Covers technical SEO, on-page optimization, meta tags, structured data, sitemap, robots.txt, Core Web Vitals, and content strategy for Next.js applications.
---

# 🔍 SEO Masterclass Skill

> Drive organic traffic with technical and on-page SEO best practices.
> Specific patterns for Next.js App Router applications.

---

## Quick Reference

```
SEO PRIORITY ORDER:
1. Technical SEO   → Can Google crawl and index your site?
2. Core Web Vitals → Is the experience fast and stable?
3. On-Page SEO     → Are titles, descriptions, headings optimized?
4. Structured Data → Does Google understand your content?
5. Content         → Is it valuable, unique, and keyword-targeted?
```

---

## Technical SEO

### Metadata Template (Next.js)

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://tudominio.com'),
  title: {
    template: '%s | Tu Marca',
    default: 'Tu Marca — Propuesta de valor principal',
  },
  description: 'Descripción de 150-160 caracteres con keyword principal y CTA.',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  authors: [{ name: 'Tu Marca' }],
  creator: 'Tu Marca',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tudominio.com',
    siteName: 'Tu Marca',
    title: 'Tu Marca — Propuesta de valor',
    description: 'Descripción OG optimizada para compartir.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tu Marca' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tu Marca',
    description: 'Descripción para Twitter.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-verification-code',
  },
};
```

### Sitemap

```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tudominio.com';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Dynamic pages (blog posts, products, etc.)
  // const posts = await getBlogPosts();
  // const dynamicPages = posts.map(post => ({
  //   url: `${base}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }));

  return [...staticPages];
}
```

### Robots.txt

```tsx
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/settings/', '/admin/'],
      },
    ],
    sitemap: 'https://tudominio.com/sitemap.xml',
  };
}
```

---

## Structured Data (JSON-LD)

### Organization

```tsx
// components/structured-data.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tu Marca',
    url: 'https://tudominio.com',
    logo: 'https://tudominio.com/logo.png',
    sameAs: [
      'https://twitter.com/tumarca',
      'https://instagram.com/tumarca',
      'https://facebook.com/tumarca',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+593-XXX-XXXXXX',
      contactType: 'customer service',
      availableLanguage: ['Spanish'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Product/Service

```tsx
export function ProductSchema({ product }: { product: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### FAQ Schema

```tsx
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## On-Page SEO Checklist

### Per Page
- [ ] Unique, descriptive `<title>` tag (50-60 chars)
- [ ] Compelling meta description (150-160 chars)
- [ ] Single `<h1>` with primary keyword
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skipping)
- [ ] Alt text on all images (descriptive, not keyword-stuffed)
- [ ] Internal links to related pages
- [ ] External links to authoritative sources (open in new tab)
- [ ] URL is clean, readable, keyword-relevant
- [ ] Content is unique (not duplicated from other pages)
- [ ] Canonical URL set correctly

### Images
```tsx
// Always use next/image for automatic optimization
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Descripción clara y específica de la imagen"
  width={1200}
  height={630}
  priority  // for above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### URL Structure
```
GOOD URLs:
✅ /pricing
✅ /blog/como-enviar-paquetes-ecuador
✅ /servicios/envios-nacionales

BAD URLs:
❌ /page?id=123
❌ /blog/post-123456
❌ /p/aB3cDe
```

---

## Core Web Vitals Optimization

### LCP (Largest Contentful Paint) < 2.5s
```
CHECKLIST:
- [ ] Hero image uses priority loading
- [ ] Fonts preloaded with font-display: swap
- [ ] No render-blocking CSS/JS
- [ ] Server-side rendering for main content
- [ ] CDN for static assets
```

### CLS (Cumulative Layout Shift) < 0.1
```
CHECKLIST:
- [ ] Images have explicit width/height
- [ ] Fonts have fallback with similar metrics
- [ ] Dynamic content has reserved space
- [ ] No ads or embeds that shift layout
- [ ] Skeleton loaders match final layout
```

### FID/INP (Interaction to Next Paint) < 200ms
```
CHECKLIST:
- [ ] No heavy JavaScript on page load
- [ ] Event handlers are debounced/throttled
- [ ] React Server Components used where possible
- [ ] Code-split heavy components with dynamic()
- [ ] Third-party scripts loaded with strategy="lazyOnload"
```

---

## SEO Audit Checklist

- [ ] Google Search Console connected and verified
- [ ] Sitemap.xml generated and submitted
- [ ] Robots.txt allows important pages, blocks admin/API
- [ ] All pages return 200 status (no broken links)
- [ ] 301 redirects for any moved pages
- [ ] HTTPS enforced (no mixed content)
- [ ] Mobile-friendly (responsive design)
- [ ] Page speed score 90+ on PageSpeed Insights
- [ ] Structured data validates in Rich Results Test
- [ ] Canonical tags prevent duplicate content
- [ ] Hreflang tags for multilingual content
- [ ] Social media previews work (check with Facebook Debugger)
