'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/modal-context';
import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TalkModal() {
  const { isOpen, kind, productContext, closeModal } = useModal();
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const t = translations[lang].modal;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'buyer' | 'vendor' | 'learn'>('buyer');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (kind === 'buyer') {
      setInterest('buyer');
    } else if (kind === 'vendor') {
      setInterest('vendor');
    } else {
      setInterest('learn');
    }

    if (productContext) {
      const isPackage =
        productContext.toLowerCase().includes('paket') ||
        productContext.toLowerCase().includes('enterprise');
      setMessage(
        lang === 'id'
          ? isPackage
            ? `Saya tertarik berlangganan ${productContext}`
            : `Saya tertarik dengan produk: ${productContext}`
          : isPackage
            ? `I am interested in subscribing to ${productContext}`
            : `I am interested in product: ${productContext}`
      );
    } else {
      setMessage('');
    }

    setSubmitted(false);
  }, [kind, productContext, lang, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const modalTitle =
    kind === 'buyer'
      ? t.titleBuyer
      : kind === 'vendor'
      ? t.titleVendor
      : t.titleTalk;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="modalbox" onClick={(e) => e.stopPropagation()}>
        <button className="close" aria-label="Close" onClick={closeModal} type="button">
          ×
        </button>
        <h2 id="modalTitle">{modalTitle}</h2>
        <p>{t.lead}</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="modal-name">{t.nameLabel}</label>
            <input
              id="modal-name"
              required
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="modal-email">{t.emailLabel}</label>
            <input
              id="modal-email"
              type="email"
              required
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="modal-interest">{t.interestLabel}</label>
            <Select
              value={interest}
              onValueChange={(val) => setInterest(val as 'buyer' | 'vendor' | 'learn')}
            >
              <SelectTrigger
                id="modal-interest"
                className="w-full h-auto py-3 px-3.5 bg-white border border-[var(--line)] rounded-lg text-sm font-normal text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--orange)] focus:border-[var(--orange)] shadow-none flex justify-between items-center"
              >
                <SelectValue placeholder={t.interestLabel} />
              </SelectTrigger>
              <SelectContent
                className="z-[9999] bg-white border border-[var(--line)] shadow-xl rounded-lg text-[var(--ink)]"
                position="popper"
                sideOffset={4}
              >
                <SelectItem
                  value="buyer"
                  hideIndicator
                  className="text-sm py-2.5 px-3 cursor-pointer text-[var(--ink)] focus:bg-[#fff0e4] focus:text-[#b94408] data-[state=checked]:font-semibold rounded-md transition-colors"
                >
                  {t.interestBuyer}
                </SelectItem>
                <SelectItem
                  value="vendor"
                  hideIndicator
                  className="text-sm py-2.5 px-3 cursor-pointer text-[var(--ink)] focus:bg-[#fff0e4] focus:text-[#b94408] data-[state=checked]:font-semibold rounded-md transition-colors"
                >
                  {t.interestVendor}
                </SelectItem>
                <SelectItem
                  value="learn"
                  hideIndicator
                  className="text-sm py-2.5 px-3 cursor-pointer text-[var(--ink)] focus:bg-[#fff0e4] focus:text-[#b94408] data-[state=checked]:font-semibold rounded-md transition-colors"
                >
                  {t.interestLearn}
                </SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="interest" value={interest} />
          </div>

          <div className="field">
            <label htmlFor="modal-message">{t.messageLabel}</label>
            <textarea
              id="modal-message"
              placeholder={t.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button className="btn primary w-full" type="submit">
            {t.submit}
          </button>

          {submitted ? (
            <p className="mt-3 text-xs font-semibold text-emerald-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              {t.formMessage}
            </p>
          ) : (
            <p className="formnote">{t.formNote}</p>
          )}
        </form>
      </div>
    </div>
  );
}
