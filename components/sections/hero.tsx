import { ArrowRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { hero, profile } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center overflow-hidden pt-16"
    >
      <div aria-hidden className="mesh absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="grid-pattern mask-fade absolute inset-0 -z-10 opacity-60"
      />

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-24 sm:px-6">
        <Reveal>
          <span className="border-border bg-card/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur">
            <span className="bg-accent size-1.5 rounded-full" />
            {hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">
            {hero.headlinePre}{" "}
            <span className="text-gradient italic">{hero.headlineAccent}</span>{" "}
            {hero.headlinePost}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
            {hero.subhead}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryCta.href}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {hero.primaryCta.label}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {hero.secondaryCta.label}
            </a>
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
              <MapPin className="size-4" />
              {profile.locationShort}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <dl className="border-border/60 mt-16 grid max-w-lg grid-cols-3 gap-6 border-t pt-8">
            {hero.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dd className="font-serif text-3xl tracking-tight">
                  {s.value}
                </dd>
                <dt className="text-muted-foreground text-sm">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div
        aria-hidden
        className="marquee border-border/40 bg-background/50 relative w-full overflow-hidden border-t py-4 backdrop-blur-sm"
      >
        <div className="marquee-track mask-fade-x">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center">
              {hero.marquee.map((keyword) => (
                <span
                  key={keyword}
                  className="text-muted-foreground flex items-center gap-8 px-8 font-mono text-xs tracking-[0.22em] uppercase"
                >
                  {keyword}
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
