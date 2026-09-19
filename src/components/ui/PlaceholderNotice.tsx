import { Info } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { cn } from '@/utils/cn';

interface PlaceholderNoticeProps {
  className?: string;
}

export function PlaceholderNotice({ className }: PlaceholderNoticeProps) {
  const { t } = useLang();
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs text-amber-600 font-medium',
        className
      )}
    >
      <Info className="h-3.5 w-3.5" />
      <span>{t.placeholder}</span>
    </div>
  );
}
