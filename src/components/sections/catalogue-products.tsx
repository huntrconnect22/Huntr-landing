'use client';

import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package, ArrowRight, Tag, Ruler, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

const APP_URL = 'https://app.huntr.id';

interface CatalogueItem {
  id: string;
  name: string;
  category: string | null;
  brand: string | null;
  uom: string | null;
  image_url: string | null;
  company?: {
    name: string;
  };
}

async function fetchCatalogues(): Promise<CatalogueItem[]> {
  // Fetch via Next.js Route Handler (proxy) to avoid CORS issues
  const res = await fetch('/api/catalogues?per_page=10&page=1');
  if (!res.ok) throw new Error('Failed to fetch catalogues');
  const json = await res.json();
  // API returns either { data: [...] } paginated or a plain array
  return Array.isArray(json) ? json.slice(0, 10) : (json.data ?? []).slice(0, 10);
}

function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden flex flex-col">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3 mt-auto" />
      </div>
    </div>
  );
}

function ProductCard({ item, t }: { item: CatalogueItem; t: ReturnType<typeof translations['en']['catalogue'] extends infer U ? () => U : never> extends never ? typeof translations['en']['catalogue'] : typeof translations['en']['catalogue'] }) {
  return (
    <div className="group rounded-2xl border bg-card overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-44 bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Package className="h-10 w-10 opacity-40" />
            <span className="text-xs">{t.noImage}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-foreground">
          {item.name}
        </h3>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {item.category && (
            <Badge variant="secondary" className="text-xs gap-1">
              <Tag className="h-3 w-3" />
              {item.category}
            </Badge>
          )}
          {item.uom && (
            <Badge variant="outline" className="text-xs gap-1">
              <Ruler className="h-3 w-3" />
              {item.uom}
            </Badge>
          )}
        </div>

        {item.brand && (
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-medium">{t.brand}:</span> {item.brand}
          </p>
        )}
      </div>
    </div>
  );
}

/** Checks whether the user has an active session on app.huntr.id */
async function checkAuth(): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/check', { cache: 'no-store' });
    const json = await res.json();
    return json.loggedIn === true;
  } catch {
    return false;
  }
}

function CreateRequestButton({ label }: { label: string }) {
  const [checking, setChecking] = useState(false);

  const handleClick = async () => {
    setChecking(true);
    try {
      const loggedIn = await checkAuth();
      const target = loggedIn
        ? `${APP_URL}/catalogue`
        : `${APP_URL}/register`;
      window.open(target, '_blank', 'noopener,noreferrer');
    } finally {
      setChecking(false);
    }
  };

  return (
    <Button
      size="lg"
      variant="secondary"
      className="font-semibold text-base"
      onClick={handleClick}
      disabled={checking}
    >
      {checking ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <ArrowRight className="ml-2 h-5 w-5" />
      )}
      {label}
    </Button>
  );
}

export function CatalogueProducts() {
  const context = useContext(LanguageContext);
  const lang = context?.language ?? 'en';
  const t = translations[lang].catalogue;

  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCatalogues()
      .then(setItems)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ── Products Section ── */}
      <section id="catalogue" className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-12 fade-in zoom-in-95 duration-500">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold">{t.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
          </AnimateOnScroll>

          {/* Error state */}
          {error && (
            <p className="text-center text-muted-foreground">{t.loadingError}</p>
          )}

          {/* Grid */}
          {!error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {loading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))
                : items.map((item, index) => (
                    <AnimateOnScroll
                      key={item.id}
                      className="fade-in slide-in-from-bottom-6 duration-500 h-full"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard item={item} t={t} />
                    </AnimateOnScroll>
                  ))}
            </div>
          )}

          {/* View all link */}
          {!loading && !error && items.length > 0 && (
            <AnimateOnScroll className="mt-10 text-center fade-in duration-500">
              <Button variant="outline" size="lg" asChild>
                <Link href={`${APP_URL}/marketplace`} target="_blank">
                  {t.viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* ── CTA: Buat Permintaan Sekarang ── */}
      <section id="create-request" className="py-16 sm:py-24 bg-primary text-primary-foreground">
        <AnimateOnScroll className="container mx-auto px-4 text-center fade-in zoom-in-95 duration-500">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">
            {t.ctaTitle}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">
            {t.ctaSubtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CreateRequestButton label={t.ctaButton} />
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold text-base"
              asChild
            >
              <Link href="/contact">
                {lang === 'id' ? 'Minta Demo' : 'Request a Demo'}
              </Link>
            </Button>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
