interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent-blue)]">
      [{label}]
    </span>
  );
}
