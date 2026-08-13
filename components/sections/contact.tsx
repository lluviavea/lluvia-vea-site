import { Mail, MessageCircle } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { contact, profile } from "@/lib/content";

const waText = encodeURIComponent(
  "Hola Lluvia, vi tu sitio y me encantaría conectar.",
);

const cards = [
  {
    label: contact.emailLabel,
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: contact.whatsappLabel,
    value: profile.phoneDisplay,
    href: `https://wa.me/${profile.whatsapp}?text=${waText}`,
    icon: MessageCircle,
  },
  {
    label: contact.linkedinLabel,
    value: "@lluviavea",
    href: profile.linkedin,
    icon: LinkedinIcon,
  },
];

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading index="04" label={contact.heading} />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
            {contact.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-muted-foreground mt-4 max-w-xl text-lg leading-relaxed">
            {contact.lead}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={0.08 * i}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group border-border bg-card hover:border-accent/60 hover:shadow-accent/10 flex h-full flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <c.icon className="text-accent size-6" />
                <div className="mt-10">
                  <p className="text-muted-foreground text-xs tracking-wide uppercase">
                    {c.label}
                  </p>
                  <p className="mt-1 font-medium break-all">{c.value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
