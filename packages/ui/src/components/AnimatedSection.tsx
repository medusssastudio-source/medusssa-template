'use client';

import { useEffect, useRef } from 'react';
import type { ElementType, ReactNode } from 'react';
import { cn } from '../lib/cn';

type Direction = 'up' | 'down' | 'left' | 'right';

export interface AnimatedSectionProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
}

const dirOffset: Record<Direction, string> = {
  up: 'translateY(40px)',
  down: 'translateY(-40px)',
  left: 'translateX(40px)',
  right: 'translateX(-40px)',
};

export function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Elements already visible on load don't need animation (no flash)
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight - 40 && rect.bottom > 40;
    if (alreadyVisible) return;

    el.style.opacity = '0';
    el.style.transform = dirOffset[direction];
    el.style.transition = [
      `opacity ${duration}s ease-out ${delay}s`,
      `transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    ].join(', ');
    el.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.willChange = 'auto';
          observer.disconnect();
        }
      },
      { rootMargin: '-60px 0px -60px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay, duration]);

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
