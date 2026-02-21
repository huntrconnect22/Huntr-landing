'use client';

import { useContext, useEffect } from 'react';
import { LanguageContext } from '@/context/language-context';

type MetaContent = {
  title: string;
  description: string;
};

// This hook updates the page's title and meta description tag
// when the language context changes.
export const useDynamicSeo = (meta: MetaContent) => {
  const context = useContext(LanguageContext);
  const lang = context?.language || 'en';

  useEffect(() => {
    if (!meta || !meta.title || !meta.description) return;

    const fullTitle = `${meta.title} | Huntr`;

    document.title = fullTitle;
    
    // Update meta description
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', meta.description);

    // Update Open Graph tags
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', fullTitle);
    }
    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute('content', meta.description);
    }
    const ogLocaleTag = document.querySelector('meta[property="og:locale"]');
    if (ogLocaleTag) {
      ogLocaleTag.setAttribute('content', lang === 'id' ? 'id_ID' : 'en_US');
    }
    
    // Update Twitter tags
    const twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleTag) {
      twitterTitleTag.setAttribute('content', fullTitle);
    }
    const twitterDescriptionTag = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescriptionTag) {
      twitterDescriptionTag.setAttribute('content', meta.description);
    }


  }, [lang, meta]);
};
