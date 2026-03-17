---
name: design-system-pro
description: Create professional design systems with a 50-point audit. Covers design tokens, typography, color palettes, component library, dark mode, accessibility, and responsive design. Produces premium, non-generic UI.
---

# 🎨 Design System Pro Skill

> Build premium design systems that make users say "wow" on first impression.
> Follows a 50-point audit system across 5 blocks.

---

## Quick Reference

```
PRINCIPLES — NEVER VIOLATE:
✗ NEVER use Inter, Roboto, Arial as primary font
✗ NEVER purple gradient on white (AI cliché)
✗ NEVER symmetric, predictable hero layouts
✗ NEVER generic color palettes (raw red, blue, green)
✗ NEVER browser-default appearance

✓ ALWAYS intentional asymmetry and editorial composition
✓ ALWAYS micro-interactions on interactive elements
✓ ALWAYS unique visual personality
✓ ALWAYS dark/light mode with smooth transition
✓ ALWAYS WCAG AA contrast minimum (4.5:1 for text)
```

---

## Step 1: Design Tokens System

### CSS Variables (Base)

```css
/* globals.css — Design Token Foundation */
:root {
  /* ========================================
     COLOR SYSTEM
     Use HSL for easy manipulation
     ======================================== */
  
  /* Brand Colors */
  --color-primary-h: 220;
  --color-primary-s: 85%;
  --color-primary-l: 55%;
  --color-primary: hsl(var(--color-primary-h) var(--color-primary-s) var(--color-primary-l));
  --color-primary-hover: hsl(var(--color-primary-h) var(--color-primary-s) 48%);
  --color-primary-light: hsl(var(--color-primary-h) 70% 95%);
  --color-primary-dark: hsl(var(--color-primary-h) 90% 35%);
  
  /* Secondary */
  --color-secondary-h: 160;
  --color-secondary-s: 65%;
  --color-secondary-l: 50%;
  --color-secondary: hsl(var(--color-secondary-h) var(--color-secondary-s) var(--color-secondary-l));
  
  /* Neutrals — warm tint for personality */
  --color-bg: hsl(220 20% 97%);
  --color-bg-subtle: hsl(220 15% 94%);
  --color-bg-muted: hsl(220 12% 90%);
  --color-surface: hsl(0 0% 100%);
  --color-surface-raised: hsl(0 0% 100%);
  --color-border: hsl(220 13% 87%);
  --color-border-subtle: hsl(220 13% 91%);
  
  /* Text */
  --color-text: hsl(220 25% 12%);
  --color-text-secondary: hsl(220 15% 40%);
  --color-text-muted: hsl(220 10% 56%);
  --color-text-inverted: hsl(0 0% 100%);
  
  /* Semantic */
  --color-success: hsl(152 60% 42%);
  --color-warning: hsl(38 92% 50%);
  --color-error: hsl(0 72% 51%);
  --color-info: hsl(210 100% 52%);
  
  /* ========================================
     TYPOGRAPHY
     ======================================== */
  --font-display: 'Syne', system-ui, sans-serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Type Scale — Minor Third (1.2) */
  --text-xs: 0.694rem;    /* 11px */
  --text-sm: 0.833rem;    /* 13px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.2rem;      /* 19px */
  --text-xl: 1.44rem;     /* 23px */
  --text-2xl: 1.728rem;   /* 28px */
  --text-3xl: 2.074rem;   /* 33px */
  --text-4xl: 2.488rem;   /* 40px */
  --text-5xl: 2.986rem;   /* 48px */
  --text-6xl: 3.583rem;   /* 57px */
  --text-hero: clamp(2.5rem, 5vw + 1rem, 5rem);
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.15;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;
  
  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.04em;
  --tracking-wider: 0.08em;
  
  /* ========================================
     SPACING (8px grid)
     ======================================== */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  --space-section: clamp(4rem, 8vw, 8rem);
  
  /* ========================================
     SHADOWS (5 levels)
     ======================================== */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08);
  
  /* ========================================
     BORDERS
     ======================================== */
  --radius-sm: 0.375rem;   /* 6px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-2xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;
  
  /* ========================================
     TRANSITIONS
     ======================================== */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  
  /* ========================================
     Z-INDEX SCALE
     ======================================== */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-overlay: 1040;
  --z-modal: 1060;
  --z-popover: 1080;
  --z-toast: 1100;
}

/* ========================================
   DARK MODE
   ======================================== */
[data-theme="dark"], .dark {
  --color-bg: hsl(220 20% 8%);
  --color-bg-subtle: hsl(220 15% 12%);
  --color-bg-muted: hsl(220 12% 16%);
  --color-surface: hsl(220 15% 13%);
  --color-surface-raised: hsl(220 15% 16%);
  --color-border: hsl(220 13% 22%);
  --color-border-subtle: hsl(220 13% 18%);
  
  --color-text: hsl(220 15% 92%);
  --color-text-secondary: hsl(220 10% 68%);
  --color-text-muted: hsl(220 8% 50%);
  
  /* Adjust primary for dark backgrounds */
  --color-primary-l: 62%;
  --color-primary-light: hsl(var(--color-primary-h) 50% 15%);
  
  /* Darker shadows */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px -1px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -2px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.35), 0 8px 10px -6px rgba(0, 0, 0, 0.35);
}
```

