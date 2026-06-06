import { useState, useEffect, useRef } from 'react';

interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down';
  isScrolled: boolean;
  isPastHero: boolean;
  showScrollTop: boolean;
}

export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: 'up',
    isScrolled: false,
    isPastHero: false,
    showScrollTop: false,
  });

  const lastScrollY = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const direction = y > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = y;

      setState({
        scrollY: y,
        scrollDirection: direction,
        isScrolled: y > 50,
        isPastHero: y > 100,
        showScrollTop: y > 300,
      });
    };

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return state;
}
