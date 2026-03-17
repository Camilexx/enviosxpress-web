---
name: testing-qa
description: Implement comprehensive testing for web applications. Covers unit tests with Vitest, integration tests, E2E tests with Playwright, visual regression, accessibility testing, and security audits.
---

# 🧪 Testing & QA Skill

> Ship with confidence. Cover critical flows and catch regressions before users do.

---

## Quick Reference

```
TEST PYRAMID:
├── E2E Tests (few)      → Critical user journeys
├── Integration Tests     → API routes, database queries
├── Unit Tests (many)     → Utils, hooks, pure functions

COVERAGE TARGETS:
├── Unit tests:     80%+ on utils/hooks
├── Integration:    All API endpoints
├── E2E:            All critical user flows
└── Visual:         Key pages (optional but recommended)
```

---

## Setup

```bash
# Unit & Integration tests
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @vitejs/plugin-react jsdom

# E2E tests
npm install -D @playwright/test
npx playwright install

# Coverage
npm install -D @vitest/coverage-v8
```

### Vitest Config

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

```typescript
// tests/setup.ts
import '@testing-library/jest-dom';
```

### Playwright Config

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Unit Test Examples

### Testing Utility Functions

```typescript
// lib/__tests__/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency, slugify, truncate } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(49.99)).toBe('$49.99');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('handles large numbers with commas', () => {
    expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
  });
});

describe('slugify', () => {
  it('converts to lowercase with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('handles special characters', () => {
    expect(slugify('¡Hola Mundo!')).toBe('hola-mundo');
  });

  it('handles multiple spaces', () => {
    expect(slugify('hello    world')).toBe('hello-world');
  });
});
```

### Testing Hooks

```typescript
// hooks/__tests__/use-debounce.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useDebounce } from '@/hooks/use-debounce';

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'hello' } }
    );

    rerender({ value: 'world' });
    expect(result.current).toBe('hello'); // Not updated yet

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe('world'); // Updated after delay
  });
});
```

---

## E2E Test Examples

### Authentication Flow

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can register and login', async ({ page }) => {
    // Register
    await page.goto('/register');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'SecurePass123!');
    await page.fill('[name="name"]', 'Test User');
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText('Test User')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'wrong@email.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.getByText(/credenciales inválidas/i)).toBeVisible();
  });

  test('redirects unauthenticated users from dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });
});
```

### Checkout Flow

```typescript
// tests/e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@test.com');
    await page.fill('[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('user can navigate to pricing and select a plan', async ({ page }) => {
    await page.goto('/pricing');
    
    // Verify pricing page loads
    await expect(page.getByText('Profesional')).toBeVisible();
    await expect(page.getByText('$49')).toBeVisible();
    
    // Click upgrade button  
    await page.click('text=Empezar ahora');
    
    // Should redirect to Stripe Checkout (external URL)
    await expect(page).toHaveURL(/checkout\.stripe\.com/);
  });
});
```

---

## Accessibility Testing

```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  const pages = ['/', '/pricing', '/login', '/register'];

  for (const pagePath of pages) {
    test(`${pagePath} has no accessibility violations`, async ({ page }) => {
      await page.goto(pagePath);
      
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      
      expect(results.violations).toEqual([]);
    });
  }
});
```

---

## Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:all": "vitest run && playwright test"
  }
}
```

---

## QA Checklist

### Before Every Release
- [ ] All unit tests pass (`npm test`)
- [ ] All E2E tests pass (`npm run test:e2e`)
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] Lighthouse scores: Performance 95+, A11y 100
- [ ] Mobile responsive tested (320px - 2560px)
- [ ] Dark mode tested on all pages
- [ ] All forms validated (empty, invalid, edge cases)
- [ ] Loading states work correctly
- [ ] Error states display properly
- [ ] 404 page works
- [ ] All links are correct (no broken links)
- [ ] Images load correctly with alt text
- [ ] Keyboard navigation works (Tab through page)
- [ ] Screen reader compatibility verified
