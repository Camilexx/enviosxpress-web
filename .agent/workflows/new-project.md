---
description: How to start a new web project from scratch using the Antigravity Skills Arsenal
---

# 🆕 New Project Workflow

Follow these steps in order to create a professional web application from scratch.

## Pre-flight

1. **Define project identity** — Name, type, audience, objective, competitors
2. **Read the `web-architecture` skill** for architecture patterns
3. **Read the `design-system-pro` skill** for UI foundations

## Phase 1: Architecture (Agent-01)

// turbo
4. Create project directory structure according to `web-architecture` skill Step 3
5. Initialize Next.js project:
   ```bash
   npx shadcn@latest init --name [project-name] --preset base-nova --template next
   ```
6. Install core dependencies from `nextjs-fullstack` skill Step 1
7. Create database schema following `supabase-backend` skill Step 2
8. Create `.env.example` with all needed variables

## Phase 2: Design System (Agent-02)

9. **Read the `design-system-pro` skill** for design tokens
10. Create `globals.css` with all CSS variables (tokens, colors, typography, spacing)
11. Choose color palette from `design-system-pro` Step 3
12. Choose font combination from `design-system-pro` Step 2
13. Configure fonts in root layout
14. Create base component styles (buttons, cards, inputs)

## Phase 3: Content & Copy (Agent-05)

15. **Read the `copywriting-pro` skill** for formulas
16. Write hero headline using PAS formula
17. Write feature bullets using FAB formula
18. Write CTA copy using VERB + BENEFIT formula
19. Write all UI microcopy (labels, errors, empty states)
20. Write SEO meta tags for all pages

## Phase 4: Landing Page (Agent-02 + Agent-04)

21. **Read the `landing-page-cro` skill** for section architecture
22. Build hero section with headline, CTA, and visual
23. Build social proof bar (logos/stats)
24. Build features section (3-6 benefits)
25. Build "how it works" section (3 steps)
26. Build testimonials section
27. Build pricing section with 3 plans
28. Build FAQ section
29. Build final CTA section
30. Build responsive navbar and footer

## Phase 5: Backend (Agent-03)

31. **Read the `supabase-backend` skill** for database setup
32. Set up Supabase project and configure clients
33. Apply database migrations
34. Implement authentication (login, register, forgot password)
35. Create middleware for route protection
36. **Read the `stripe-payments` skill** for Stripe setup
37. Implement Stripe checkout, webhooks, and customer portal
38. Set up email system (welcome, payment, password reset)

## Phase 6: Dashboard (Agent-04)

39. Build dashboard layout (sidebar + header)
40. Build main dashboard page (KPIs, recent activity)
41. Build settings pages (profile, billing, team)
42. Build onboarding wizard
43. Add loading states, error boundaries, and empty states
44. Add animations (page transitions, scroll reveals)

## Phase 7: Testing & QA (Agent-06)

45. **Read the `testing-qa` skill** for test setup
46. Write unit tests for utils and hooks
47. Write E2E tests for critical flows (auth, checkout)
48. Run accessibility audit
49. Run Lighthouse audit — target 95+ all categories
50. Fix any issues found

## Phase 8: Deploy (Agent-07)

51. **Read the `devops-deploy` skill** for CI/CD setup
52. Create GitHub Actions CI pipeline
53. Configure Vercel deployment
54. Set up Sentry error monitoring
55. Add security headers to vercel.json
56. Set all environment variables in production
57. Verify production deployment

## Phase 9: Final Audit (Agent-00)

58. Run the full 50-point audit from `design-system-pro` skill
59. Run the conversion checklist from `landing-page-cro` skill
60. Run the SEO checklist from `seo-masterclass` skill
61. Run the performance checklist from `performance-audit` skill
62. Update `claude.md` with project status and decisions
