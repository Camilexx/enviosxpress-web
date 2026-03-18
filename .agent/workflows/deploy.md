---
description: How to deploy a Next.js application to production on Vercel
---

# 🚀 Deploy Workflow

Follow these steps to deploy your application to production.

## Pre-flight Checks

1. Ensure all tests pass:
   ```bash
   npm test
   ```
// turbo
2. Ensure TypeScript compiles without errors:
   ```bash
   npx tsc --noEmit
   ```
// turbo
3. Ensure the build succeeds locally:
   ```bash
   npm run build
   ```
4. Ensure `.env.example` is up to date with all variables

## GitHub Setup

5. Initialize git repository (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
6. Create GitHub repository using the GitHub MCP tool
7. Push code to GitHub:
   ```bash
   git remote add origin https://github.com/[owner]/[repo].git
   git push -u origin main
   ```

## Vercel Setup

8. Go to vercel.com and import the GitHub repository
9. Configure the following environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_APP_URL` → Your production domain
   - `DATABASE_URL` → Production database URL
   - `NEXT_PUBLIC_SUPABASE_URL` → Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` → Supabase service role key
   - `AUTH_SECRET` → Generate with `openssl rand -base64 32`
   - `STRIPE_SECRET_KEY` → Production Stripe key
   - `STRIPE_WEBHOOK_SECRET` → Production webhook secret
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → Publishable key
   - `RESEND_API_KEY` → Resend API key
   - `SENTRY_DSN` → Sentry DSN

## Post-Deploy

10. Verify the production site loads correctly
11. Test critical flows:
    - [ ] Homepage loads
    - [ ] Registration works
    - [ ] Login works
    - [ ] Dashboard loads
    - [ ] Stripe checkout redirects correctly
12. Set up Stripe production webhook pointing to `https://yourdomain.com/api/stripe/webhook`
13. Connect custom domain in Vercel → Settings → Domains
14. Verify SSL certificate is active
15. Test social sharing preview (paste URL in X, WhatsApp, Facebook)
16. Submit sitemap to Google Search Console

## Monitoring

17. Verify Sentry is receiving events (check Sentry dashboard)
18. Verify Vercel Analytics is collecting data
19. Set up uptime monitoring (UptimeRobot or similar — free tier)
