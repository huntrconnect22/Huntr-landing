'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { MOCK_RFQS, type Rfq } from '@/lib/rfq-mock-data';
import {
  Search,
  Calendar,
  Building2,
  Package,
  Clock,
  ChevronRight,
  Layers,
  Filter,
  RefreshCw,
  ExternalLink,
  FileText,
  AlertCircle,
} from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  open:             { label: 'Open',             color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',  dot: 'bg-emerald-500' },
  active:           { label: 'Open',             color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',  dot: 'bg-emerald-500' },
  pending_approval: { label: 'Menunggu Approval', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',       dot: 'bg-amber-500' },
  draft:            { label: 'Draft',             color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',       dot: 'bg-slate-400' },
  awarded:          { label: 'Awarded',           color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',          dot: 'bg-blue-500' },
  rejected:         { label: 'Ditolak',           color: 'bg-rose-500/10 text-rose-600 border-rose-500/20',          dot: 'bg-rose-500' },
  closed:           { label: 'Closed',            color: 'bg-rose-500/10 text-rose-600 border-rose-500/20',          dot: 'bg-rose-500' },
};

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return 'Baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
}

function deadline(createdAt: string, durationDays = 7): string {
  const d = new Date(new Date(createdAt).getTime() + durationDays * 86400000);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function RfqCard({ rfq }: { rfq: Rfq }) {
  const status = STATUS_CONFIG[rfq.status] ?? STATUS_CONFIG['open'];
  const itemNames = rfq.items?.slice(0, 3).map(i => i.catalogue?.name ?? 'Item').filter(Boolean) ?? [];
  const moreItems = (rfq.items?.length ?? 0) - 3;

  return (
    <Link href={`/rfq/${rfq.id}`} className="group relative flex flex-col rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
      {/* Top accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />

      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium mb-2 ${status.color}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot} ${rfq.status === 'open' ? 'animate-pulse' : ''}`} />
              {status.label}
            </span>
            <h2 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {rfq.title}
            </h2>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
        </div>

        {/* Company */}
        {rfq.company && (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Building2 className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground truncate">{rfq.company.name}</span>
          </div>
        )}

        {/* Description */}
        {rfq.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{rfq.description}</p>
        )}

        {/* Items */}
        {itemNames.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {itemNames.map((name, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground">
                <Package className="h-3 w-3 shrink-0" />
                <span className="truncate max-w-[120px]">{name}</span>
              </span>
            ))}
            {moreItems > 0 && (
              <span className="inline-flex items-center rounded-lg border border-dashed border-border px-2 py-0.5 text-xs text-muted-foreground">
                +{moreItems} item lainnya
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-5 py-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeAgo(rfq.created_at)}
          </span>
          {rfq.delivery_point && (
            <span className="hidden sm:block truncate max-w-[100px]" title={rfq.delivery_point}>
              📍 {rfq.delivery_point}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs">
          {rfq.duration_days && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Tutup {deadline(rfq.created_at, rfq.duration_days)}
            </span>
          )}
          {(rfq.proposals_count ?? 0) > 0 && (
            <span className="font-medium text-primary">
              {rfq.proposals_count} penawaran
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border/40 bg-card overflow-hidden animate-pulse">
      <div className="h-0.5 bg-muted/60 w-full" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-20 rounded-full bg-muted" />
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
        <div className="flex gap-2">
          <div className="h-5 w-24 rounded-lg bg-muted" />
          <div className="h-5 w-20 rounded-lg bg-muted" />
        </div>
      </div>
      <div className="border-t border-border/40 bg-muted/10 px-5 py-3 flex justify-between">
        <div className="h-3 w-20 rounded bg-muted" />
        <div className="h-3 w-28 rounded bg-muted" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const STATUS_FILTERS = [
  { value: '',       label: 'Semua' },
  { value: 'open',   label: 'Open' },
  { value: 'closed', label: 'Closed' },
];

export default function RfqPage() {
  const [rfqs, setRfqs]         = useState<Rfq[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [status, setStatus]     = useState('open');
  const [page, setPage]         = useState(1);
  const [total, setTotal]       = useState(0);
  const [useMock, setUseMock]   = useState(false);
  const PER_PAGE = 12;

  const fetchRfqs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        per_page: String(PER_PAGE),
        page: String(page),
        status,
      });
      if (search) params.set('search', search);

      const res = await fetch(`/api/rfqs?${params.toString()}`);
      if (!res.ok) throw new Error('API Error');

      const json = await res.json();
      const items: Rfq[] = json.data ?? [];

      setRfqs(items);
      setTotal(json.total ?? items.length);
      setUseMock(false);
    } catch {
      // Offline / Connection error fallback
      setRfqs(MOCK_RFQS);
      setTotal(MOCK_RFQS.length);
      setUseMock(true);
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => { fetchRfqs(); }, [fetchRfqs]);

  // Debounce search
  useEffect(() => { setPage(1); }, [search, status]);

  const filtered = useMock
    ? MOCK_RFQS.filter(r =>
        (!status || r.status === status) &&
        (!search || r.title.toLowerCase().includes(search.toLowerCase()))
      )
    : rfqs;

  const totalPages = Math.ceil((useMock ? filtered.length : total) / PER_PAGE);
  const displayed  = useMock ? filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE) : rfqs;

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />

      <main className="flex-1 -mt-24">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-44 pb-20 sm:pt-52 sm:pb-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-3xl" />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <AnimateOnScroll className="fade-in slide-in-from-bottom-6 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-5">
                <Layers className="h-3.5 w-3.5" />
                Papan Tender Publik · Real-time
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-foreground">
                Daftar <span className="text-primary">Request for Quotation</span>
              </h1>
              <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
                Jelajahi semua pengadaan terbuka dari perusahaan-perusahaan buyer di platform Huntr. Daftar sebagai vendor dan kirimkan penawaran terbaik Anda.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://app.huntr.id/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 hover:bg-primary/90 transition-all"
                >
                  Daftar Sebagai Vendor
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://app.huntr.id/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40 transition-all"
                >
                  Masuk & Tawar
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── Filter & Search ───────────────────────────────────────── */}
        <section className="pb-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-3 max-w-5xl mx-auto">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  id="rfq-search"
                  placeholder="Cari pengadaan..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex gap-1.5">
                  {STATUS_FILTERS.map(f => (
                    <button
                      key={f.value}
                      id={`filter-${f.value || 'all'}`}
                      onClick={() => setStatus(f.value)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        status === f.value
                          ? 'bg-primary text-white shadow-sm'
                          : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Refresh */}
              <button
                id="rfq-refresh"
                onClick={fetchRfqs}
                aria-label="Refresh"
                className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2.5 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:block">Refresh</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── Stats bar ────────────────────────────────────────────── */}
        <section className="pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {loading ? (
                  <span className="inline-block h-4 w-32 rounded bg-muted animate-pulse" />
                ) : (
                  <>Menampilkan <strong className="text-foreground">{displayed.length}</strong> dari <strong className="text-foreground">{useMock ? filtered.length : total}</strong> RFQ</>
                )}
              </p>
              {useMock && !loading && (
                <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
                  <AlertCircle className="h-3 w-3" />
                  Data contoh
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <section className="pb-16 sm:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : displayed.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/40 mb-4">
                    <FileText className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Tidak ada RFQ ditemukan</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    Coba ubah filter atau kata kunci pencarian Anda.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {displayed.map((rfq) => (
                    <RfqCard key={rfq.id} rfq={rfq} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    id="rfq-prev-page"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    ← Sebelumnya
                  </button>
                  <span className="text-sm text-muted-foreground px-2">
                    Halaman {page} / {totalPages}
                  </span>
                  <button
                    id="rfq-next-page"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Berikutnya →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-t border-border/60">
          <div className="container mx-auto px-4">
            <AnimateOnScroll className="max-w-3xl mx-auto text-center fade-in slide-in-from-bottom-6 duration-700">
              <h2 className="text-3xl font-bold font-headline text-foreground">
                Punya kebutuhan pengadaan?
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Buat RFQ dan terima penawaran dari ratusan vendor terverifikasi di platform Huntr. Proses transparan, aman, dan efisien.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://app.huntr.id/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/30 hover:bg-primary/90 transition-all"
                >
                  Buat RFQ Gratis
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/40 transition-all"
                >
                  Lihat Harga
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
