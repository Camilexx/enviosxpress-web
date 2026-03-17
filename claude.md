# Antigravity Skills Arsenal — claude.md v1.0

## Estado Actual: ✅ COMPLETADO

## Descripción
Arsenal profesional de Skills y Workflows para el desarrollo web con Antigravity AI.
Cada skill contiene instrucciones accionables, código concreto, y checklists verificables.

## Stack del Arsenal
- **Formato:** SKILL.md con YAML frontmatter
- **Estructura:** Skills en `/skills/[nombre]/SKILL.md`
- **Workflows:** Automatizaciones en `/.agent/workflows/[nombre].md`
- **Referencia:** Basado en patrones de shadcn/ui, nextjs/saas-starter, midday-ai/v1

---

## Inventario de Skills (12)

### Core (los 4 más impactantes)
| # | Skill | Archivo | Líneas | Contenido Clave |
|---|-------|---------|--------|-----------------|
| 1 | 🏗️ Web Architecture | `skills/web-architecture/SKILL.md` | ~400 | Arquitectura, DB schema, API design, auth |
| 2 | 🎨 Design System Pro | `skills/design-system-pro/SKILL.md` | ~450 | Tokens CSS, tipografía, paletas, auditoría 50pts |
| 3 | 🚀 Landing Page CRO | `skills/landing-page-cro/SKILL.md` | ~400 | Hero, pricing, FAQ, copy formulas, conversión |
| 4 | 💻 Next.js Fullstack | `skills/nextjs-fullstack/SKILL.md` | ~420 | App Router, data fetching, forms, animations, SEO |

### Avanzados (8 especializaciones)
| # | Skill | Archivo | Contenido Clave |
|---|-------|---------|-----------------|
| 5 | ✍️ Copywriting Pro | `skills/copywriting-pro/SKILL.md` | Fórmulas PAS/FAB, CTAs, microcopy, emails |
| 6 | 💳 Stripe Payments | `skills/stripe-payments/SKILL.md` | Checkout, webhooks, portal, planes, testing |
| 7 | 🗄️ Supabase Backend | `skills/supabase-backend/SKILL.md` | DB, RLS, auth, Drizzle ORM, migrations |
| 8 | 🔍 SEO Masterclass | `skills/seo-masterclass/SKILL.md` | Meta tags, sitemap, JSON-LD, Core Web Vitals |
| 9 | ⚡ Performance Audit | `skills/performance-audit/SKILL.md` | Images, fonts, bundles, caching, lazy load |
| 10 | 🧪 Testing & QA | `skills/testing-qa/SKILL.md` | Vitest, Playwright, E2E, accessibility |
| 11 | 🚀 DevOps Deploy | `skills/devops-deploy/SKILL.md` | GitHub Actions, Vercel, Docker, Sentry |
| 12 | 🔎 Competitor Analysis | `skills/competitor-analysis/SKILL.md` | Visual audit, tech detection, CRO, diferenciación |
| 13 | 🤖 WhatsApp AI Bot | `skills/whatsapp-ai-bot/SKILL.md` | Bot gratis con IA (Gemini + whatsapp-web.js) p/ Meta Ads |

---

## Workflows (4)

| Workflow | Comando | Pasos | Uso |
|----------|---------|-------|-----|
| `/new-project` | Crear desde cero | 62 | Proyecto nuevo completo |
| `/audit-site` | Auditar sitio | 37 | Auditoría integral |
| `/deploy` | Deploy a producción | 19 | Publicar en Vercel |
| `/improve-project` | Mejorar existente | 36 | Mejoras iterativas |

---

## Decisiones Clave

| Decisión | Justificación |
|----------|---------------|
| Skills como SKILL.md | Formato estándar que shadcn/ui usa, compatible con el sistema |
| CSS Variables sobre Tailwind config | Más portables, funcionan en cualquier proyecto |
| Código concreto en cada skill | Evita skills genéricos inútiles — todo es copiar/adaptar |
| Drizzle ORM sobre Prisma | Más ligero, mejor TypeScript, SQL más directo |
| Zod para validación | Runtime validation + TypeScript inference |
| Cookie-based JWT | Más simple que Supabase Auth para proyectos custom |

---

## Cómo Usar Este Arsenal

### Para un proyecto nuevo:
```
1. Usa /new-project workflow
2. Sigue las fases en orden
3. Referencia skills específicos según la fase
```

### Para mejorar un proyecto existente (ej: EnviosXpress):
```
1. Usa /improve-project workflow  
2. Empieza con /audit-site
3. Prioriza fixes P0 → P1 → P2
4. Referencia skills según el área a mejorar
```

### Para auditar un sitio:
```
1. Usa /audit-site workflow
2. Genera reporte con hallazgos
3. Crea plan de acción priorizados
```

---

## Próximos 3 Pasos

1. ✅ Arsenal de Skills completo y funcional
2. 🔄 **Aplicar /improve-project a EnviosXpress** — usar las skills para llevar el proyecto al siguiente nivel
3. ⏳ Expandir skills según necesidades del proyecto (agregar skills de WhatsApp Bot, CRM, etc.)

---

## Errores Conocidos
_Ninguno identificado en esta versión._

---

*Última actualización: 2026-03-07*
*Versión: 1.0*
