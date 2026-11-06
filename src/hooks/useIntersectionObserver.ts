import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Standard IntersectionObserver hook for viewport detection
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const ref = useRef<T | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Accessibility check: immediately trigger if reduced motion is requested
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setHasEntered(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, hasEntered };
}

/**
 * Helper to return Tailwind animation classes for staggered entrance
 */
export function getStaggerClass(hasEntered: boolean, step: number = 0): string {
  const delayClasses = [
    'delay-75',
    'delay-150',
    'delay-300',
    'delay-500',
    'delay-700',
    'delay-[900ms]',
    'delay-[1100ms]',
  ];
  const delayClass = delayClasses[step] || `delay-[${step * 150}ms]`;

  return `transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
    hasEntered
      ? `opacity-100 translate-y-0 filter-none ${delayClass}`
      : 'opacity-0 translate-y-8 filter blur-[1px] pointer-events-none'
  }`;
}
