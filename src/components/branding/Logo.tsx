import { Heart } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 'h-5 w-5', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'h-6 w-6', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'h-8 w-8', text: 'text-2xl', sub: 'text-xs' },
  };

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-2 shadow-soft-sm">
        <Heart className={cn('text-white fill-white', sizes[size].icon)} />
      </div>
      <div className="flex flex-col">
        <span className={cn('font-serif font-bold text-slate-900 leading-tight tracking-tight', sizes[size].text)}>
          Hands of Mercy
        </span>
        <span className={cn('font-semibold text-blue-500 leading-tight uppercase tracking-widest', sizes[size].sub)}>
          Nepal
        </span>
      </div>
    </div>
  );
}
