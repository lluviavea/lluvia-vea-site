import { MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { education, journey } from "@/lib/content";
import { cn } from "@/lib/utils";

export function CareerJourney() {
  return (
    <section id="trayectoria" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading index="02" label="Trayectoria" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
            Una carrera que une la{" "}
            <span className="text-gradient">cosmiatría</span> y el marketing.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ol className="border-border/70 relative space-y-12 border-l pl-8">
              {journey.map((job, i) => (
                <li key={job.org} className="relative">
                  <span
                    className={cn(
                      "absolute top-1.5 -left-[37px] flex size-2.5 items-center justify-center rounded-full",
                      job.current ? "bg-accent" : "bg-muted-foreground/40",
                    )}
                  >
                    {job.current && (
                      <span className="bg-accent/60 absolute inline-flex size-full animate-ping rounded-full" />
                    )}
                  </span>
                  <Reveal delay={0.08 * i}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-serif text-2xl tracking-tight">
                        {job.role}
                      </h3>
                      <span className="text-muted-foreground font-mono text-sm">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-accent mt-1">{job.org}</p>
                    <p className="text-muted-foreground mt-1 inline-flex items-center gap-1 text-sm">
                      <MapPin className="size-3.5" />
                      {job.location}
                    </p>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      {job.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <li
                          key={tag}
                          className="bg-accent-soft text-accent rounded-full px-3 py-1 text-xs"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-1">
            <Reveal delay={0.16}>
              <h3 className="text-muted-foreground font-mono text-sm tracking-[0.2em] uppercase">
                Educación
              </h3>
              <div className="mt-6 space-y-6">
                {education.map((e) => (
                  <div
                    key={e.title}
                    className="border-border bg-card rounded-2xl border p-6"
                  >
                    <p className="font-serif text-xl tracking-tight">
                      {e.title}
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {e.org}
                    </p>
                    <p className="text-accent mt-3 font-mono text-xs">
                      {e.period}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
