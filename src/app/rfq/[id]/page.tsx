'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AnimateOnScroll } from '@/components/animate-on-scroll';
import { MOCK_RFQS, type Rfq } from '@/lib/rfq-mock-data';
import {
  ArrowLeft,
  Calendar,
  Building2,
  Package,
  Clock,
  MapPin,
  FileText,
  ExternalLink,
  ShieldCheck,
  Tag,
  AlertCircle,
} from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  open: { label: 'Open / Menerima Penawaran', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', dot: 'bg-emerald-500' },
  pending_approval: { label: 'Menunggu Approval', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20', dot: 'bg-amber-500' },
  draft: { label: 'Draft', color: 'bg-slate-500/10 text-slate-600 border-slate-500/20', dot: 'bg-slate-400' },
  awarded: { label: 'Awarded', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', dot: 'bg-blue-500' },
  closed: { label: 'Closed / Ditutup', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20', dot: 'bg-rose-500' },
};

function deadlineDate(createdAt: string, durationDays = 7): string {
  const d = new Date(new Date(createdAt).getTime() + durationDays * 86400000);
  return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function RfqDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const rfqId = resolvedParams.id;

  const [rfq, setRfq] = useState<Rfq | null>(null);
  const [loading, setLoading] = useState(true);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    async function getRfqDetail() {
      setLoading(true);
      try {
        const res = await fetch(`/api/rfqs/${rfqId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.rfq) {
            setRfq(json.rfq);
            setUseMock(false);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching detail:', err);
      }

      // Offline / Connection error fallback
      const mockItem = MOCK_RFQS.find((item) => item.id === rfqId);
      if (mockItem) {
        setRfq(mockItem);
        setUseMock(true);
      } else {
        setRfq(null);
      }
      setLoading(false);
    }

    getRfqDetail();
  }, [rfqId]);

  if (loading) {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <Header />
        <main className="flex-1 -mt-24 pt-44 pb-20">
          <div className="container mx-auto px-4 max-w-4xl space-y-6 animate-pulse">
            <div className="h-6 w-32 bg-muted rounded" />
            <div className="h-10 w-3/4 bg-muted rounded" />
            <div className="h-32 bg-muted rounded-2xl" />
            <div className="h-64 bg-muted rounded-2xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!rfq) {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <Header />
        <main className="flex-1 -mt-24 pt-44 pb-20">
          <div className="container mx-auto px-4 max-w-xl text-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/40 mx-auto mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">RFQ Tidak Ditemukan</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Permintaan pengadaan dengan ID tersebut tidak tersedia atau sudah dihapus.
            </p>
            <Link
              href="/rfq"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Daftar RFQ
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const status = STATUS_CONFIG[rfq.status] ?? STATUS_CONFIG['open'];

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />

      <main className="flex-1 -mt-24">
        {/* Top bar & Header section */}
        <section className="pt-40 pb-8 bg-muted/30 border-b border-border/60">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link
              href="/rfq"
              className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke Papan Tender RFQ
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.color}`}>
                <span className={`h-2 w-2 rounded-full ${status.dot} ${rfq.status === 'open' ? 'animate-pulse' : ''}`} />
                {status.label}
              </span>
              {useMock && (
                <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
                  <AlertCircle className="h-3 w-3" />
                  Pratinjau Contoh
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-headline text-foreground leading-tight">
              {rfq.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground">
              {rfq.company && (
                <div className="flex items-center gap-1.5 font-medium text-foreground">
                  <Building2 className="h-4 w-4 text-primary" />
                  {rfq.company.name}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Dibuat: {formatDate(rfq.created_at)}
              </div>
              {rfq.delivery_point && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Lokasi: {rfq.delivery_point}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3">
              
              {/* Main Information (Left 2 cols) */}
              <div className="md:col-span-2 space-y-8">
                
                {/* Description */}
                <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                  <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Deskripsi Kebutuhan Pengadaan
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {rfq.description || 'Tidak ada deskripsi tambahan.'}
                  </p>
                </div>

                {/* Attached Document (Only if uploaded) */}
                {rfq.document_path && (
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 shadow-sm flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">Dokumen Pendukung / Lampiran</h3>
                        <p className="text-xs text-muted-foreground">Dokumen teknis / spesifikasi tambahan yang diunggah buyer</p>
                      </div>
                    </div>
                    <a
                      href={rfq.document_path.startsWith('http') ? rfq.document_path : `https://api.huntr.id/storage/${rfq.document_path.replace(/^\//, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-600 transition-all shrink-0"
                    >
                      Lihat Dokumen
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}

                {/* Items Required */}
                <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      Daftar Item / Komoditas ({rfq.items?.length ?? 0})
                    </h2>
                  </div>

                  <div className="divide-y divide-border/60">
                    {rfq.items && rfq.items.length > 0 ? (
                      rfq.items.map((item, idx) => (
                        <div key={item.id || idx} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-sm text-foreground">
                                {item.catalogue?.name || `Item Pengadaan #${idx + 1}`}
                              </h3>
                              {item.catalogue?.category && (
                                <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                  <Tag className="h-3 w-3" />
                                  {item.catalogue.category}
                                </span>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold text-primary">
                                {item.quantity} {item.unit || 'unit'}
                              </span>
                            </div>
                          </div>

                          {item.note && (
                            <p className="mt-2 text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-border/40">
                              <strong className="text-foreground">Catatan spesifikasi:</strong> {item.note}
                            </p>
                          )}

                          {item.catalogue?.specifications && (
                            <p className="mt-2 text-xs text-muted-foreground">
                              <strong>Spesifikasi teknis:</strong> {item.catalogue.specifications}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Tidak ada rincian item.</p>
                    )}
                  </div>
                </div>

              </div>

              {/* Sidebar Action & Status (Right 1 col) */}
              <div className="space-y-6">
                
                {/* Submit Proposal Card */}
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-card p-6 shadow-sm">
                  <h3 className="text-base font-bold text-foreground mb-2">Ingin Mengirim Penawaran?</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    Login ke akun Vendor Anda di portal Huntr untuk mengisi rincian penawaran harga & mengunggah dokumen proposal.
                  </p>

                  <a
                    href={`https://app.huntr.id/login?redirect=/rfq/${rfq.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all mb-3"
                  >
                    Kirim Proposal Sekarang
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  <a
                    href="https://app.huntr.id/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground hover:border-primary/40 transition-all"
                  >
                    Daftar Sebagai Vendor Gratis
                  </a>
                </div>

                {/* Timeline & Summary info */}
                <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4 text-xs">
                  <h4 className="font-semibold text-foreground border-b border-border/60 pb-2">Informasi Tambahan</h4>
                  
                  {rfq.duration_days && (
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        Batas Akhir Penawaran
                      </span>
                      <span className="font-medium text-foreground text-right">
                        {deadlineDate(rfq.created_at, rfq.duration_days)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      Status Verifikasi Buyer
                    </span>
                    <span className="font-medium text-emerald-600">Verifikasi Resmi</span>
                  </div>

                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-primary" />
                      Total Penawaran Masuk
                    </span>
                    <span className="font-bold text-foreground">{rfq.proposals_count ?? 0} proposal</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
