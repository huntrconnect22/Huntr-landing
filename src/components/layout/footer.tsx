'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function Footer() {
  const langContext = useContext(LanguageContext);
  const lang = langContext?.language || 'en';
  const t = translations[lang];

  return (
    <footer>
      <div className="wrap">
        <div className="footrow">
          <Link href="#home" className="brand" aria-label="HUNTR home">
            <Image
              src="/assets/img/logo-dark.png"
              alt="HUNTR logo"
              width={140}
              height={26}
              className="w-[130px] sm:w-[150px] h-auto object-contain"
            />
          </Link>
          <div className="footlinks">
            <a href="#how">{t.nav.how}</a>
            <a href="#tenders">{t.nav.tenders}</a>
            <a href="#marketplace">{t.nav.marketplace}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="mailto:support@huntr.id">support@huntr.id</a>
            <a
              href="https://www.linkedin.com/company/huntr-id/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
        <small id="watermark">{t.footer.watermark}</small>
      </div>
    </footer>
  );
}
