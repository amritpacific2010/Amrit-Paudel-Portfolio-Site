import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Theme } from '@/types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200',
        'border-[var(--border-color)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]'
      )}
      style={{ color: 'var(--text-primary)' }}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
