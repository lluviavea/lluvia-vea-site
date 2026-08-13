import { buildTwinSystemPrompt } from "@/lib/twin-prompt";
import { siteUrl } from "@/lib/content";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "openai/gpt-oss-20b:free";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const MAX_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 2000;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 12;

type ChatMessage = { role: "user" | "assistant"; content: string };

function getApiKey(): string | null {
  const key =
    process.env.OPENROUTER_API_KEY ?? process.env.openrouter_api_key ?? "";
  return key.trim() || null;
}

// Bounded in-memory rate limiter (per instance). Good enough for a
// personal site; swap for a store-backed limiter if scaled.
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const record = hits.get(key);

  if (!record || now > record.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  record.count += 1;
  if (record.count <= RATE_LIMIT_MAX) {
    return { allowed: true, retryAfter: 0 };
  }

  return {
    allowed: false,
    retryAfter: Math.ceil((record.resetAt - now) / 1000),
  };
}

function clientKey(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return (
    fwd?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local"
  );
}

// Validate, sanitize and bound the incoming conversation.
function sanitize(messages: unknown): ChatMessage[] | null {
  if (!Array.isArray(messages)) return null;

  const clean: ChatMessage[] = [];
  for (const raw of messages) {
    const msg = raw as { role?: unknown; content?: unknown };
    if (
      (msg.role !== "user" && msg.role !== "assistant") ||
      typeof msg.content !== "string"
    ) {
      return null;
    }
    clean.push({
      role: msg.role,
      content: msg.content.slice(0, MAX_MESSAGE_LENGTH),
    });
    if (clean.length >= MAX_MESSAGES) break;
  }
  return clean;
}

export async function POST(request: Request) {
  const { allowed, retryAfter } = rateLimit(clientKey(request));
  if (!allowed) {
    return Response.json(
      {
        error: `Has hecho demasiadas peticiones. Inténtalo de nuevo en ${retryAfter} segundos.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Falta la clave OPENROUTER_API_KEY en .env. La necesito para que el digital twin responda.",
      },
      { status: 500 },
    );
  }

  let body: { messages?: unknown };
  try {
    body = (await request.json()) as { messages?: unknown };
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const messages = sanitize(body?.messages);
  if (!messages || messages.length === 0) {
    return Response.json(
      { error: "No hay mensajes para responder." },
      { status: 400 },
    );
  }

  const systemPrompt = buildTwinSystemPrompt();

  const upstream = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl, // OpenRouter attribution
      "X-Title": "Lluvia Vea — Digital Twin",
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      reasoning: { effort: "low", exclude: true },
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
  });

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error("OpenRouter error", upstream.status, detail.slice(0, 400));
    return Response.json(
      {
        error:
          upstream.status === 401 || upstream.status === 403
            ? "La clave de OpenRouter no es válida. Revisa OPENROUTER_API_KEY en .env."
            : "El modelo no respondió en este momento. Inténtalo en unos segundos.",
      },
      { status: 502 },
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Connection: "keep-alive",
    },
  });
}
