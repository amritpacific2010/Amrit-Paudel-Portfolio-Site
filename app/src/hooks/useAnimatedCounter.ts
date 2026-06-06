import { useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap-setup';
import { prefersReducedMotion } from '@/lib/gsap-setup';

export function useAnimatedCounter(
  target: number,
  inView: boolean,
  suffix: string = '',
  duration: number = 2
): string {
  const [value, setValue] = useState('0' + suffix);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion()) {
      setValue(target + suffix);
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setValue(Math.round(obj.val) + suffix);
      },
    });
  }, [inView, target, suffix, duration]);

  return value;
}
