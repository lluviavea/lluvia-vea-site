# Revisión de Código — Sitio Web Profesional de Lluvia Vea

**Fecha:** 2026-08-13
**Proyecto:** `~/projects/site` — Sitio personal (Next.js 16, React 19, Tailwind CSS 4, TypeScript, pnpm)
**Alcance:** 100% del código fuente (`app/`, `components/`, `lib/`, archivos de configuración).
**Método:** Revisión estática manual + verificación con `just check` (ESLint + `tsc --noEmit`) y `just build` (producción). Prueba de humo en vivo del endpoint OpenRouter (autenticación, modelo `openai/gpt-oss-20b:free`, streaming SSE).

**Veredicto:** Base sólida y arquitectura limpia. Listo para producción después de reparar 2 hallazgos altos y 4 medios. No se detectaron problemas de seguridad críticos.

---

## 1. Resumen de hallazgos

| Prioridad | Cant. | Clave  |
| --------- | ----- | ------ |
| Alta      | 2     | A1, A2 |
| Media     | 4     | M1–M4  |
| Baja      | 9     | B1–B9  |

---

## 2. Hallazgos

### 2.1 Alta prioridad

#### A1 — Los errores del chat quedan ocultos detrás de una respuesta falsa

- **Archivo:** `components/digital-twin.tsx:120`
- **Descripción:** en el bloque `finally` se asigna `content: fallback || errorMessage`. `fallback` es una cadena no vacía por defecto ("No tengo información documentada sobre eso…") y únicamente se vacía en el camino de éxito (`digital-twin.tsx:108`). Cuando ocurre un error —la respuesta no-OK se lanza en `digital-twin.tsx:66` (clave inválida, rate-limit upstream, etc.)—, `errorMessage` nunca llega a mostrarse.
- **Impacto:** el usuario recibe una "respuesta" de la IA que en realidad es un mensaje genérico. Se enmascara el fallo real, genera confusión y dificulta el soporte.
- **Acción correctiva:** en el `catch`, hacer `fallback = ""` antes de asignar `errorMessage`, o componer el contenido explícitamente: `content: errorMessage || fallback`.

#### A2 — `sharp` deshabilitado romperá la optimización de imágenes en producción

- **Archivo:** `pnpm-workspace.yaml:2`
- **Descripción:** `allowBuilds: { sharp: false }` impide la instalación del binario de sharp. Next.js 16 requiere sharp para `next/image` en producción (`next start`); sin él, servir una imagen optimizada lanza un error en runtime.
- **Impacto:** hoy no falla porque el sitio no usa imágenes, pero es bloqueante para la tarea ya planificada (montar el retrato de Lluvia con `next/image`).
- **Acción correctiva:** eliminar el bloque `sharp: false` (o declarar `sharp` como dependencia y permitir su build) **antes** de introducir `next/image`. Si se prefiere servir imágenes sin optimización, usar `unoptimized` o un loader propio.

### 2.2 Media prioridad

#### M1 — `/api/chat` sin límites de uso ni de tamaño

- **Archivo:** `app/api/chat/route.ts:19-21`
- **Descripción:** el historial se recorta por cantidad (últimos 16 mensajes) pero no por tamaño: cada mensaje puede ser arbitrariamente largo. Endpoint público, sin autenticación ni rate-limit.
- **Impacto:** vectores de abuso/costo: spam, payloads gigantes, uso repetido. Aunque el modelo `:free` tiene límites upstream, conviene proteger el propio endpoint.
- **Acción correctiva:** validar y truncar cada mensaje (p. ej. ≤ 2000 caracteres), y añadir un limitador simple (in-memory por IP o cabecera) o un servicio de rate-limit dedicado antes de exponer el sitio.

#### M2 — Botón "volver arriba" muerto en `/portafolio`

- **Archivo:** `components/sections/footer.tsx:75`
- **Descripción:** el enlace apunta a `#top`, pero `app/portafolio/page.tsx` no define ningún elemento con `id="top"`.
- **Impacto:** en la página de portafolio el botón no hace nada.
- **Acción correctiva:** añadir `id="top"` al `<section>` de la página de portafolio (o sustituir por un scroll-to-top por JS).

#### M3 — Accesibilidad del widget de chat

- **Archivo:** `components/digital-twin.tsx`
- **Descripción:** el panel no usa `role="dialog"` ni `aria-modal`; no hay cierre con `Escape`; el área de mensajes no declara `aria-live="polite"`; el foco no queda atrapado dentro del diálogo abierto.
- **Impacto:** el chat es inoperante o confuso para usuarios de lectores de pantalla y de teclado.
- **Acción correctiva:** convertir el panel en un diálogo accesible (`role="dialog"`, `aria-modal`), manejar la tecla `Escape`, añadir `aria-live="polite"` al contenedor de mensajes y, como mínimo, devolver el foco al botón launcher al cerrar.

#### M4 — El widget de chat viaja en el bundle inicial de todas las páginas

