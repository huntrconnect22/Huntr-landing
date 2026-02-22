'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingEffectProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TypingEffect({ text, className, speed = 100 }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText(''); 
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <p className={cn("mt-4 min-h-[3rem] text-lg sm:text-xl text-white/80 max-w-2xl mx-auto", className)}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  );
}
