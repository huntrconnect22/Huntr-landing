'use client';

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { LanguageContext } from '@/context/language-context';
import { useModal } from '@/context/modal-context';
import { translations, SampleTender } from '@/lib/translations';
import { TenderDetailModal, TenderDetailData } from '@/components/modal/tender-detail-modal';

interface ApiRfqItem {
  id: string;
  title: string;
  status: string;
  description?: string;
  company?: {
    name: string;
  };
  created_at?: string;
  duration_days?: number;
}

const PAGE_SIZE = 6;

export function Tenders() {
  const langContext = useContext(LanguageContext);
  const lang = (langContext?.language || 'en') as 'en' | 'id';
  const { openModal } = useModal();
  const t = translations[lang].tenders;

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [apiItems, setApiItems] = useState<ApiRfqItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [fallbackVisible, setFallbackVisible] = useState(PAGE_SIZE);
  const [selectedTender, setSelectedTender] = useState<TenderDetailData | null>(null);

  const mergeUnique = (current: ApiRfqItem[], incoming: ApiRfqItem[]) => {
    const seen = new Set(current.map((item) => item.id));
    return [...current, ...incoming.filter((item) => !seen.has(item.id))];
  };

  const fetchRfqs = useCallback(async (pageToLoad = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const params = new URLSearchParams({
        per_page: String(PAGE_SIZE),
        page: String(pageToLoad),
        status: filter,
      });
      if (search.trim()) {
        params.set('search', search.trim());
      }
      const res = await fetch(`/api/rfqs?${params.toString()}`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      const list: ApiRfqItem[] = Array.isArray(json) ? json : json.data ?? [];
      const lastPage = Number(json.last_page ?? json.meta?.last_page ?? 0);
      const moreFromMeta = lastPage > 0 ? pageToLoad < lastPage : list.length >= PAGE_SIZE;

      if (list.length > 0) {
        if (append) {
          setApiItems((prev) => {
            const next = mergeUnique(prev, list);
            setHasMore(next.length > prev.length && moreFromMeta);
            return next;
          });
          setVisibleCount((count) => count + PAGE_SIZE);
        } else {
          setApiItems(list);
          setVisibleCount(PAGE_SIZE);
          setHasMore(list.length > PAGE_SIZE || moreFromMeta);
        }
        setIsUsingFallback(false);
        setPage(pageToLoad);
      } else if (!append) {
        setApiItems([]);
        setIsUsingFallback(true);
        setFallbackVisible(PAGE_SIZE);
        setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch {
      if (!append) {
        setApiItems([]);
        setIsUsingFallback(true);
        setFallbackVisible(PAGE_SIZE);
        setHasMore(false);
      } else {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [filter, search]);

  useEffect(() => {
    setPage(1);
    setVisibleCount(PAGE_SIZE);
    setFallbackVisible(PAGE_SIZE);
    fetchRfqs(1, false);
  }, [fetchRfqs]);

  // If using fallback, filter locally
  const fallbackFiltered = t.sampleItems.filter((item: SampleTender) => {
    const okStatus = filter === 'all' || item.status === filter;
    const okText =
      !search.trim() ||
      (item.title + ' ' + item.org + ' ' + item.desc + ' ' + item.searchTags)
        .toLowerCase()
        .includes(search.toLowerCase());
    return okStatus && okText;
  });
  const fallbackItems = fallbackFiltered.slice(0, fallbackVisible);
  const hasMoreFallback = fallbackFiltered.length > fallbackVisible;

  const displayedApiItems = apiItems.slice(0, visibleCount);
  const hasMoreApi = visibleCount < apiItems.length || hasMore;

  const handleLoadMore = () => {
    if (isUsingFallback) {
      setFallbackVisible((count) => count + PAGE_SIZE);
      return;
    }
    if (visibleCount < apiItems.length) {
      setVisibleCount((count) => Math.min(count + PAGE_SIZE, apiItems.length));
      return;
    }
    fetchRfqs(page + 1, true);
  };

  const handleOpenApiTender = (item: ApiRfqItem) => {
    setSelectedTender({
      id: item.id,
      title: item.title,
      status: item.status,
      org: item.company?.name || 'HUNTR Verified Buyer',
      desc: item.description || 'Permintaan penawaran harga pengadaan dan proposal komersial.',
      created_at: item.created_at,
      duration_days: item.duration_days,
    });
  };

  const handleOpenSampleTender = (item: SampleTender) => {
    setSelectedTender({
      id: item.id,
      title: item.title,
      status: item.status,
      org: item.org,
      desc: item.desc,
    });
  };

  return (
    <section className="section white" id="tenders">
      <div className="wrap">
        <div className="sectionhead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>

        {/* Search & Filter pills */}
        <div className="tender-tools">
          <input
            id="tenderSearch"
            type="search"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filter-pills">
            <button
              type="button"
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              {t.filterAll}
            </button>
            <button
              type="button"
              className={filter === 'open' ? 'active' : ''}
              onClick={() => setFilter('open')}
            >
              {t.filterOpen}
            </button>
            <button
              type="button"
              className={filter === 'closed' ? 'active' : ''}
              onClick={() => setFilter('closed')}
            >
              {t.filterClosed}
            </button>
          </div>
        </div>

        {/* Tenders Grid */}
        {loading ? (
          <div className="py-12 text-center text-sm font-semibold text-muted">
            {t.loading}
          </div>
        ) : !isUsingFallback && apiItems.length > 0 ? (
          <div className="tender-grid">
            {displayedApiItems.map((item) => {
              const isOpen = item.status === 'open' || item.status === 'active';
              return (
                <article
                  className="tender-card"
                  key={item.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleOpenApiTender(item)}
                >
                  <div className="tender-header">
                    <span className={`status ${isOpen ? '' : 'closed'}`}>
                      {isOpen ? t.filterOpen : t.filterClosed}
                    </span>
                  </div>
                  <h3>
                    <button
                      type="button"
                      className="text-left font-inherit p-0 bg-transparent border-0 cursor-pointer text-inherit hover:text-[var(--orange)]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenApiTender(item);
                      }}
                    >
                      {item.title}
                    </button>
                  </h3>
                  <div className="org">{item.company?.name || 'HUNTR Verified Buyer'}</div>
                  <div className="desc-wrap">
                    <p className="desc-text">
                      {item.description || 'Request for procurement quotation and commercial proposal.'}
                    </p>
                    <button
                      type="button"
                      className="read-more-link bg-transparent border-0 p-0 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenApiTender(item);
                      }}
                    >
                      {t.readMore}
                    </button>
                  </div>
                  <div className="tender-meta">
                    <span>{t.postedRecent}</span>
                    <button
                      type="button"
                      className="hover:underline font-bold text-left bg-transparent border-0 p-0 cursor-pointer text-inherit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenApiTender(item);
                      }}
                    >
                      {isOpen ? t.viewOpportunity : t.opportunityClosed}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="tender-grid">
            {fallbackItems.map((item) => {
              const isOpen = item.status === 'open';
              return (
                <article
                  className="tender-card"
                  key={item.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleOpenSampleTender(item)}
                >
                  <div className="tender-header">
                    <span className={`status ${isOpen ? '' : 'closed'}`}>
                      {isOpen ? t.filterOpen : t.filterClosed}
                    </span>
                  </div>
                  <h3>
                    <button
                      type="button"
                      className="text-left font-inherit p-0 bg-transparent border-0 cursor-pointer text-inherit hover:text-[var(--orange)]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSampleTender(item);
                      }}
                    >
                      {item.title}
                    </button>
                  </h3>
                  <div className="org">{item.org}</div>
                  <div className="desc-wrap">
                    <p className="desc-text">{item.desc}</p>
                    <button
                      type="button"
                      className="read-more-link bg-transparent border-0 p-0 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSampleTender(item);
                      }}
                    >
                      {t.readMore}
                    </button>
                  </div>
                  <div className="tender-meta">
                    <span>{t.postedRecent}</span>
                    <button
                      type="button"
                      className="hover:underline font-bold text-left bg-transparent border-0 p-0 cursor-pointer text-inherit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSampleTender(item);
                      }}
                    >
                      {isOpen ? t.viewOpportunity : t.opportunityClosed}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {((!isUsingFallback && hasMoreApi) || (isUsingFallback && hasMoreFallback)) && (
          <div className="actions" style={{ justifyContent: 'center', marginTop: '28px' }}>
            <button
              type="button"
              className="btn outline"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? t.loading : t.seeMore}
            </button>
          </div>
        )}

        <p className="approval-note">{t.approvalNote}</p>

        {/* Actions */}
        <div className="actions">
          <button
            type="button"
            className="btn primary"
            onClick={() => openModal('vendor')}
          >
            {t.joinVendor}
          </button>
          <a
            className="btn dark"
            href="mailto:support@huntr.id?subject=HUNTR%20open%20tenders"
          >
            {t.askTenders}
          </a>
        </div>
      </div>

      {/* Tender Detail Modal */}
      <TenderDetailModal
        tender={selectedTender}
        onClose={() => setSelectedTender(null)}
        lang={lang}
      />
    </section>
  );
}
