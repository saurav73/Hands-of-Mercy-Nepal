import { ScrollReveal } from './ScrollReveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-14">
      {eyebrow && (
        <ScrollReveal>
          <p className="text-xs tracking-widest uppercase text-faint mb-4">{eyebrow}</p>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">{title}</h2>
      </ScrollReveal>
      {description && (
        <ScrollReveal delay={0.2}>
          <p className="mt-4 text-muted text-lg leading-relaxed max-w-2xl mx-auto">{description}</p>
        </ScrollReveal>
      )}
    </div>
  );
}
