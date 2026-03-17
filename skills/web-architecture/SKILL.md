---
name: web-architecture
description: Plan and design professional web application architecture. Covers system design, tech stack selection, folder structure, data modeling, API design, auth strategy, and scalability planning.
---

# 🏗️ Web Architecture Skill

> Plan production-grade web applications before writing any code.
> This skill produces architecture documents, data models, and API specs.

---

## Quick Reference

```
WHEN TO USE THIS SKILL:
✅ Starting a new project from scratch
✅ Planning a major feature or module
✅ Evaluating tech stack decisions
✅ Designing database schema
✅ Planning API structure

DO NOT USE FOR:
❌ Fixing bugs in existing code
❌ Pure UI/styling work
❌ Content or copywriting
```

---

## Step 1: Project Classification

Before choosing any technology, classify the project:

| Type | Characteristics | Recommended Base |
|------|----------------|-----------------|
| **Landing Page** | Static, marketing, SEO-critical | Next.js (Static Export) or Astro |
| **SaaS App** | Auth, payments, dashboard, multi-tenant | Next.js App Router + Supabase |
| **E-commerce** | Products, cart, checkout, inventory | Next.js + Stripe + Supabase |
| **Dashboard** | Data-heavy, real-time, admin panel | Next.js + TanStack Query + Supabase |
| **Portfolio** | Personal brand, projects showcase | Astro or Next.js Static |
| **Multi-tool** | Landing + App (most common) | Next.js with route groups |

---

## Step 2: Tech Stack Selection Matrix

### The Standard Stack (battle-tested)

```
FRAMEWORK LAYER:
├── Next.js 14+ (App Router)     — Server components, streaming, SEO
├── TypeScript (strict mode)      — Type safety, no 'any' allowed
└── React 18+                     — UI rendering

UI LAYER:
├── shadcn/ui                     — Component primitives
├── Tailwind CSS v3/v4            — Utility-first styling
├── Framer Motion                 — Animations
├── Lucide React                  — Icon system
└── Google Fonts (Syne + Inter Display or DM Mono)

DATA LAYER:
├── Supabase (PostgreSQL)         — Database + Realtime
├── Prisma or Drizzle ORM         — Type-safe queries
├── Zod                           — Runtime validation
└── TanStack Query v5             — Client-side data fetching

AUTH LAYER:
├── Supabase Auth                 — Email/password + OAuth
├── NextAuth.js (optional)        — If multi-provider needed
└── JWT + httpOnly cookies        — Session management

PAYMENTS LAYER:
├── Stripe Checkout               — Payment processing
├── Stripe Customer Portal        — Subscription management
├── Stripe Webhooks               — Event handling
└── Stripe Billing                — Usage-based pricing

INFRASTRUCTURE:
├── Vercel                        — Hosting + Edge Functions
├── Upstash Redis                 — Rate limiting + caching
├── Resend + React Email          — Transactional emails
├── Uploadthing                   — File uploads
├── Sentry                        — Error tracking
└── PostHog                       — Analytics
```

### When to deviate from standard stack

| Scenario | Replace | With | Why |
|----------|---------|------|-----|
| Simple landing, no app logic | Next.js | Astro | Faster, zero JS by default |
| Need realtime heavily | TanStack Query | Supabase Realtime | Built-in subscriptions |
| Enterprise auth needs | Supabase Auth | Auth0/Clerk | SSO, organization management |
| Existing Postgres | Supabase | Direct Postgres + Prisma | Avoid migration |
| Very simple project | shadcn + Tailwind | Vanilla CSS | No build step overhead |

---

## Step 3: Project Structure

### Next.js App Router (Standard Structure)

