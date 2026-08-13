import { ArrowUpRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { portfolio } from "@/lib/content";

export function PortfolioCta() {
  return (
    <section id="portafolio" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading index="03" label={portfolio.eyebrow} />
        </Reveal>
        <Reveal delay={0.08}>
          <Link
            href="/portafolio"
            className="group border-border bg-card hover:border-accent/50 relative mt-10 block overflow-hidden rounded-3xl border p-10 transition-colors duration-300 sm:p-16"
          >
            <div aria-hidden className="mesh absolute inset-0 opacity-60" />
            <div
              aria-hidden
              className="bg-accent/10 group-hover:bg-accent/20 absolute -top-20 -right-20 size-64 rounded-full blur-3xl transition-all duration-500"
            />
            <div className="relative">
              <span className="border-accent/40 bg-accent-soft text-accent inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium">
                <Briefcase className="size-3.5" />
                Casos · Tratamientos · Proyectos
              </span>
              <h2 className="mt-6 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
                {portfolio.title}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl text-lg leading-relaxed">
                {portfolio.description}
              </p>
              <span className="text-accent mt-8 inline-flex items-center gap-2 font-medium">
                {portfolio.cta}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