- **Archivo:** `app/layout.tsx:3,94`
- **Descripción:** `DigitalTwin` se importa estáticamente en el RootLayout; su código y el parser SSE se incluyen en el JS inicial aunque el usuario nunca abra el chat.
- **Impacto:** JS inicial innecesariamente mayor; peor LCP/INP en dispositivos modestos.
- **Acción correctiva:** importar con `next/dynamic` y `ssr:false` para diferir la descarga hasta la interacción.

### 2.3 Baja prioridad

| #   | Hallazgo                                                                                                                     | Archivo                                                                  | Acción                                                                                      |
| --- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| B1  | Código muerto: `Card` y el componente `Button` (solo se usa `buttonVariants`)                                                | `components/ui/card.tsx`, `components/ui/button.tsx`                     | Eliminar o usarlos                                                                          |
| B2  | Faux-bold en serif: `Instrument_Serif` solo carga peso 400; `font-semibold` simula negrita del navegador                     | `components/sections/navbar.tsx:33`, `components/section-heading.tsx:10` | Quitar `font-semibold` en contexto serif o cargar más pesos                                 |
| B3  | `@types/node@^20` frente a Node 24 de `mise.toml`                                                                            | `package.json`, `mise.toml`                                              | Sincronizar `@types/node@^24`                                                               |
| B4  | Sin `app/error.tsx` ni `app/not-found.tsx` personalizados                                                                    | `app/`                                                                   | Añadir 404 y error boundary con la identidad del sitio                                      |
| B5  | `README.md` sigue siendo el boilerplate de `create-next-app`                                                                 | `README.md`                                                              | Reescribirlo describiendo el proyecto y los comandos                                        |
| B6  | Varios ternarios largos pendientes de formateo; el hook `hk` los exigirá al commitear                                        | `components/digital-twin.tsx` y otros                                    | Ejecutar `just format`                                                                      |
| B7  | Sin `aria-expanded`/`aria-controls` en el toggle del menú móvil                                                              | `components/sections/navbar.tsx`                                         | Añadirlos                                                                                   |
| B8  | Dependencias sin auditar ni fijar                                                                                            | `package.json`, `pnpm-lock.yaml`                                         | Ejecutar `pnpm audit`; evaluar `pnpm approve-builds`/pinning                                |
| B9  | Sin tests; el parser SSE y la construcción del system prompt son unit-testables                                              | `components/digital-twin.tsx`, `lib/twin-prompt.ts`                      | Añadir tests (vitest) para ambos                                                            |
| B10 | Latencia de primera respuesta: `gpt-oss-20b` es un modelo de razonamiento (emite `delta.reasoning` antes de `delta.content`) | `app/api/chat/route.ts`                                                  | Evaluar `reasoning: { effort: "low", exclude: true }` en OpenRouter si el modelo lo soporta |

---

## 3. Seguridad

- **Clave de OpenRouter:** solo se lee en servidor (`app/api/chat/route.ts`), nunca se expone al cliente. ✅
- **Secretos:** `.env` en `.gitignore` (patrón `.env*` con `!.env.example`); `.env.example` documenta la variable (`OPENROUTER_API_KEY`). ✅
- **Atribución OpenRouter:** cabeceras `HTTP-Referer` y `X-Title` presentes. ✅
- **Logs:** el detalle de error de OpenRouter se trunca (400 caracteres) antes de registrarse. ✅
- **Riesgo inherente:** prompt injection sobre el digital twin (un usuario puede intentar romper el rol). Aceptable para un sitio personal; mitigar con instrucciones firmes en `lib/twin-prompt.ts` y sin exponer herramientas adicionales.
- **Pendiente:** límites de uso en `/api/chat` (M1).

---

## 4. Rendimiento

- Todo el contenido es estático prerenderizado (`/`, `/portafolio`, `sitemap.xml`, `robots.txt`, `opengraph-image`); solo `/api/chat` es dinámico. ✅
- Tipografías autoalojadas con `next/font` (Geist, Geist Mono, Instrument Serif). ✅
- **Optimizar:** lazy-load del widget de chat (M4); revisar el peso de `motion` y de los íconos de `lucide-react`.
- **Pendiente:** medición de Web Vitals (no crítico para un sitio estático).

---

## 5. Accesibilidad

- **Buenas prácticas ya presentes:** `lang="es"`, `:focus-visible` con ring, `aria-label` en botones de iconos, `prefers-reduced-motion` respetado en marquee y ping, jerarquía de encabezados correcta (un único `h1` por página), contenedores semánticos (`dl`/`dt`/`dd`, `ol` en la trayectoria).
- **Pendiente:** diálogo del chat (M3), `aria-expanded` en menú móvil (B7), verificación de contraste del texto en degradado y tamaño de objetivo táctil del toggle.

---

## 6. SEO y metadatos

- **Completo:** `metadataBase`, título con plantilla `%s — Lluvia Vea`, Open Graph (`es_MX`), Twitter card, `canonical`, `robots.ts`, `sitemap.ts` (incluye `/portafolio`) y `opengraph-image.tsx` generada. ✅
- **Oportunidades:** datos estructurados JSON-LD (`Person`, `ProfessionalService` para Serendipia), `themeColor`, `appleWebApp`/manifest.

---

## 7. Calidad de código y arquitectura