---

## Step 2: Typography System

### Google Fonts Combinations (Premium, Non-Generic)

| Style | Display Font | Body Font | Vibe |
|-------|-------------|-----------|------|
| **Editorial** | Syne (700-800) | DM Sans (400-500) | Modern, bold, tech |
| **Elegant** | Fraunces (300-600) | Source Serif 4 | Luxury, refined |
| **Tech** | Space Grotesk (500-700) | DM Mono (400) | Developer, hacker |
| **Minimal** | Outfit (600-800) | Plus Jakarta Sans (400-500) | Clean, European |
| **Creative** | Instrument Serif (400) | Satoshi (400-500) | Design studio |

### Font Loading (Optimal)

```tsx
// app/layout.tsx
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## Step 3: Curated Color Palettes

### Palette A — "Midnight Ocean" (Tech/SaaS)
```css
--color-primary: hsl(215 90% 55%);    /* Electric blue */
--color-secondary: hsl(165 70% 48%);   /* Teal accent */
--color-bg: hsl(222 30% 6%);           /* Deep dark */
--color-surface: hsl(222 25% 10%);     /* Card surface */
--color-text: hsl(210 20% 95%);        /* Almost white */
```

### Palette B — "Desert Dusk" (Creative/Editorial)
```css
--color-primary: hsl(24 85% 58%);      /* Warm orange */
--color-secondary: hsl(340 72% 52%);   /* Rose accent */
--color-bg: hsl(30 15% 96%);           /* Warm cream */
--color-surface: hsl(0 0% 100%);       /* White */
--color-text: hsl(20 25% 12%);         /* Warm black */
```

### Palette C — "Forest Protocol" (Fintech/Enterprise)
```css
--color-primary: hsl(152 60% 42%);     /* Forest green */
--color-secondary: hsl(200 75% 50%);   /* Sky blue */
--color-bg: hsl(150 10% 97%);          /* Minty white */
--color-surface: hsl(0 0% 100%);       /* Clean white */
--color-text: hsl(150 25% 10%);        /* Deep green-black */
```

### Palette D — "Neon Cosmos" (Startup/Bold)
```css
--color-primary: hsl(265 85% 60%);     /* Vivid purple */
--color-secondary: hsl(170 95% 50%);   /* Neon cyan */
--color-bg: hsl(260 25% 6%);           /* Space black */
--color-surface: hsl(260 20% 10%);     /* Dark surface */
--color-text: hsl(0 0% 95%);           /* Bright white */
```

### Palette E — "Swiss Precision" (Corporate/Professional)
```css
--color-primary: hsl(0 0% 8%);         /* Pure black */
--color-secondary: hsl(0 80% 50%);     /* Swiss red */
--color-bg: hsl(0 0% 98%);             /* Off-white */
--color-surface: hsl(0 0% 100%);       /* White */
--color-text: hsl(0 0% 10%);           /* Near-black */
```

---

## Step 4: Component Patterns

### Button System

```css
/* Base button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

/* Sizes */
.btn-sm { height: 2rem; padding: 0 var(--space-3); font-size: var(--text-sm); border-radius: var(--radius-sm); }
.btn-md { height: 2.5rem; padding: 0 var(--space-5); font-size: var(--text-base); border-radius: var(--radius-md); }
.btn-lg { height: 3rem; padding: 0 var(--space-8); font-size: var(--text-lg); border-radius: var(--radius-lg); }
.btn-xl { height: 3.5rem; padding: 0 var(--space-10); font-size: var(--text-lg); border-radius: var(--radius-lg); }

/* Variants */
.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-inverted);
}
.btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: 1.5px solid var(--color-border);
}
.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-light);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
}
.btn-ghost:hover {
  background: var(--color-bg-subtle);
  color: var(--color-text);
}

.btn-danger {
  background: var(--color-error);
  color: white;
}
.btn-danger:hover {
  filter: brightness(1.1);
}

/* States */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-loading {
  color: transparent !important;
}
.btn-loading::after {
  content: '';
  position: absolute;
  width: 1.2em;
  height: 1.2em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Card Component

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--duration-normal) var(--ease-out);
}

