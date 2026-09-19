import { motion } from 'framer-motion';
import { Container } from './Container';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="pt-28 pb-16 md:pt-40 md:pb-24">
      <Container>
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs tracking-widest uppercase text-faint mb-6">{eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">{title}</motion.h1>
          {description && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 text-lg text-muted leading-relaxed max-w-2xl">{description}</motion.p>
          )}
          {children && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8">{children}</motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
