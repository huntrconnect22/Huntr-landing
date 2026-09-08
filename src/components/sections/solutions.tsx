'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { ArrowRight, Bot, Check, Route, ShoppingBag, UsersRound } from 'lucide-react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { AnimateOnScroll } from '../animate-on-scroll';

const solutionImages = {
  eprocurement: PlaceHolderImages.find((p) => p.id === 'solution-eprocurement'),
  esupplychain: PlaceHolderImages.find((p) => p.id === 'solution-esupplychain'),
  crowdbuy: PlaceHolderImages.find((p) => p.id === 'solution-crowdbuy'),
  agentic: PlaceHolderImages.find((p) => p.id === 'solution-agentic'),
} as const;

const solutionMeta = {
  eprocurement: {
    icon: ShoppingBag,
    accent: 'from-primary/15 to-primary/5',
    ring: 'ring-primary/20',
    iconBg: 'bg-primary/10 text-primary',
    dot: 'bg-primary',
  },
  esupplychain: {
    icon: Route,
    accent: 'from-sky-500/15 to-sky-500/5',
    ring: 'ring-sky-500/20',
    iconBg: 'bg-sky-500/10 text-sky-600',
    dot: 'bg-sky-500',
  },
  crowdbuy: {
    icon: UsersRound,
    accent: 'from-amber-400/20 to-amber-400/5',
    ring: 'ring-amber-400/25',
    iconBg: 'bg-amber-400/15 text-amber-600',
    dot: 'bg-amber-500',
  },
  agentic: {
    icon: Bot,
    accent: 'from-purple-500/20 to-indigo-500/5',
    ring: 'ring-purple-500/25',
    iconBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
    dot: 'bg-purple-500',
  },
} as const;

type SolutionId = keyof typeof solutionMeta;

export function Solutions() {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';
  const t = translations[lang].solutions;

  const [activeId, setActiveId] = useState<SolutionId>('eprocurement');
  const activeIndex = t.items.findIndex((item) => item.id === activeId);
  const active = t.items[activeIndex];
  const meta = solutionMeta[activeId];
  const image = solutionImages[activeId];
  const ActiveIcon = meta.icon;

  return (
    <section
      id="solutions"
      className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-background via-muted/30 to-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.08),transparent_45%),radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.12),transparent_40%)]"
      />

      <div className="relative container mx-auto px-4">
        <AnimateOnScroll className="mx-auto mb-12 max-w-3xl text-center fade-in zoom-in-95 duration-500">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {t.eyebrow}
          </p>
          <h2 className="font-headline text-3xl font-bold sm:text-4xl">{t.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
        </AnimateOnScroll>

        <AnimateOnScroll className="fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            {t.items.map((solution, index) => {
              const id = solution.id as SolutionId;
              const itemMeta = solutionMeta[id];
              const Icon = itemMeta.icon;
              const isActive = activeId === id;

              return (
                <div key={solution.id} className="flex items-center gap-3 sm:contents">
                  <button
                    type="button"
                    onClick={() => setActiveId(id)}
                    className={cn(
                      'group flex flex-1 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 sm:max-w-[220px]',
                      isActive
                        ? 'border-primary/30 bg-card shadow-md shadow-primary/10'
                        : 'border-border/60 bg-card/60 hover:border-primary/20 hover:bg-card'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                        isActive ? itemMeta.iconBg : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        0{index + 1}
                      </span>
                      <span className="block truncate text-sm font-semibold">{solution.title}</span>
                    </span>
                  </button>

                  {index < t.items.length - 1 && (
                    <ArrowRight
                      className="hidden h-4 w-4 shrink-0 text-muted-foreground/40 sm:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div
            className={cn(
              'overflow-hidden rounded-3xl border bg-card/80 shadow-lg backdrop-blur-sm transition-all duration-500',
              meta.ring,
              'ring-1'
            )}
          >
            <div
              className={cn(
                'grid grid-cols-1 lg:grid-cols-2',
                `bg-gradient-to-br ${meta.accent}`
              )}
            >
              <div className="relative min-h-[240px] p-6 sm:p-8 lg:min-h-[360px]">
                <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/40 bg-background/50 shadow-inner">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
                    <span className={cn('h-2 w-2 rounded-full', meta.dot)} />
                    {active.title}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div
                  key={activeId}
                  className="animate-in fade-in slide-in-from-right-4 duration-500"
                >
                  <div className={cn('mb-4 inline-flex rounded-xl p-3', meta.iconBg)}>
                    <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                    {active.highlight}
                  </p>
                  <h3 className="mt-2 font-headline text-2xl font-bold sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {active.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground/80"
                      >
                        <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {t.items.map((solution) => {
              const id = solution.id as SolutionId;
              return (
                <button
                  key={solution.id}
                  type="button"
                  onClick={() => setActiveId(id)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    activeId === id
                      ? cn('w-8', solutionMeta[id].dot)
                      : 'w-1.5 bg-muted-foreground/25 hover:bg-muted-foreground/40'
                  )}
                  aria-label={solution.title}
                />
              );
            })}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
