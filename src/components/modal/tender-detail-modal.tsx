'use client';

import React, { useEffect, useState } from 'react';
import { useModal } from '@/context/modal-context';

export interface TenderDetailData {
  id: string;
  title: string;
  status: string;
  org: string;
  desc: string;
  category?: string;
  duration_days?: number;
  created_at?: string;
  items?: Array<{
    name: string;
    qty?: string | number;
    spec?: string;
  }>;
}

interface TenderDetailModalProps {
  tender: TenderDetailData | null;
  onClose: () => void;
  lang: 'en' | 'id';
}

export function TenderDetailModal({ tender, onClose, lang }: TenderDetailModalProps) {
  const { openModal } = useModal();
  const [extraDetails, setExtraDetails] = useState<{
    items?: Array<{ name: string; qty?: string | number; spec?: string }>;
    duration_days?: number;
    created_at?: string;
  } | null>(null);
  const [loadingExtra, setLoadingExtra] = useState(false);

  // If tender has an API id (not 'sample-'), fetch extra details from /api/rfqs/[id]
  useEffect(() => {
    if (!tender) {
      setExtraDetails(null);
      return;
    }

    if (!tender.id.startsWith('sample-')) {
      setLoadingExtra(true);
      fetch(`/api/rfqs/${tender.id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.rfq) {
            const rfq = data.rfq;
            const mappedItems = Array.isArray(rfq.rfq_items)
              ? rfq.rfq_items.map((it: any) => ({
                  name: it.item_name || it.catalogue?.name || 'Item Pengadaan',
                  qty: it.quantity ? `${it.quantity} ${it.unit || 'unit'}` : undefined,
                  spec: it.specifications || it.note || undefined,
                }))
              : [];
            setExtraDetails({
              items: mappedItems,
              duration_days: rfq.duration_days,
              created_at: rfq.created_at,
            });
          }
        })
        .catch(() => {})
        .finally(() => setLoadingExtra(false));
    } else {
      setExtraDetails(null);
    }
  }, [tender]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && tender) {
        onClose();
      }
    };
    if (tender) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tender, onClose]);

  if (!tender) return null;

  const isOpen = tender.status === 'open' || tender.status === 'active';

  const t =
    lang === 'id'
      ? {
          statusLabel: 'Status Pengadaan',
          statusOpen: 'Terbuka (Menerima Penawaran)',
          statusClosed: 'Telah Ditutup',
          buyerLabel: 'Instansi / Pembeli',
          buyerBadge: 'Pembeli Terverifikasi HUNTR',
          postedLabel: 'Tanggal Publikasi',
          postedRecent: 'Baru saja dipublikasikan',
          descTitle: 'Deskripsi & Lingkup Pengadaan',
          itemsTitle: 'Rincian Kebutuhan & Spesifikasi Item',
          noItems: 'Spesifikasi detail akan diberikan kepada vendor terverifikasi.',
          ctaBid: 'Ajukan Penawaran via HUNTR',
          ctaVendor: 'Daftar Sebagai Vendor',
          close: 'Tutup',
          loading: 'Memuat rincian tender...',
        }
      : {
          statusLabel: 'Procurement Status',
          statusOpen: 'Open (Accepting Quotations)',
          statusClosed: 'Closed',
          buyerLabel: 'Procuring Entity / Buyer',
          buyerBadge: 'HUNTR Verified Enterprise Buyer',
          postedLabel: 'Publication Date',
          postedRecent: 'Posted recently',
          descTitle: 'Description & Scope of Work',
          itemsTitle: 'Required Items & Specifications',
          noItems: 'Full technical specifications provided to verified vendors.',
          ctaBid: 'Submit Quotation via HUNTR',
          ctaVendor: 'Register as a Vendor',
          close: 'Close',
          loading: 'Loading tender details...',
        };

  const displayItems =
    extraDetails?.items && extraDetails.items.length > 0
      ? extraDetails.items
      : tender.items && tender.items.length > 0
      ? tender.items
      : null;

  const handleBidClick = () => {
    onClose();
    openModal('vendor', `Tender: ${tender.title} (${tender.org})`);
  };

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tenderDetailTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="tender-modalbox" onClick={(e) => e.stopPropagation()}>
        <button
          className="close"
          aria-label="Close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <div className="tender-modal-header">
          <span className={`status ${isOpen ? '' : 'closed'}`}>
            {isOpen ? t.statusOpen : t.statusClosed}
          </span>
        </div>

        <h2 id="tenderDetailTitle" className="tender-modal-title">
          {tender.title}
        </h2>

        {/* Metadata info cards */}
        <div className="tender-modal-meta-grid">
          <div className="tender-modal-meta-item">
            <small>{t.buyerLabel}</small>
            <strong>{tender.org}</strong>
            <span style={{ fontSize: '11px', color: '#168451', fontWeight: 700 }}>
              ✓ {t.buyerBadge}
            </span>
          </div>
          <div className="tender-modal-meta-item">
            <small>{t.postedLabel}</small>
            <strong>
              {extraDetails?.created_at
                ? new Date(extraDetails.created_at).toLocaleDateString(
                    lang === 'id' ? 'id-ID' : 'en-US',
                    { day: 'numeric', month: 'long', year: 'numeric' }
                  )
                : t.postedRecent}
            </strong>
          </div>
        </div>

        {/* Full description */}
        <div className="tender-modal-section">
          <h4>{t.descTitle}</h4>
          <p>{tender.desc}</p>
        </div>

        {/* Required items (if any) */}
        <div className="tender-modal-section">
          <h4>{t.itemsTitle}</h4>
          {loadingExtra ? (
            <p style={{ color: 'var(--muted)', fontSize: '13px' }}>{t.loading}</p>
          ) : displayItems && displayItems.length > 0 ? (
            <div className="tender-modal-items">
              {displayItems.map((it, idx) => (
                <div key={idx} className="tender-modal-item-row">
                  <div>
                    <strong style={{ color: 'var(--ink)' }}>{it.name}</strong>
                    {it.spec && (
                      <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                        {it.spec}
                      </div>
                    )}
                  </div>
                  {it.qty && (
                    <span
                      style={{
                        fontWeight: 800,
                        color: 'var(--orange)',
                        fontSize: '12px',
                        background: '#fff0e4',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {it.qty}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: '13px' }}>{t.noItems}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="tender-modal-actions">
          {isOpen ? (
            <button
              type="button"
              className="btn primary"
              onClick={handleBidClick}
            >
              {t.ctaBid}
            </button>
          ) : (
            <button
              type="button"
              className="btn dark"
              onClick={handleBidClick}
            >
              {t.ctaVendor}
            </button>
          )}
          <button
            type="button"
            className="btn outline"
            onClick={onClose}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}

