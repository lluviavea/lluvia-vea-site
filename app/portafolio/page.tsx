import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { portfolioPage, profile } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Portafolio",
  description:
    "Casos, tratamientos y proyectos donde la cosmiatría se encuentra con el marketing.",
};

export default function PortfolioPage() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div aria-hidden className="mesh absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="grid-pattern mask-fade absolute inset-0 -z-10 opacity-70"
      />

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <span className="border-border bg-card/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur">
            <span className="bg-accent size-1.5 rounded-full" />
            {portfolioPage.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            {portfolioPage.headlinePre}{" "}
            <span className="text-gradient italic">
              {portfolioPage.headlineAccent}
            </span>{" "}
            {portfolioPage.headlinePost}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
            {portfolioPage.lead}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={portfolioPage.ctaHref}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {portfolioPage.ctaLabel}
              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
              Volver al inicio
            </Link>
          </div>
        </Reveal>

        <div className="mt-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="border-accent/40 bg-accent-soft text-accent inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium">
                <Sparkles className="size-3.5" />
                {portfolioPage.casesNote}
              </span>
              <span className="bg-border/60 h-px flex-1" />
              <span className="text-muted-foreground font-mono text-sm">
                {profile.initials}
              </span>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {portfolioPage.cases.map((item, i) => (
              <Reveal key={item.index} delay={0.08 * i} className="h-full">
                <article className="glow-accent border-border bg-card/70 hover:border-accent/50 flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm transition-colors">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-accent font-mono text-sm">
                      {item.index}
                    </span>
                    <span className="border-border text-muted-foreground rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.15em] uppercase">
                      Próximamente
                    </span>
                  </div>
                  <h2 className="mt-6 font-serif text-xl leading-snug tracking-tight">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {item.blurb}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="bg-accent-soft text-accent rounded-full px-2.5 py-1 text-xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