```
project-root/
├── app/
│   ├── (marketing)/              # Route group: public pages
│   │   ├── page.tsx              # Landing page
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Marketing layout (navbar + footer)
│   │
│   ├── (auth)/                   # Route group: authentication
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Minimal auth layout
│   │
│   ├── (dashboard)/              # Route group: protected app
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard
│   │   ├── settings/
│   │   │   ├── page.tsx          # Profile settings
│   │   │   ├── billing/
│   │   │   │   └── page.tsx
│   │   │   └── team/
│   │   │       └── page.tsx
│   │   └── layout.tsx            # Dashboard layout (sidebar)
│   │
│   ├── api/
│   │   ├── stripe/
│   │   │   └── webhook/
│   │   │       └── route.ts      # Stripe webhook handler
│   │   └── [...catch]/
│   │       └── route.ts          # API catch-all for 404
│   │
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx             # Custom 404
│   ├── error.tsx                 # Global error boundary
│   ├── loading.tsx               # Global loading state
│   └── globals.css               # Global styles + CSS variables
│
├── components/
│   ├── ui/                       # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── layout/                   # Layout components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── mobile-nav.tsx
│   │
│   ├── forms/                    # Form components
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── contact-form.tsx
│   │
│   └── sections/                 # Page sections
│       ├── hero.tsx
│       ├── features.tsx
│       ├── pricing-table.tsx
│       ├── testimonials.tsx
│       └── cta.tsx
│
├── lib/
│   ├── db/
│   │   ├── schema.ts             # Database schema (Drizzle/Prisma)
│   │   ├── queries.ts            # Database queries
│   │   └── migrations/           # Migration files
│   │
│   ├── auth/
│   │   ├── config.ts             # Auth configuration
│   │   ├── middleware.ts          # Auth middleware helpers
│   │   └── session.ts            # Session management
│   │
│   ├── stripe/
│   │   ├── client.ts             # Stripe client init
│   │   ├── plans.ts              # Plan definitions
│   │   └── webhooks.ts           # Webhook handlers
│   │
│   ├── email/
│   │   ├── templates/            # React Email templates
│   │   └── send.ts               # Email sending utility
│   │
│   ├── utils.ts                  # General utilities
│   ├── constants.ts              # App constants
│   └── validations.ts            # Zod schemas
│
├── hooks/                        # Custom React hooks
│   ├── use-auth.ts
│   ├── use-media-query.ts
│   └── use-scroll-position.ts
│
├── stores/                       # Zustand stores
│   ├── auth-store.ts
│   └── ui-store.ts
│
├── types/                        # TypeScript types
│   ├── database.ts
│   ├── api.ts
│   └── stripe.ts
│
├── public/
│   ├── images/
│   ├── fonts/
│   └── og/                       # Open Graph images
│
├── middleware.ts                  # Next.js middleware (auth, redirects)
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript config
├── .env.example                   # Environment variables template
├── .env.local                     # Local env (gitignored)
└── package.json
```

---

## Step 4: Data Model Design

### Template: SaaS with Teams and Subscriptions

```sql
-- USERS: Core user table
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  name          TEXT,
  avatar_url    TEXT,
  role          TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- TEAMS: Multi-tenant support
CREATE TABLE teams (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  plan          TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  stripe_customer_id    TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id       TEXT,
  subscription_status   TEXT DEFAULT 'inactive',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- TEAM_MEMBERS: Junction table
CREATE TABLE team_members (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID REFERENCES users(id) ON DELETE CASCADE,
  team_id   UUID REFERENCES teams(id) ON DELETE CASCADE,
  role      TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, team_id)
);

-- ACTIVITY_LOG: Audit trail
CREATE TABLE activity_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id     UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,  -- 'user.login', 'team.invite', 'subscription.upgraded'
  entity_type TEXT,           -- 'user', 'team', 'subscription'
  entity_id   UUID,
  metadata    JSONB DEFAULT '{}',
  ip_address  INET,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- INVITATIONS: Team invitations
CREATE TABLE invitations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id     UUID REFERENCES teams(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  role        TEXT DEFAULT 'member',
  invited_by  UUID REFERENCES users(id),
  status      TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  expires_at  TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (Supabase)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (id = auth.uid());

-- Policy: Team members can see team data
CREATE POLICY "Team members can view team" ON teams
  FOR SELECT USING (
    id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
  );
```

### Design Rules

1. **Always use UUIDs** — Never auto-increment IDs (security leak)
2. **Always add timestamps** — `created_at` and `updated_at` on every table
3. **Always enable RLS** — Row Level Security on every table in Supabase
4. **Soft delete when possible** — Add `deleted_at` column instead of DELETE
5. **JSONB for flexible data** — metadata, settings, preferences
6. **Index foreign keys** — Every FK column should have an index

---

## Step 5: API Design

### REST API Conventions

```typescript
// Standard API response shape
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

// Standard error codes
const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
```

### API Routes Map (Next.js App Router)

```
POST   /api/auth/register        — Create new account
POST   /api/auth/login            — Email/password login
POST   /api/auth/logout           — Clear session
POST   /api/auth/forgot-password  — Send reset email
POST   /api/auth/reset-password   — Reset with token

GET    /api/user                  — Get current user
PATCH  /api/user                  — Update profile
DELETE /api/user                  — Delete account

GET    /api/teams                 — List user's teams
POST   /api/teams                 — Create team
GET    /api/teams/[id]            — Get team details
PATCH  /api/teams/[id]            — Update team
DELETE /api/teams/[id]            — Delete team

POST   /api/teams/[id]/invite     — Invite member
DELETE /api/teams/[id]/members/[userId] — Remove member

POST   /api/stripe/checkout       — Create checkout session
POST   /api/stripe/portal         — Create customer portal session
POST   /api/stripe/webhook        — Handle Stripe events

GET    /api/activity              — Get activity log
```

