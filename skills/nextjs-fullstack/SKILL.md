---
name: nextjs-fullstack
description: Build production-grade Next.js applications with App Router, Server Components, TypeScript, and modern patterns. Covers project setup, routing, data fetching, forms, animations, SEO, and deployment.
---

# 💻 Next.js Fullstack Skill

> Build production-ready Next.js applications using App Router best practices.
> Covers everything from setup to deployment.

---

## Quick Reference

```
DECISION TREE — Server vs Client Component:
├── Does it need useState/useEffect?     → 'use client'
├── Does it handle onClick/onChange?      → 'use client'
├── Does it use browser APIs?            → 'use client'
├── Does it fetch data on server?        → Server Component (default)
├── Does it access DB/filesystem?        → Server Component
└── Is it purely presentational?         → Server Component (default)

GOLDEN RULE: Start with Server Components. Only add 'use client' when needed.
```

---

## Step 1: Project Initialization

### Using shadcn/ui CLI (recommended)

```bash
# Create new project with shadcn preset
npx shadcn@latest init --name my-app --preset base-nova --template next

# Or for existing project
npx shadcn@latest init --preset base-nova

# Add commonly needed components
npx shadcn@latest add button card dialog input select badge table tabs toast
```

### Manual setup with create-next-app

```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"

# Core dependencies
npm install zustand @tanstack/react-query zod react-hook-form @hookform/resolvers
npm install framer-motion lucide-react

# UI (shadcn)
npx shadcn@latest init

# Database
npm install @supabase/supabase-js drizzle-orm
npm install -D drizzle-kit

# Payments
npm install stripe @stripe/stripe-js

# Email
npm install resend @react-email/components

# Auth
npm install jose bcryptjs
npm install -D @types/bcryptjs

# Dev tools
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Step 2: App Router Patterns

### Route Groups (organize by concern)

```
app/
├── (marketing)/          ← Public pages, marketing layout
│   ├── layout.tsx        ← Navbar + Footer
│   ├── page.tsx          ← "/" landing
│   ├── pricing/page.tsx  ← "/pricing"
│   └── about/page.tsx    ← "/about"
│
├── (auth)/               ← Auth pages, minimal layout
│   ├── layout.tsx        ← Centered, no nav
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── forgot-password/page.tsx
│
├── (dashboard)/          ← Protected, sidebar layout
│   ├── layout.tsx        ← Sidebar + Header
│   ├── dashboard/page.tsx
│   ├── settings/page.tsx
│   └── billing/page.tsx
│
├── api/                  ← API routes
│   ├── stripe/webhook/route.ts
│   └── [...catchall]/route.ts
│
├── layout.tsx            ← Root layout (fonts, providers)
├── not-found.tsx         ← Custom 404
├── error.tsx             ← Global error boundary
├── loading.tsx           ← Global loading
└── globals.css
```

### Root Layout Pattern

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import { Providers } from '@/components/providers';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Mi App',
    default: 'Mi App — Tu solución completa',
  },
  description: 'Descripción optimizada para SEO de 150-160 caracteres.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Mi App — Tu solución completa',
    description: 'Descripción para redes sociales.',
    url: '/',
    siteName: 'Mi App',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mi App',
    description: 'Descripción para Twitter.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
```

### Provider Pattern (Client Wrapper)

```tsx
// components/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
```

---

## Step 3: Data Fetching Patterns

### Server Component Data Fetching (preferred)

```tsx
// app/(dashboard)/dashboard/page.tsx
import { getSession } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { DashboardClient } from './dashboard-client';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  // Direct database query in Server Component
  const stats = await db.query.teams.findFirst({
    where: (teams, { eq }) => eq(teams.id, session.teamId!),
    with: {
      members: true,
      activityLog: {
        limit: 10,
        orderBy: (log, { desc }) => [desc(log.createdAt)],
      },
    },
  });

  return <DashboardClient stats={stats} />;
}
```

### Client-Side with TanStack Query

