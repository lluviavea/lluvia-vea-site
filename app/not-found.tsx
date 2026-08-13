import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-24">
      <div aria-hidden className="mesh absolute inset-0 -z-10" />
      <div className="text-center">
        <span className="bg-accent-soft text-accent inline-flex size-14 items-center justify-center rounded-2xl">
          <SearchX className="size-6" />
        </span>
        <p className="text-accent mt-6 font-mono text-sm tracking-[0.2em] uppercase">
          Error 404
        </p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-6xl">
          Esta página no existe.
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md">
          El enlace puede estar roto o la página fue movida. Volvamos a lo
          importante: tu piel y tu marca.
        </p>
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
          <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
