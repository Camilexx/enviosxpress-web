---
name: landing-page-cro
description: Build high-converting landing pages with proven CRO (Conversion Rate Optimization) patterns. Covers hero sections, pricing tables, social proof, form optimization, copywriting formulas, and A/B testing strategies.
---

# 🚀 Landing Page CRO Skill

> Build landing pages that convert visitors into customers.
> Every element backed by conversion psychology and proven patterns.

---

## Quick Reference

```
CONVERSION HIERARCHY (check in this order):
1. Value proposition clear in 5 seconds? → Hero headline
2. CTA visible above the fold? → Button placement
3. Social proof present? → Testimonials, logos, numbers
4. Objections addressed? → FAQ, guarantees
5. Friction minimized? → Form fields, loading speed
```

---

## Section Architecture (Top to Bottom)

```
OPTIMAL LANDING PAGE FLOW:
┌─────────────────────────────────────────┐
│  1. NAVBAR — Logo + Nav + CTA button    │
├─────────────────────────────────────────┤
│  2. HERO — Headline + Sub + CTA + Img   │
│     (above the fold, < 3 seconds)       │
├─────────────────────────────────────────┤
│  3. SOCIAL PROOF BAR — Logos / Numbers  │
├─────────────────────────────────────────┤
│  4. PROBLEM — Pain points (PAS format)  │
├─────────────────────────────────────────┤
│  5. SOLUTION — Your product as answer   │
├─────────────────────────────────────────┤
│  6. FEATURES — 3-6 key benefits         │
├─────────────────────────────────────────┤
│  7. HOW IT WORKS — 3 steps              │
├─────────────────────────────────────────┤
│  8. TESTIMONIALS — Real user quotes     │
├─────────────────────────────────────────┤
│  9. PRICING — Plans + Comparison        │
├─────────────────────────────────────────┤
│ 10. FAQ — Objection handling            │
├─────────────────────────────────────────┤
│ 11. FINAL CTA — Last conversion push    │
├─────────────────────────────────────────┤
│ 12. FOOTER — Links + Legal + Contact    │
└─────────────────────────────────────────┘
```

---

## Hero Section Patterns

### Pattern 1: Split Hero (Headline Left, Visual Right)

```html
<section class="hero">
  <div class="hero-grid">
    <!-- Left: Copy -->
    <div class="hero-content">
      <span class="hero-badge">🚀 Nuevo en 2026</span>
      <h1 class="hero-title">
        Envía paquetes a
        <span class="text-gradient">todo Ecuador</span>
        desde $2.50
      </h1>
      <p class="hero-subtitle">
        El servicio de courier más rápido y confiable. 
        Entrega en 24-48h con seguimiento en tiempo real.
      </p>
      <div class="hero-actions">
        <a href="#cotizar" class="btn btn-primary btn-lg">
          Cotizar envío gratis
          <svg><!-- arrow icon --></svg>
        </a>
        <a href="#como-funciona" class="btn btn-secondary btn-lg">
          Ver cómo funciona
        </a>
      </div>
      <div class="hero-proof">
        <div class="hero-avatars"><!-- stacked avatars --></div>
        <p><strong>+2,500</strong> emprendedores confían en nosotros</p>
      </div>
    </div>
    
    <!-- Right: Visual -->
    <div class="hero-visual">
      <!-- Product screenshot, illustration, or video -->
    </div>
  </div>
</section>
```

```css
.hero {
  padding: var(--space-section) 0;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-4);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 600;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-6);
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 800;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  margin-bottom: var(--space-6);
}

.text-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  max-width: 540px;
  margin-bottom: var(--space-8);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.hero-proof {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.hero-avatars {
  display: flex;
}
.hero-avatars img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--color-surface);
  margin-left: -8px;
}
.hero-avatars img:first-child {
  margin-left: 0;
}

/* Mobile */
@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-subtitle { max-width: 100%; }
  .hero-actions { flex-direction: column; }
  .hero-proof { justify-content: center; }
  .hero-visual { order: -1; }
}
```

---

## Social Proof Patterns

### Logo Bar

```html
<section class="social-proof-bar">
  <p class="social-proof-label">Confían en nosotros</p>
  <div class="logo-scroll">
    <div class="logo-track">
      <!-- Repeat logos 2x for infinite scroll -->
      <img src="/logos/brand1.svg" alt="Brand 1" />
      <img src="/logos/brand2.svg" alt="Brand 2" />
      <!-- ... -->
    </div>
  </div>
</section>
```

