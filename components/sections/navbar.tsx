"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { nav, profile } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-border/60 bg-background/80 border-b backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="bg-accent text-accent-foreground flex size-9 items-center justify-center rounded-xl font-serif text-sm">
            {profile.initials}
          </span>
          <span className="font-serif text-lg tracking-tight">
            {profile.shortName}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) =>
            item.href.startsWith("#") ? (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground rounded-full px-3.5 py-2 text-sm transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground rounded-full px-3.5 py-2 text-sm transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contacto"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden md:inline-flex",
            )}
          >
            Conectemos
          </a>
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="border-border bg-card/60 text-foreground inline-flex size-9 items-center justify-center rounded-full border md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-border/60 bg-background/95 border-t backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {nav.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground block rounded-xl px-4 py-3 text-base transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground block rounded-xl px-4 py-3 text-base transition-colors"
                >
                  {item.label}
                </Link>
              ),
            )}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants(), "mt-2 w-full")}
            >
              Conectemos
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
