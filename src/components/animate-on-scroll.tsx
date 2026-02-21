'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function AnimateOnScroll({ children, className, ...props }: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Don't trigger if it's already visible
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={cn(
        // The element is initially invisible and will transition to visible
        // The animation classes are passed via the 'className' prop
        isVisible ? 'animate-in' : 'opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