### API Route Template

```typescript
// app/api/teams/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { teams, teamMembers } from '@/lib/db/schema';

const createTeamSchema = z.object({
  name: z.string().min(2).max(50),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { data: null, error: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // 2. Validate input
    const body = await request.json();
    const parsed = createTeamSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { data: null, error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // 3. Business logic
    const team = await db.insert(teams).values({
      name: parsed.data.name,
      slug: parsed.data.slug,
    }).returning();

    // 4. Add creator as owner
    await db.insert(teamMembers).values({
      userId: session.userId,
      teamId: team[0].id,
      role: 'owner',
    });

    // 5. Return response
    return NextResponse.json(
      { data: team[0], error: null },
      { status: 201 }
    );

  } catch (error) {
    console.error('Failed to create team:', error);
    return NextResponse.json(
      { data: null, error: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
```

---

## Step 6: Authentication Strategy

### Recommended: Cookie-based JWT (like nextjs/saas-starter)

```typescript
// lib/auth/session.ts
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);
const COOKIE_NAME = 'session';

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  teamId?: string;
  expiresAt: Date;
}

export async function createSession(payload: Omit<SessionPayload, 'expiresAt'>) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  const token = await new SignJWT({ ...payload, expiresAt: expiresAt.toISOString() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookie = cookies().get(COOKIE_NAME)?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession() {
  cookies().delete(COOKIE_NAME);
}
```

### Middleware Pattern

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/dashboard', '/settings', '/api/user', '/api/teams'];
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session')?.value;
  
  const isProtected = protectedRoutes.some(r => pathname.startsWith(r));
  const isAuthRoute = authRoutes.some(r => pathname.startsWith(r));

  // Redirect unauthenticated users from protected routes
  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users from auth routes
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

---

## Step 7: Scalability Planning

### From 0 to 100K Users

| Stage | Users | Actions |
|-------|-------|---------|
| **MVP** | 0 - 1K | Single Vercel deploy, Supabase free tier, basic monitoring |
| **Growth** | 1K - 10K | Add Redis caching (Upstash), CDN for assets, database indexes |
| **Scale** | 10K - 50K | Supabase Pro, connection pooling, background jobs, read replicas |
| **Enterprise** | 50K - 100K+ | Multi-region deploy, dedicated DB, rate limiting per tenant |

### Performance Budget

```
Target metrics:
├── FCP (First Contentful Paint): < 1.2s
├── LCP (Largest Contentful Paint): < 2.5s
├── CLS (Cumulative Layout Shift): < 0.1
├── TTFB (Time to First Byte): < 200ms
├── Bundle size (initial): < 100KB gzipped
└── Lighthouse score: 95+ Performance
```

---

## Step 8: Environment Variables Template

```bash
# .env.example — Document EVERY variable

# ============================================
# APP
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="My App"

# ============================================
# DATABASE (Supabase)
# ============================================
DATABASE_URL=postgresql://user:pass@host:5432/db
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# ============================================
# AUTH
# ============================================
AUTH_SECRET=generate-with-openssl-rand-base64-32

# ============================================
# STRIPE
# ============================================
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_YEARLY_PRICE_ID=price_...
STRIPE_ENTERPRISE_MONTHLY_PRICE_ID=price_...
STRIPE_ENTERPRISE_YEARLY_PRICE_ID=price_...

# ============================================
# EMAIL (Resend)
# ============================================
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com

# ============================================
# FILE UPLOAD (Uploadthing)
# ============================================
UPLOADTHING_SECRET=sk_...

# ============================================
# RATE LIMITING (Upstash)
# ============================================
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxx...

# ============================================
# MONITORING
# ============================================
SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## Architecture Decision Checklist

Before finalizing architecture, verify:

- [ ] Every page has a clear data source (SSR, SSG, CSR, ISR)
- [ ] Auth protects all sensitive routes and API endpoints
- [ ] Database schema has proper indexes on all foreign keys
- [ ] Row Level Security is enabled on all Supabase tables  
- [ ] API has consistent error response format
- [ ] Environment variables are documented in .env.example
- [ ] File upload has size limits and type validation
- [ ] Rate limiting is configured for auth and payment endpoints
- [ ] Error tracking (Sentry) catches both client and server errors
- [ ] Monitoring dashboard exists for key metrics
