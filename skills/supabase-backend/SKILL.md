---
name: supabase-backend
description: Setup and configure Supabase for web applications. Covers database setup, Row Level Security, authentication, realtime subscriptions, file storage, edge functions, and Drizzle ORM integration.
---

# 🗄️ Supabase Backend Skill

> Full backend with Supabase: PostgreSQL, Auth, Realtime, Storage, and Edge Functions.

---

## Quick Reference

```
SUPABASE PROVIDES:
├── PostgreSQL database (managed)
├── Authentication (email, OAuth, magic link)
├── Row Level Security (RLS) policies
├── Realtime subscriptions
├── File storage (S3-compatible)
├── Edge Functions (Deno runtime)
├── Auto-generated REST API
└── Dashboard for management
```

---

## Step 1: Project Setup

```bash
# Create Supabase project at supabase.com
# Get your credentials from Settings → API

# Install client
npm install @supabase/supabase-js

# For server-side with Next.js
npm install @supabase/ssr
```

### Client Configuration

```typescript
// lib/supabase/client.ts (browser client)
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```typescript
// lib/supabase/server.ts (server client)
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerSupabase() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}
```

```typescript
// lib/supabase/admin.ts (service role — server only!)
import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // NEVER expose this
  { auth: { autoRefreshToken: false, persistSession: false } }
);
```

---

## Step 2: Drizzle ORM Integration

```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
```

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

```typescript
// lib/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
});

export const db = drizzle(client, { schema });
```

```typescript
// lib/db/schema.ts
import {
  pgTable, uuid, text, timestamp, boolean, jsonb, inet,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  role: text('role').default('member'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const teams = pgTable('teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  plan: text('plan').default('free'),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripePriceId: text('stripe_price_id'),
  subscriptionStatus: text('subscription_status').default('inactive'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  teamId: uuid('team_id').references(() => teams.id, { onDelete: 'cascade' }),
  role: text('role').default('member'),
  joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
}));

export const teamsRelations = relations(teams, ({ many }) => ({
  members: many(teamMembers),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, { fields: [teamMembers.userId], references: [users.id] }),
  team: one(teams, { fields: [teamMembers.teamId], references: [teams.id] }),
}));
```

### Migration Commands

```bash
# Generate migration from schema changes
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Open Drizzle Studio (visual DB browser)
npx drizzle-kit studio

# Push schema directly (development only)
npx drizzle-kit push
```

---

## Step 3: Row Level Security

```sql
-- ALWAYS enable RLS on every table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users read own data"
  ON users FOR SELECT
  USING (id = auth.uid());

-- Users can update their own data
CREATE POLICY "Users update own data"
  ON users FOR UPDATE
  USING (id = auth.uid());

-- Team members can see their team
CREATE POLICY "Team members see team"
  ON teams FOR SELECT
  USING (id IN (
    SELECT team_id FROM team_members WHERE user_id = auth.uid()
  ));

-- Only team owners can update team
CREATE POLICY "Team owners update team"
  ON teams FOR UPDATE
  USING (id IN (
    SELECT team_id FROM team_members 
    WHERE user_id = auth.uid() AND role = 'owner'
  ));

-- Service role bypasses RLS (for webhooks, admin)
-- This is automatic with supabaseAdmin client
```

---

## Step 4: Authentication

```typescript
// Authentication helpers
// lib/auth/supabase-auth.ts

import { createClient } from '@/lib/supabase/client';

export async function signUp(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signInWithOAuth(provider: 'google' | 'github') {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
```

### Auth Callback Route

```typescript
// app/auth/callback/route.ts
import { createServerSupabase } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
```

---

## Security Checklist

- [ ] RLS enabled on ALL tables
- [ ] Service role key NEVER in client-side code
- [ ] Anon key only for operations that pass RLS
- [ ] Auth callback properly handles errors
- [ ] Session refresh configured in middleware
- [ ] Database functions use `security definer` carefully
- [ ] File upload restricted by type and size
- [ ] API rate limiting on auth endpoints
