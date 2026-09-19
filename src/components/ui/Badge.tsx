import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    primary: 'bg-bg text-ink border-line',
    secondary: 'bg-ink/5 text-ink border-ink/10',
    muted: 'bg-bg text-faint border-line',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
