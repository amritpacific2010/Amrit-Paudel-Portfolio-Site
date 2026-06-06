import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Batch reveal utility for ScrollTrigger
export const batchReveal = (
  selector: string | Element[],
  options?: {
    y?: number;
    x?: number;
    stagger?: number;
    duration?: number;
    threshold?: number;
    scale?: number;
  }
) => {
  if (prefersReducedMotion()) return;

  const {
    y = 30,
    x = 0,
    stagger = 0.1,
    duration = 0.5,
    threshold = 0.15,
    scale,
  } = options || {};

  const elements = typeof selector === 'string'
    ? gsap.utils.toArray(selector)
    : selector;

  const fromVars: gsap.TweenVars = {
    y,
    x,
    opacity: 0,
    duration,
    stagger,
    ease: 'power3.out',
  };

  if (scale !== undefined) {
    fromVars.scale = scale;
  }

  gsap.from(elements, {
    ...fromVars,
    scrollTrigger: {
      trigger: elements[0] as Element,
      start: `top ${(1 - threshold) * 100}%`,
      toggleActions: 'play none none none',
    },
  });
};

export { gsap, ScrollTrigger };
