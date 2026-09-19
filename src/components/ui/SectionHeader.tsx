import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  badgeVariant?: 'blue' | 'indigo' | 'slate' | 'amber';
}

export function SectionHeader({ eyebrow, title, lead, align = 'center', badgeVariant = 'blue' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mb-12 md:mb-16', align === 'center' && 'text-center')}
    >
      {eyebrow && (
        <div className="mb-4">
          <Badge variant={badgeVariant}>{eyebrow}</Badge>
        </div>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
        {title}
      </h2>
      {lead && (
        <p className={cn(
          'mt-5 text-lg text-slate-400 leading-relaxed',
          align === 'center' && 'max-w-2xl mx-auto'
        )}>
          {lead}
        </p>
      )}
    </motion.div>
  );
}