```css
.social-proof-bar {
  padding: var(--space-12) 0;
  border-top: 1px solid var(--color-border-subtle);
  border-bottom: 1px solid var(--color-border-subtle);
  text-align: center;
}

.social-proof-label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  margin-bottom: var(--space-8);
}

.logo-scroll {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
}

.logo-track {
  display: flex;
  gap: var(--space-12);
  animation: scroll 30s linear infinite;
}

.logo-track img {
  height: 28px;
  opacity: 0.4;
  filter: grayscale(100%);
  transition: all var(--duration-normal) var(--ease-out);
}

.logo-track img:hover {
  opacity: 1;
  filter: grayscale(0%);
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### Stats Bar

```html
<div class="stats-bar">
  <div class="stat">
    <span class="stat-value" data-count="15000">15,000+</span>
    <span class="stat-label">Envíos entregados</span>
  </div>
  <div class="stat">
    <span class="stat-value">98.5%</span>
    <span class="stat-label">Tasa de entrega</span>
  </div>
  <div class="stat">
    <span class="stat-value">24h</span>
    <span class="stat-label">Tiempo promedio</span>
  </div>
  <div class="stat">
    <span class="stat-value">4.9★</span>
    <span class="stat-label">Calificación</span>
  </div>
</div>
```

---

## Pricing Section

### 3-Plan Layout with Toggle

```html
<section class="pricing" id="pricing">
  <div class="container">
    <div class="section-header">
      <h2>Planes simples y transparentes</h2>
      <p>Sin costos ocultos. Cancela cuando quieras.</p>
    </div>
    
    <!-- Toggle -->
    <div class="pricing-toggle">
      <span class="toggle-label" data-active="monthly">Mensual</span>
      <button class="toggle-switch" role="switch" aria-checked="false">
        <span class="toggle-thumb"></span>
      </button>
      <span class="toggle-label" data-active="yearly">
        Anual <span class="toggle-badge">-20%</span>
      </span>
    </div>
    
    <!-- Plans Grid -->
    <div class="plans-grid">
      <!-- Basic -->
      <div class="plan-card">
        <div class="plan-header">
          <h3>Básico</h3>
          <p class="plan-desc">Para emprendedores que inician</p>
        </div>
        <div class="plan-price">
          <span class="price-amount" data-monthly="$19" data-yearly="$15">$19</span>
          <span class="price-period">/mes</span>
        </div>
        <ul class="plan-features">
          <li class="feature-included">✓ 100 envíos/mes</li>
          <li class="feature-included">✓ Seguimiento básico</li>
          <li class="feature-included">✓ Soporte por email</li>
          <li class="feature-excluded">✗ API access</li>
          <li class="feature-excluded">✗ Prioridad</li>
        </ul>
        <button class="btn btn-secondary btn-lg btn-full">Empezar gratis</button>
      </div>
      
      <!-- Pro (Featured) -->
      <div class="plan-card plan-featured">
        <div class="plan-badge">Más popular</div>
        <div class="plan-header">
          <h3>Profesional</h3>
          <p class="plan-desc">Para negocios en crecimiento</p>
        </div>
        <div class="plan-price">
          <span class="price-amount" data-monthly="$49" data-yearly="$39">$49</span>
          <span class="price-period">/mes</span>
        </div>
        <ul class="plan-features">
          <li class="feature-included">✓ 500 envíos/mes</li>
          <li class="feature-included">✓ Seguimiento en tiempo real</li>
          <li class="feature-included">✓ Soporte prioritario</li>
          <li class="feature-included">✓ API access</li>
          <li class="feature-included">✓ Dashboard analytics</li>
        </ul>
        <button class="btn btn-primary btn-lg btn-full">Empezar ahora</button>
      </div>
      
      <!-- Enterprise -->
      <div class="plan-card">
        <div class="plan-header">
          <h3>Empresa</h3>
          <p class="plan-desc">Solución personalizada</p>
        </div>
        <div class="plan-price">
          <span class="price-amount">Custom</span>
        </div>
        <ul class="plan-features">
          <li class="feature-included">✓ Envíos ilimitados</li>
          <li class="feature-included">✓ Account manager dedicado</li>
          <li class="feature-included">✓ SLA garantizado</li>
          <li class="feature-included">✓ Integración personalizada</li>
          <li class="feature-included">✓ Facturación corporativa</li>
        </ul>
        <button class="btn btn-secondary btn-lg btn-full">Contactar ventas</button>
      </div>
    </div>
    
    <!-- Guarantee -->
    <div class="guarantee">
      <span class="guarantee-icon">🛡️</span>
      <p>Garantía de satisfacción de 30 días. Si no estás satisfecho, te devolvemos tu dinero.</p>
    </div>
  </div>
