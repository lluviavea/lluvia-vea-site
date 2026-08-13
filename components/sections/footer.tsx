import { ArrowUp, Mail } from "lucide-react";
import Link from "next/link";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { footer, nav, profile } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 border-t py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="bg-accent text-accent-foreground flex size-9 items-center justify-center rounded-xl font-serif text-sm">
              {profile.initials}
            </span>
            <span className="font-serif text-lg">{profile.shortName}</span>
          </div>
          <p className="text-muted-foreground mt-3 max-w-xs text-sm">
            {footer.tagline}
          </p>
        </div>

        <nav className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {nav.map((item) =>
            item.href.startsWith("#") ? (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="border-border bg-card/60 text-muted-foreground hover:border-accent/60 hover:text-foreground inline-flex size-9 items-center justify-center rounded-full border transition-colors"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Correo"
            className="border-border bg-card/60 text-muted-foreground hover:border-accent/60 hover:text-foreground inline-flex size-9 items-center justify-center rounded-full border transition-colors"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <div className="divider" />
        <div className="text-muted-foreground mt-6 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.shortName}. {footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <p>{footer.builtIn}</p>
            <a
              href="#top"
              aria-label="Volver arriba"
              className="border-border bg-card/60 hover:border-accent/60 hover:text-foreground inline-flex size-8 items-center justify-center rounded-full border transition-colors"
            >
              <ArrowUp className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
