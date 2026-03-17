---
name: stripe-payments
description: Integrate Stripe payments end-to-end. Covers Checkout Sessions, Customer Portal, Webhooks, subscription management, plan definitions, and testing. Complete code templates for Next.js.
---

# 💳 Stripe Payments Skill

> Complete Stripe integration for SaaS: subscriptions, one-time payments, and customer management.

---

## Quick Reference

```
STRIPE INTEGRATION FLOW:
1. Define plans in Stripe Dashboard
2. Create checkout session (server-side)
3. Redirect user to Stripe checkout
4. Handle webhook events
5. Update database with subscription status
6. Provide Customer Portal for self-service

CRITICAL WEBHOOKS TO HANDLE:
├── checkout.session.completed     → New subscription
├── customer.subscription.updated  → Plan change
├── customer.subscription.deleted  → Cancellation
└── invoice.payment_failed         → Failed payment
```

---

## Step 1: Plan Definitions

```typescript
// lib/stripe/plans.ts
export const PLANS = {
  free: {
    name: 'Básico',
    description: 'Para emprendedores que inician',
    price: { monthly: 0, yearly: 0 },
    stripePriceId: { monthly: null, yearly: null },
    features: [
      '100 envíos/mes',
      'Seguimiento básico',
      'Soporte por email',
    ],
    limits: {
      shipmentsPerMonth: 100,
      teamMembers: 1,
      apiAccess: false,
    },
  },
  pro: {
    name: 'Profesional',
    description: 'Para negocios en crecimiento',
    price: { monthly: 49, yearly: 39 },
    stripePriceId: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
    },
    features: [
      '500 envíos/mes',
      'Seguimiento en tiempo real',
      'Soporte prioritario',
      'API access',
      'Dashboard analytics',
    ],
    limits: {
      shipmentsPerMonth: 500,
      teamMembers: 5,
      apiAccess: true,
    },
  },
  enterprise: {
    name: 'Empresa',
    description: 'Solución personalizada',
    price: { monthly: 199, yearly: 159 },
    stripePriceId: {
      monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
      yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID!,
    },
    features: [
      'Envíos ilimitados',
      'Account manager dedicado',
      'SLA garantizado',
      'Integración personalizada',
      'Facturación corporativa',
    ],
    limits: {
      shipmentsPerMonth: -1, // unlimited
      teamMembers: -1,
      apiAccess: true,
    },
  },
} as const;

export type PlanKey = keyof typeof PLANS;
```

---

## Step 2: Stripe Client Setup

```typescript
// lib/stripe/client.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});
```

---

## Step 3: Checkout Session

```typescript
// app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { stripe } from '@/lib/stripe/client';
import { PLANS, type PlanKey } from '@/lib/stripe/plans';
import { getSession } from '@/lib/auth/session';
import { db } from '@/lib/db';

const checkoutSchema = z.object({
  plan: z.enum(['pro', 'enterprise']),
  interval: z.enum(['monthly', 'yearly']),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { plan, interval } = checkoutSchema.parse(body);
    const planConfig = PLANS[plan];
    const priceId = planConfig.stripePriceId[interval];

    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Get or create Stripe customer
    const team = await db.query.teams.findFirst({
      where: (teams, { eq }) => eq(teams.id, session.teamId!),
    });

    let customerId = team?.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.email,
        metadata: { teamId: session.teamId! },
      });
      customerId = customer.id;
      
      // Save customer ID to database
      await db.update(teams)
        .set({ stripeCustomerId: customerId })
        .where(eq(teams.id, session.teamId!));
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=cancelled`,
      subscription_data: {
        metadata: {
          teamId: session.teamId!,
          plan,
        },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    );
  }
}
```

---

## Step 4: Webhook Handler

```typescript
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { db } from '@/lib/db';
import { teams } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

// IMPORTANT: Disable body parsing for webhooks
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        
        const teamId = subscription.metadata.teamId;
        const plan = subscription.metadata.plan;

        await db.update(teams).set({
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          plan: plan,
          subscriptionStatus: subscription.status,
          updatedAt: new Date(),
        }).where(eq(teams.id, teamId));

        // TODO: Send welcome/upgrade email
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const teamId = subscription.metadata.teamId;

        await db.update(teams).set({
          stripePriceId: subscription.items.data[0].price.id,
          subscriptionStatus: subscription.status,
          updatedAt: new Date(),
        }).where(eq(teams.id, teamId));
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const teamId = subscription.metadata.teamId;

        await db.update(teams).set({
          plan: 'free',
          stripeSubscriptionId: null,
          stripePriceId: null,
          subscriptionStatus: 'cancelled',
          updatedAt: new Date(),
        }).where(eq(teams.id, teamId));

        // TODO: Send cancellation email
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription as string
        );
        const teamId = subscription.metadata.teamId;

        await db.update(teams).set({
          subscriptionStatus: 'past_due',
          updatedAt: new Date(),
        }).where(eq(teams.id, teamId));

        // TODO: Send payment failed email
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
```

---

## Step 5: Customer Portal

```typescript
// app/api/stripe/portal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { getSession } from '@/lib/auth/session';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const team = await db.query.teams.findFirst({
    where: (teams, { eq }) => eq(teams.id, session.teamId!),
  });

  if (!team?.stripeCustomerId) {
    return NextResponse.json({ error: 'No billing account' }, { status: 400 });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: team.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
  });

  return NextResponse.json({ url: portalSession.url });
}
```

---

## Step 6: Client-Side Components

```tsx
// components/pricing-button.tsx
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import type { PlanKey } from '@/lib/stripe/plans';

interface PricingButtonProps {
  plan: PlanKey;
  interval: 'monthly' | 'yearly';
  currentPlan?: string;
}

export function PricingButton({ plan, interval, currentPlan }: PricingButtonProps) {
  const [loading, setLoading] = useState(false);
  const isCurrentPlan = currentPlan === plan;

  async function handleCheckout() {
    if (plan === 'free' || isCurrentPlan) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, interval }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Error al crear checkout');
      }
    } catch (error) {
      toast.error('Error al procesar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  if (isCurrentPlan) {
    return (
      <button className="btn btn-secondary btn-lg btn-full" disabled>
        Plan actual
      </button>
    );
  }

  return (
    <button
      onClick={handleCheckout}
      className={`btn btn-lg btn-full ${loading ? 'btn-loading' : ''} ${
        plan === 'pro' ? 'btn-primary' : 'btn-secondary'
      }`}
      disabled={loading}
    >
      {loading ? 'Procesando...' : plan === 'free' ? 'Empezar gratis' : 'Empezar ahora'}
    </button>
  );
}
```

---

## Testing

```bash
# Install Stripe CLI
# https://docs.stripe.com/stripe-cli

# Login
stripe login

# Listen for webhooks locally
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger invoice.payment_failed

# Test card numbers:
# Success: 4242 4242 4242 4242
# Decline: 4000 0000 0000 0002
# 3D Secure: 4000 0027 6000 3184
# Exp: Any future date | CVC: Any 3 digits
```

---

## Security Checklist

- [ ] Webhook signature verified with `stripe.webhooks.constructEvent`
- [ ] Stripe secret key only in server-side code, never exposed to client
- [ ] Publishable key used for client-side Stripe.js only
- [ ] Webhook endpoint uses raw body (not JSON parsed)
- [ ] Customer ID stored and reused (never create duplicate customers)
- [ ] Plan limits enforced server-side (never trust client)
- [ ] Failed payment handling with grace period
- [ ] Idempotency keys for critical operations