</section>
```

```css
.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  max-width: 1100px;
  margin: var(--space-12) auto;
}

.plan-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  position: relative;
  transition: all var(--duration-normal) var(--ease-out);
}

.plan-featured {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary), var(--shadow-xl);
  transform: scale(1.05);
}

.plan-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: white;
  padding: var(--space-1) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
}

.price-amount {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: 800;
  color: var(--color-text);
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: var(--space-8) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.feature-included {
  color: var(--color-text);
}

.feature-excluded {
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.btn-full {
  width: 100%;
}

@media (max-width: 768px) {
  .plans-grid {
    grid-template-columns: 1fr;
  }
  .plan-featured {
    transform: none;
    order: -1;
  }
}
```

---

## FAQ Section

```html
<section class="faq">
  <div class="container">
    <h2>Preguntas frecuentes</h2>
    <div class="faq-grid">
      <details class="faq-item">
        <summary class="faq-question">
          ¿Cuánto tarda la entrega?
          <svg class="faq-arrow"><!-- chevron --></svg>
        </summary>
        <div class="faq-answer">
          <p>Nuestro tiempo promedio de entrega es de 24-48 horas 
          para ciudades principales y 48-72 horas para zonas rurales.</p>
        </div>
      </details>
      <!-- More items... -->
    </div>
  </div>
</section>
```

```css
.faq-item {
  border-bottom: 1px solid var(--color-border-subtle);
}

.faq-question {
  padding: var(--space-5) 0;
  cursor: pointer;
  font-size: var(--text-lg);
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}

.faq-question::-webkit-details-marker { display: none; }

.faq-arrow {
  transition: transform var(--duration-normal) var(--ease-out);
}

details[open] .faq-arrow {
  transform: rotate(180deg);
}

.faq-answer {
  padding-bottom: var(--space-5);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  animation: slideDown 0.3s var(--ease-out);
}

@keyframes slideDown {
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 200px; }
}
```

---

## Copywriting Formulas

### Hero Headline (PAS: Problem → Agitate → Solution)

```
FORMULA: [Resultado Deseado] + [en Tiempo Específico] + [Sin Objeción Principal]

EXAMPLES:
✅ "Envía paquetes a todo Ecuador desde $2.50 — entrega en 24h"
✅ "Lanza tu tienda online en 48 horas sin saber programar"
✅ "Duplica tus ventas en 30 días con email marketing automático"

❌ "La mejor plataforma de envíos" (genérico, sin beneficio)
❌ "Soluciones innovadoras de logística" (corporativo vacío)
```

### Feature Bullets (FAB: Feature → Advantage → Benefit)

```
FORMULA: [Verbo de acción] + [lo que hace] + [por qué importa]

EXAMPLES:
✅ "Rastrea cada paquete en tiempo real — nunca pierdas un envío"
✅ "Cobra contra entrega — tus clientes pagan al recibir"
✅ "Integra tu tienda en 5 minutos — sin código, sin complicaciones"
```

### CTA Buttons

```
FORMULA: [Verbo] + [Beneficio] + [Sin Fricción]

✅ "Cotizar envío gratis"           (acción + beneficio + sin costo)
✅ "Empezar prueba de 14 días"      (acción + duración + implica gratis)
✅ "Crear cuenta en 30 segundos"     (acción + velocidad)

❌ "Enviar"                          (genérico)
❌ "Registrarse"                     (suena a compromiso)
❌ "Comprar ahora"                   (demasiado agresivo para landing)
```

---

## Conversion Checklist

- [ ] Hero headline communicates value in < 5 seconds
- [ ] Primary CTA button above the fold without scrolling
- [ ] CTA color contrasts with rest of page (draws eye)
- [ ] Social proof within first scroll (logos, numbers, testimonials)
- [ ] Maximum 3 form fields for lead generation
- [ ] Trust signals: guarantee, security badges, client logos
- [ ] FAQ section addresses top 5 buying objections
- [ ] Analytics tracking on all CTA clicks
- [ ] Mobile CTA is full-width and thumb-reachable
- [ ] Page loads in under 2 seconds
- [ ] No broken images or links
- [ ] WhatsApp/chat button for immediate objection handling