.card-interactive:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## Step 5: Animation Patterns

### Scroll Reveal (CSS-only)

```css
/* Intersection Observer triggers these */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 100ms; }
.reveal-delay-2 { transition-delay: 200ms; }
.reveal-delay-3 { transition-delay: 300ms; }
.reveal-delay-4 { transition-delay: 400ms; }
```

```javascript
// Minimal scroll reveal (no library needed)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### Framer Motion Patterns

```tsx
// Stagger children animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Micro-interactions

```css
/* Button ripple effect */
.btn-ripple {
  position: relative;
  overflow: hidden;
}
.btn-ripple::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--ripple-x, 50%) var(--ripple-y, 50%), 
    rgba(255,255,255,0.3) 0%, transparent 60%);
  transform: scale(0);
  transition: transform 0.5s var(--ease-out);
}
.btn-ripple:active::before {
  transform: scale(2.5);
}

/* Hover glow */
.hover-glow {
  transition: box-shadow var(--duration-normal) var(--ease-out);
}
.hover-glow:hover {
  box-shadow: 0 0 20px rgba(var(--color-primary-h), 80%, 60%, 0.3);
}

/* Link underline animation */
.link-animated {
  position: relative;
  text-decoration: none;
}
.link-animated::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width var(--duration-normal) var(--ease-out);
}
.link-animated:hover::after {
  width: 100%;
}
```

---

## 50-Point Audit Checklist

### Block A — Foundation (10 pts)
- [ ] Design tokens: colors, typography, spacing in CSS Variables
- [ ] Palette: primary + secondary + neutrals + semantic (error/success)
- [ ] WCAG AA contrast on all text (min 4.5:1)
- [ ] Typographic system: 5 heading levels + body + caption
- [ ] 8px grid applied consistently
- [ ] Iconography: single coherent set (Lucide React)
- [ ] Dark/Light mode with smooth transition
- [ ] Fonts: Display + Body (non-generic)
- [ ] Shadows: 5-level system (xs/sm/md/lg/xl)
- [ ] Border radius: consistent system (sm/md/lg/full)

### Block B — Components (10 pts)
- [ ] Button: 4 variants + 3 sizes + states (hover/active/disabled/loading)
- [ ] Input/Form: inline validation + error state + helper text
- [ ] Card: 3 variants + hover state + skeleton loader
- [ ] Modal/Dialog: entry animation + trapped focus
- [ ] Dropdown/Select: animation + keyboard navigation
- [ ] Toast/Notification: 4 types (success/error/warning/info)
- [ ] Badge/Chip: color variants + sizes
- [ ] Table: sorting + pagination + empty state + loading
- [ ] Sidebar: collapsible + mobile overlay + active states
- [ ] Navigation: breadcrumbs + tabs + stepper

### Block C — Key Pages (10 pts)
- [ ] Landing: hero above fold + CTA visible in 3s
- [ ] Pricing: 3 plans + monthly/yearly toggle + comparison table
- [ ] Auth: login + register + forgot password + magic link
- [ ] Dashboard: KPIs + charts + recent activity
- [ ] Settings: profile + security + notifications + billing
- [ ] 404/500: branded with recovery CTA
- [ ] Onboarding: 3-5 step wizard with progress
- [ ] Empty states: illustration + copy + CTA per module
- [ ] Skeleton loaders for all async content
- [ ] Global loading states (page transitions)

### Block D — Conversion CRO (10 pts)
- [ ] Social proof: logos + testimonials + metrics
- [ ] Urgency and scarcity (where authentic)
- [ ] Trust signals: SSL badge + reviews + guarantees
- [ ] Friction reduction in forms (minimum fields)
- [ ] Secondary CTA for non-converting users
- [ ] Exit intent (if applicable)
- [ ] Headline: Desired Result + Time + Objection
- [ ] Clear value proposition in first 5 seconds
- [ ] FAQ anticipating purchase objections
- [ ] Guarantee visible in pricing section

### Block E — Performance + Accessibility (10 pts)
- [ ] Lighthouse: Performance 95+ / A11y 100 / Best Practices 100
- [ ] FCP < 1.2s / LCP < 2.5s / CLS < 0.1
- [ ] Images: next/image with lazy loading + blur placeholder
- [ ] Fonts: font-display swap + preload critical
- [ ] Complete keyboard navigation (Tab/Enter/Esc)
- [ ] Screen reader: aria-labels + roles + live regions
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Responsive from 320px to 2560px
- [ ] Mobile gestures: swipe on carousels + pull-to-refresh
- [ ] No-JS mode functional (progressive enhancement)
