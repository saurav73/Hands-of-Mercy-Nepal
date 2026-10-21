/**
 * Class-name helper module: conditional class composition (clsx) with
 * conflicting Tailwind classes merged (tailwind-merge), so later classes
 * win. Used by nearly every component.
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names conditionally and merges conflicting Tailwind classes.
 *
 * Accepts the same inputs as `clsx` (strings, arrays, objects, conditionals)
 * and resolves Tailwind conflicts with `tailwind-merge`, so later classes win
 * (e.g. `cn('px-2', 'px-4')` yields `'px-4'`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
