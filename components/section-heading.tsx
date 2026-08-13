type SectionHeadingProps = {
  index: string;
  label: string;
};

export function SectionHeading({ index, label }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-accent font-mono text-sm">{index}</span>
      <span className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
        {label}
      </span>
      <span className="bg-border/60 h-px flex-1" />
    </div>
  );
}
