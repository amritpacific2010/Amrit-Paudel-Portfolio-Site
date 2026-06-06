import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollToTopProps {
  visible: boolean;
  onClick: () => void;
}

export function ScrollToTop({ visible, onClick }: ScrollToTopProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full',
        'bg-[var(--accent-blue)] text-white shadow-lg transition-all duration-300',
        'hover:scale-110 hover:bg-[var(--accent-blue-dark)] hover:shadow-[0_4px_12px_var(--accent-blue-glow)]',
        visible ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-5'
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}
