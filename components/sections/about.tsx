import { Download } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { about, cv, profile } from "@/lib/content";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading index="01" label={about.heading} />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
                {about.lead}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="text-muted-foreground mt-6 space-y-4 text-lg leading-relaxed">
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <figure className="border-accent mt-8 border-l-2 pl-5">
                <blockquote className="text-foreground/90 font-serif text-lg leading-relaxed italic">
                  “{about.quote}”
                </blockquote>
                <figcaption className="text-muted-foreground mt-2 text-xs tracking-[0.18em] uppercase">
                  — {about.quoteSource}
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {about.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border-border bg-card/60 text-muted-foreground rounded-full border px-3.5 py-1.5 text-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="lg:pl-8">
            <div className="glow-accent border-border bg-card rounded-3xl border p-8">
              <div className="flex items-center gap-4">
                <div className="from-accent text-accent-foreground flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br to-fuchsia-500 font-serif text-2xl">
                  {profile.initials}
                </div>
                <div>
                  <p className="font-serif text-xl">{profile.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {profile.role}
                  </p>
                </div>
              </div>
              <dl className="border-border/60 mt-8 grid grid-cols-2 gap-6 border-t pt-6">
                {about.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-muted-foreground text-xs tracking-wide uppercase">
                      {f.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={cv.href}
                download
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    className: "mt-8 w-full",
                  }),
                )}
              >
                <Download className="size-4" />
                {cv.label}
                <span className="text-muted-foreground text-xs">
                  ({cv.hint})
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