- **Fortalezas:** separación contenido/UI (`lib/content.ts` como única fuente de datos, con tipos), componentes atómicos (`components/ui/`, `components/sections/`), utilidad `cn` (clsx + tailwind-merge), variantes con `cva`, tokens CSS coherentes (violeta eléctrico light/dark), TypeScript `strict`, ESLint `core-web-vitals` + `typescript`.
- **Deuda:** índices de sección ("01"–"04") hardcodeados en los componentes en lugar de en el contenido; ausencia de tests; sin CI.

---

## 8. Proceso y mantenimiento

- **Git:** 20 archivos modificados/sin seguimiento sin commitear; sin remoto en GitHub; existe un único commit inicial.
- **Hooks `hk`:** `commit-msg` (conventional commits) y `pre-commit` (prettier, eslint, markdownlint, editorconfig) con `fix = true`. ✅
- **Justfile:** `setup`, `dev`, `build`, `lint`, `typecheck`, `format`, `check`. ✅
- **Acción recomendada:** commits atómicos por cambio, inicializar remoto (`gh`) y hacer push; ejecutar `just format` antes de commitear (el hook marcará `review.md` si no cumple markdownlint).

---

## 9. Fortalezas generales

- Diseño consistente y de calidad ("enterprise meets edgy"): degradado violeta eléctrico, grain, mesh, marquee, tokens compartidos.
- Arquitectura de contenido centralizada que evita duplicación y facilita ediciones futuras (incluso el system prompt del digital twin se genera desde `lib/content.ts`).
- Seguridad básica correcta: secretos fuera del repo, clave solo en servidor.
- Stack moderno y alineado: Next 16, React 19, Tailwind 4, pnpm, hooks de calidad con `hk` + Mise.

---

## 10. Plan de remediación priorizado

| Fase                      | Acciones                                                                        |
| ------------------------- | ------------------------------------------------------------------------------- |
| **1 — Inmediata**         | A1 (bug de errores del chat), A2 (habilitar sharp)                              |
| **2 — Antes de publicar** | M1 (límites del API), M2 (back-to-top), M3 (accesibilidad chat), M4 (lazy-load) |
| **3 — Mantenimiento**     | B1–B10                                                                          |

---

## 11. Decisiones abiertas

1. ¿Habilitar `sharp` (recomendado) o servir imágenes sin optimizar (`unoptimized`)?
2. ¿Rate-limit en memoria o con servicio externo?
3. ¿Añadir tests unitarios para el parser SSE y el system prompt?
4. ¿Inicializar el repo en GitHub y crear commits atómicos?
5. Montar el retrato de Lluvia requiere resolver A2 primero.

---

## 12. Estado de remediación (2026-08-13)

Corregido en este mismo pase:

| Hallazgo                           | Estado                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| A1 — errores del chat ocultos      | Corregido (`digital-twin.tsx`, `catch` con `fallback = ""`)                       |
| A2 — sharp deshabilitado           | Corregido (`pnpm-workspace.yaml` → `sharp: true`)                                 |
| M1 — límites de uso en `/api/chat` | Corregido (rate-limit por IP + tope de mensajes/longitud)                         |
| M2 — back-to-top en `/portafolio`  | Corregido (`id="top"` añadido)                                                    |
| M3 — accesibilidad del chat        | Corregido (`role="dialog"`, `aria-modal`, `Escape`, `aria-live`, retorno de foco) |
| M4 — bundle inicial del chat       | Corregido (`next/dynamic` con `ssr:false`)                                        |
| B1 — código muerto                 | Corregido (se eliminó `card.tsx` y el componente `Button`)                        |
| B2 — faux-bold serif               | Corregido (`navbar.tsx`)                                                          |
| B3 — `@types/node`                 | Corregido (`^24`)                                                                 |
| B4 — páginas de error/404          | Corregido (`app/error.tsx`, `app/not-found.tsx`)                                  |
| B5 — README boilerplate            | Corregido (reescrito)                                                             |
| B6 — formato Prettier              | Corregido (`just format`)                                                         |
| B7 — `aria-expanded` en menú móvil | Corregido (`navbar.tsx`)                                                          |
| B8 — auditoría de dependencias     | Pendiente (`pnpm audit`)                                                          |
| B9 — tests                         | Pendiente (propuesto vitest)                                                      |
| B10 — latencia por razonamiento    | Corregido (`reasoning: { effort: "low", exclude: true }`, verificado en vivo)     |

Además: el hook `hk` ahora dispone de `markdownlint-cli` como devDependency (su binario era requerido y faltaba) y se añadió `.markdownlint.jsonc` (se desactiva `MD013`, líneas largas por tablas/URLs/refs de archivo).

---

## Anexo — Comandos de verificación ejecutados

```bash
just check     # eslint + tsc --noEmit   → sin errores ni advertencias
just build     # next build (producción)  → compilación OK, rutas estáticas OK
```

Prueba en vivo de `openai/gpt-oss-20b:free` (streaming): autenticación válida, el modelo emite 35 chunks de razonamiento y luego el contenido real (confirmado con parser que filtra `delta.reasoning`).
