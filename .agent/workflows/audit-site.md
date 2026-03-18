---
description: How to audit an existing website for design, performance, SEO, and conversion issues
---

# 🔍 Audit Site Workflow

Follow these steps to perform a comprehensive audit of an existing website.

## Step 1: Gather Information

1. Get the live URL of the site to audit
2. Open the site in the browser and take a screenshot
3. Check all pages by navigating through the site

## Step 2: Performance Audit

// turbo
4. Run Lighthouse in browser DevTools (Performance, A11y, Best Practices, SEO)
5. Record scores:
   - Performance: ___
   - Accessibility: ___
   - Best Practices: ___
   - SEO: ___
6. Check Core Web Vitals (FCP, LCP, CLS, TTFB)
7. Check bundle size in Network tab
8. Check image optimization (format, sizes, lazy loading)

## Step 3: Design Audit

9. **Read the `design-system-pro` skill** 50-point audit checklist
10. Run through Block A (Foundation): tokens, colors, typography, spacing
11. Run through Block B (Components): buttons, inputs, cards, navigation
12. Run through Block C (Pages): hero, pricing, auth, dashboard, 404
13. Run through Block D (Conversion): social proof, CTAs, trust signals
14. Run through Block E (Performance + A11y): keyboard nav, screen readers, touch targets

## Step 4: SEO Audit

15. **Read the `seo-masterclass` skill** audit checklist
16. Check title tags and meta descriptions on each page
17. Check heading structure (h1, h2, h3 hierarchy)
18. Check alt text on all images
19. Check sitemap.xml exists and is valid
20. Check robots.txt is configured correctly
21. Check structured data (JSON-LD) in page source
22. Check Open Graph tags with Facebook Debugger
23. Check canonical tags

## Step 5: Conversion Audit

24. **Read the `landing-page-cro` skill** conversion checklist
25. Is the value proposition clear in 5 seconds?
26. Is the CTA visible above the fold?
27. Is there social proof on the page?
28. Are objections addressed in FAQ?
29. How many form fields? Can any be removed?
30. Are trust signals present (guarantee, badges)?

## Step 6: Mobile Audit

31. Test on mobile viewport (375px width)
32. Check touch targets are 44x44px minimum
33. Check text is readable without zooming
34. Check forms are usable on mobile
35. Check navigation works (hamburger menu?)

## Step 7: Report

36. Create a summary document with:
    - Overall scores (Performance, A11y, SEO, Design)
    - Top 5 critical issues to fix immediately
    - Top 5 improvements for next iteration
    - Comparison with competitors (if available)
    - Specific action items with priority (P0, P1, P2)
