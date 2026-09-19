import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from './Container';
import { ScrollReveal } from './ScrollReveal';

interface CtaSectionProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CtaSection({ title, description, ctaLabel, ctaHref, secondaryLabel, secondaryHref }: CtaSectionProps) {
  return (
    <section className="py-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">{title}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-muted text-lg leading-relaxed">{description}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to={ctaHref}>
                <button className="group inline-flex items-center gap-2 px-8 py-4 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                  {ctaLabel} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link to={secondaryHref}>
                  <button className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full border border-line hover:bg-bg transition-all">
                    {secondaryLabel}
                  </button>
                </Link>
              )}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
