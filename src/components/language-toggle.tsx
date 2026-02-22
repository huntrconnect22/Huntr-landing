'use client';

import React, { useContext } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageContext } from '@/context/language-context';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageToggle({ className }: { className?: string }) {
  const context = useContext(LanguageContext);

  if (!context) {
    // This can happen on initial render, so we can return null or a placeholder.
    return null;
  }

  const { setLanguage } = context;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("text-foreground hover:bg-black/5 hover:text-foreground", className)}>
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('id')}>
          Indonesia
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
