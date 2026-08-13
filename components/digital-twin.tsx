"use client";

import { Send, Sparkles, X } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { twin } from "@/lib/content";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

function StreamingDots() {
  return (
    <span className="flex items-center gap-1" aria-label="Escribiendo">
      <span className="bg-accent size-1.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
      <span className="bg-accent size-1.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
      <span className="bg-accent size-1.5 animate-bounce rounded-full" />
    </span>
  );
}

export function DigitalTwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      launcherRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(raw?: string) {
    const content = (raw ?? input).trim();
    if (!content || streaming) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    let fallback =
      "No tengo información documentada sobre eso. Escríbele a Lluvia directamente ✉️";
    let errorMessage = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        let detail =
          "No pude responder en este momento. Inténtalo en unos segundos.";
        try {
          const data = (await res.json()) as { error?: string };
          if (data.error) detail = data.error;
        } catch {
          /* body not JSON */
        }
        throw new Error(detail);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload) as {
              choices?: Array<{ delta?: { content?: string } }>;
            };
            const delta = json.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              acc += delta;
              setMessages((prev) => {
                const copy = [...prev];
                const last = copy[copy.length - 1];
                if (last?.role === "assistant") {
                  copy[copy.length - 1] = { role: "assistant", content: acc };
                }
                return copy;
              });
            }
          } catch {
            /* ignore partial JSON chunk */
          }
        }
      }

      if (acc.trim()) fallback = "";
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Algo salió mal. Inténtalo de nuevo.";
      fallback = "";
      errorMessage = message;
    } finally {
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role === "assistant" && !last.content) {
          copy[copy.length - 1] = {
            role: "assistant",
            content: fallback || errorMessage,
          };
        }
        return copy;
      });
      setStreaming(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send();
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={twin.title}
          className="border-border bg-background/85 shadow-accent/20 flex h-[30rem] w-[calc(100vw-2rem)] max-w-96 flex-col overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl"
        >
          <div className="border-border/60 from-accent/10 to-accent-hot/10 flex items-center gap-3 border-b bg-gradient-to-r px-5 py-4">
            <span className="from-accent to-accent-hot text-accent-foreground flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br">
              <Sparkles className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-base tracking-tight">
                {twin.title}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {twin.subtitle}
              </p>
            </div>
            <span
              className={cn(
                "relative flex size-2",
                streaming && "animate-pulse",
              )}
              aria-hidden
            >
              <span className="bg-accent absolute inline-flex size-full rounded-full opacity-70" />
            </span>
            <button
              type="button"
              aria-label={twin.closeLabel}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-full transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            aria-live="polite"
            aria-label="Conversación"
            className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
          >
            {messages.length === 0 ? (
              <>
                <p className="border-border bg-card rounded-2xl rounded-bl-sm border p-4 text-sm leading-relaxed">
                  {twin.greeting}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {twin.suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={streaming}
                      onClick={() => void send(s)}
                      className="border-border bg-card/60 text-muted-foreground hover:border-accent/60 hover:text-foreground rounded-full border px-3 py-1.5 text-xs transition-colors disabled:opacity-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                    m.role === "user"
                      ? "bg-accent text-accent-foreground ml-auto rounded-br-sm"
                      : "border-border bg-card rounded-bl-sm border",
                  )}
                >
                  {streaming && i === messages.length - 1 && !m.content ? (
                    <StreamingDots />
                  ) : (
                    m.content
                  )}
                </div>
              ))
            )}
          </div>

          <form
            onSubmit={onSubmit}
            className="border-border/60 flex items-center gap-2 border-t p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={twin.placeholder}
              aria-label={twin.placeholder}
              className="border-border bg-card/60 placeholder:text-muted-foreground focus:border-accent/60 h-11 flex-1 rounded-full border px-4 text-sm transition-colors outline-none"
            />
            <button
              type="submit"
              aria-label={twin.sendLabel}
              disabled={!input.trim() || streaming}
              className="bg-accent text-accent-foreground shadow-accent/25 hover:shadow-accent/40 inline-flex size-11 shrink-0 items-center justify-center rounded-full shadow-lg transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        aria-label={twin.openLabel}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "from-accent to-accent-hot text-accent-foreground shadow-accent/30 relative inline-flex size-14 items-center justify-center rounded-full bg-gradient-to-br shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95",
          open && "rotate-90",
        )}
      >
        <span
          aria-hidden
          className="bg-accent/40 absolute inline-flex size-full animate-ping rounded-full motion-reduce:animate-none"
        />
        {open ? <X className="size-5" /> : <Sparkles className="size-5" />}
      </button>
    </div>
  );
}
