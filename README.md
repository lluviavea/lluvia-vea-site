# Lluvia Vea — Sitio profesional

Sitio web personal de **Lluvia Esmeralda Vea Heredia**, cosmiatra y emprendedora en Culiacán, Sinaloa. Diseño "enterprise meets edgy": violeta eléctrico, serif de display, grano fílmico y microinteracciones. Construido con Next.js 16, React 19, Tailwind CSS 4 y TypeScript.

## Características

- **Inicio** — Hero con malla de gradiente, marquesina de aptitudes y estadísticas.
- **Sobre mí** — Perfil profesional, cita desde LinkedIn y descarga del CV en PDF.
- **Trayectoria** — Línea de tiempo de experiencia + educación (datos verificados de LinkedIn).
- **Portafolio** — Ruta `/portafolio` con casos de estudio próximamente.
- **Contacto** — Correo, WhatsApp y LinkedIn.
- **Digital Twin** — Chatburbuja flotante que responde sobre la carrera de Lluvia usando la API de OpenRouter (modelo `openai/gpt-oss-20b:free`), con conocimiento generado desde `lib/content.ts`.
- **Temas** claro/oscuro, animaciones con `motion`, SEO (metadata, Open Graph, sitemap, robots) y página de error/404 personalizadas.

## Stack

| Herramienta                        | Uso                |
| ---------------------------------- | ------------------ |
| Next.js 16 (App Router, Turbopack) | Framework          |
| React 19                           | UI                 |
| Tailwind CSS 4                     | Estilos            |
| TypeScript (strict)                | Tipado             |
| pnpm                               | Gestor de paquetes |
| motion                             | Animaciones        |
| next-themes                        | Tema claro/oscuro  |
| lucide-react                       | Iconos             |

## Comandos

```bash
just setup      # instala herramientas (mise) y dependencias (pnpm)
just dev        # servidor de desarrollo (córrelo en tu terminal)
just build      # build de producción
just check      # lint + typecheck
just format     # Prettier en todo el repo
```

## Variables de entorno

Copia `.env.example` a `.env` (no se commitea). Variables:

- `NEXT_PUBLIC_SITE_URL` — URL pública para SEO/Open Graph.
- `OPENROUTER_API_KEY` — clave de OpenRouter para el digital twin (el archivo `.env` local usa `openrouter_api_key`; ambas funcionan).

## Estructura

```text
app/                 # rutas, layout, metadata, API
  api/chat/          # endpoint streaming del digital twin
  portafolio/        # página de portafolio
components/
  sections/          # hero, about, trayectoria, contacto, footer, navbar
  ui/                # primitivas (button)
  digital-twin*      # widget de chat (lazy-load)
lib/
  content.ts         # única fuente de contenido del sitio
  twin-prompt.ts     # system prompt del digital twin (desde content.ts)
public/              # estáticos (CV en PDF)
review.md            # auditoría de código con plan de remediación
```

## Revisión

- `review.md` — auditoría de código completa y estado del plan de remediación.
- `docs/continuar.md` — lee este documento al iniciar una sesión para retomar el trabajo pendiente.

---

Hecho con cariño desde Sinaloa, México.
