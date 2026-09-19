import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'indigo' | 'slate' | 'amber' | 'placeholder';
  className?: string;
}

export function Badge({ children, variant = 'blue', className }: BadgeProps) {
  const variants = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    placeholder: 'bg-amber-50 text-amber-700 border-amber-200',
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
