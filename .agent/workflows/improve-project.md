---
description: How to improve an existing project using the Antigravity Skills Arsenal
---

# 🔧 Improve Project Workflow

Follow these steps to systematically improve an existing web project.

## Step 1: Understand Current State

1. Read the project's `claude.md` (if it exists) for context
2. Review the project file structure to understand the architecture
3. Check `package.json` for current dependencies and scripts
4. Run the project locally to see current state:
   ```bash
   npm run dev
   ```

## Step 2: Run Full Audit

5. Execute the `/audit-site` workflow on the live/local site
6. Review all audit findings and prioritize issues

## Step 3: Prioritize Improvements

7. Categorize findings into:
   - **P0 (Critical):** Broken functionality, security issues, major UX problems
   - **P1 (Important):** Performance issues, accessibility violations, SEO gaps
   - **P2 (Nice-to-have):** Design polish, micro-animations, content improvements

## Step 4: Execute Improvements

### For Design Issues:
8. **Read the `design-system-pro` skill**
9. Implement design tokens if missing
10. Fix color contrast issues
11. Fix typography inconsistencies
12. Add missing component states (hover, loading, error)
13. Add dark mode if missing

### For Performance Issues:
14. **Read the `performance-audit` skill**
15. Optimize images (next/image, WebP, lazy loading)
16. Optimize fonts (next/font, limit weights)
17. Code-split heavy components
18. Add proper caching headers

### For SEO Issues:
19. **Read the `seo-masterclass` skill**
20. Fix title tags and meta descriptions
21. Fix heading hierarchy
22. Add structured data (JSON-LD)
23. Generate sitemap and robots.txt

### For Conversion Issues:
24. **Read the `landing-page-cro` skill** and `copywriting-pro` skill
25. Improve hero headline with proven formula
26. Add or improve social proof
27. Optimize CTA copy and placement
28. Add FAQ section for objection handling

### For Code Quality:
29. **Read the `nextjs-fullstack` skill** code quality rules
30. Fix TypeScript errors (eliminate `any`)
31. Extract components over 150 lines
32. Add error boundaries
33. Add loading states

## Step 5: Verify & Document

// turbo
34. Run tests to verify nothing is broken:
    ```bash
    npm test
    ```
// turbo
35. Run Lighthouse again — compare before/after scores
36. Update `claude.md` with:
    - Changes made
    - Decisions and rationale
    - Before/after metrics
    - Remaining improvements for next iteration
