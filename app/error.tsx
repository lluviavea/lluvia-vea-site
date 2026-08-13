"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="grid min-h-svh place-items-center px-4 py-24">
      <div className="text-center">
        <span className="bg-accent-soft text-accent inline-flex size-14 items-center justify-center rounded-2xl">
          <AlertTriangle className="size-6" />
        </span>
        <h1 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
          Algo salió mal.
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md">
          Ocurrió un error inesperado. Inténtalo de nuevo o vuelve al inicio.
          {error.digest ? ` (${error.digest})` : ""}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            <RotateCcw className="transition-transform group-hover:-rotate-90" />
            Reintentar
          </button>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