```tsx
// hooks/use-team.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Team {
  id: string;
  name: string;
  slug: string;
  plan: string;
}

export function useTeam(teamId: string) {
  return useQuery<Team>({
    queryKey: ['team', teamId],
    queryFn: async () => {
      const res = await fetch(`/api/teams/${teamId}`);
      if (!res.ok) throw new Error('Failed to fetch team');
      const json = await res.json();
      return json.data;
    },
  });
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ teamId, data }: { teamId: string; data: Partial<Team> }) => {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['team', variables.teamId] });
    },
  });
}
```

---

## Step 4: Form Patterns

### React Hook Form + Zod + Server Action

```tsx
// lib/validations.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

```tsx
// app/(auth)/login/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validations';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Error al iniciar sesión');
      }

      toast.success('¡Bienvenido!');
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error inesperado');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Iniciar sesión</h1>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...form.register('email')}
              aria-invalid={!!form.formState.errors.email}
              placeholder="tu@email.com"
            />
            {form.formState.errors.email && (
              <p className="field-error">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              {...form.register('password')}
              aria-invalid={!!form.formState.errors.password}
            />
            {form.formState.errors.password && (
              <p className="field-error">{form.formState.errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-lg btn-full ${isLoading ? 'btn-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## Step 5: Animation Patterns (Framer Motion)

### Page Transitions

```tsx
// components/page-transition.tsx
'use client';

import { motion } from 'framer-motion';

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### Scroll-Triggered Reveals

```tsx
// components/reveal.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function Reveal({ children, delay = 0, direction = 'up' }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const directionMap = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Step 6: SEO Checklist

### Per-Page Metadata

```tsx
// app/(marketing)/pricing/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Precios — Planes para cada necesidad',
  description: 'Planes flexibles desde $19/mes. Compara features y elige el que mejor se adapte.',
  openGraph: {
    title: 'Precios — Mi App',
    description: 'Planes desde $19/mes.',
    images: ['/og/pricing.png'],
  },
};
```

### Sitemap & Robots

```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://miapp.com';
  
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
```

```tsx
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/', '/settings/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
```

---

## Step 7: Error Handling

### Global Error Boundary

```tsx
// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error tracking (Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="error-page">
      <div className="error-content">
        <h1>Algo salió mal</h1>
        <p>Lo sentimos, hubo un error inesperado.</p>
        <div className="error-actions">
          <button onClick={reset} className="btn btn-primary">
            Intentar de nuevo
          </button>
          <a href="/" className="btn btn-secondary">
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
```

### Custom 404

```tsx
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-content">
        <span className="error-code">404</span>
        <h1>Página no encontrada</h1>
        <p>La página que buscas no existe o fue movida.</p>
        <Link href="/" className="btn btn-primary btn-lg">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
```

---

## TypeScript Rules

```typescript
// ✅ GOOD: Explicit interfaces
interface UserProps {
  name: string;
  email: string;
  avatar?: string;
}

// ❌ BAD: Using 'any'
function processData(data: any) { ... }

// ✅ GOOD: Proper typing
function processData(data: Record<string, unknown>) { ... }

// ✅ GOOD: Discriminated unions for state
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// ✅ GOOD: Return types on functions
async function getUser(id: string): Promise<User | null> { ... }

// ✅ GOOD: Const assertions for config
const PLANS = {
  free: { name: 'Free', price: 0, features: ['100 envíos'] },
  pro: { name: 'Pro', price: 49, features: ['500 envíos', 'API'] },
} as const;

type PlanKey = keyof typeof PLANS;
```

---

## Code Quality Rules

```
FILE SIZE LIMITS:
├── Components: max 150 lines per file
├── Functions: max 30 lines, single purpose
├── Hooks: max 80 lines
└── API routes: max 100 lines

IMPORT ALIASES (tsconfig.json):
├── @/components/* → components
├── @/lib/*        → lib
├── @/hooks/*      → hooks
├── @/types/*      → types
├── @/stores/*     → stores
└── @/styles/*     → styles

NAMING CONVENTIONS:
├── Components: PascalCase (UserProfile.tsx)
├── Hooks: camelCase with use prefix (useAuth.ts)
├── Utils: camelCase (formatCurrency.ts)
├── Types: PascalCase (UserProfile)
├── Constants: UPPER_SNAKE_CASE (MAX_FILE_SIZE)
└── CSS classes: kebab-case (hero-section)
```
