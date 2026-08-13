# Continuar en otra sesión

> **Lee este documento al iniciar una sesión** para retomar este proyecto sin perder contexto.
> Referencia de estado: `review.md` §12 (tabla de remediación).

## Proyecto

Sitio web profesional de **Lluvia Vea** (cosmiatra, Culiacán, México). Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript (strict) · pnpm.

- Repo: `github.com/lluviavea/lluvia-vea-site` (público, rama `main`).
- Git: trabajamos con commits atómicos y convencionales; hook `hk` con conventional commits + linters.
- Idioma del sitio: español (es-MX).

## Estado actual (resumen)

- Sitio completo: hero, sobre mí, trayectoria, `/portafolio`, contacto, footer, tema claro/oscuro.
- Digital twin (chat IA) con OpenRouter (`openai/gpt-oss-20b:free`), streaming, rate-limit, accesible y lazy-load.
- Remediación de `review.md` aplicada y verificada (`just check` + `just build` verdes).
- Todo commiteado y pusheado; árbol limpio.

## Qué falta (por prioridad)

1. **B8 — `pnpm audit`** — revisar dependencias por vulnerabilidades. Si hay hallazgos, remediarlos o documentarlos.
2. **B9 — Tests (vitest)** — deuda mayor de calidad:
   - Extraer el parser SSE del chat a un helper puro (p. ej. `lib/sse.ts`) para que sea unit-testable.
   - Tests para `lib/sse.ts` (parseo de `data:` con `[DONE]`, chunks parciales, `reasoning`/`content`).
   - Tests para `lib/twin-prompt.ts` (el system prompt incluye nombre, experiencia, educación; nunca inventa datos).
   - Instalar `vitest` como devDependency y añadir `just test`.
3. **Retrato de Lluvia** — montar foto con `next/image` (sharp ya habilitado). Requiere que Lluvia pase la ruta del archivo. Diseño previsto: reemplazar o complementar el monograma "LV" en el hero/about.
4. **Deploy a Vercel** — el repo está en GitHub, el deploy es casi automático. Configurar en el entorno: `OPENROUTER_API_KEY` y `NEXT_PUBLIC_SITE_URL` (dominio real). Decisión previa: repo público (ya está) o privado.
5. **JSON-LD** — datos estructurados (`Person`, `ProfessionalService` para Serendipia) en el layout o por página.

## Comandos

```bash
just setup      # herramientas (mise) + dependencias (pnpm)
just dev        # servidor de desarrollo (correr en terminal aparte)
just check      # eslint + tsc --noEmit
just build      # build de producción
just format     # prettier
```

> Hooks `hk`: requieren `node_modules/.bin` en el PATH (prettier/eslint/markdownlint) y el shim de mise `ec` (editorconfig). `markdownlint-cli` ya está como devDependency y `.markdownlint.jsonc` desactiva `MD013`.

## Mapa de archivos clave

- `lib/content.ts` — única fuente de contenido (perfil, hero, about, journey, education, portfolio, twin, contact).
- `lib/twin-prompt.ts` — system prompt del digital twin, generado desde `content.ts`.
- `app/api/chat/route.ts` — endpoint streaming (OpenRouter, rate-limit, sanitización).
- `components/digital-twin.tsx` — widget de chat; `components/digital-twin-loader.tsx` — lazy-load.
- `app/portafolio/page.tsx` — página de portafolio.
- `app/error.tsx`, `app/not-found.tsx` — páginas de error con identidad.
- `review.md` — auditoría de código (hallazgos + estado de remediación).
- `docs/continuar.md` — este documento.

## Decisiones abiertas para Lluvia

- ¿Repo público (actual) o privado?
- ¿Montar el retrato? (necesita la ruta de la foto)
- ¿Deploy a Vercel cuando esté listo?
- ¿Añadir tests (recomendado, B9)?
