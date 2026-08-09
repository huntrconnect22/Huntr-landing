import { MetadataRoute } from 'next';

const baseUrl = 'https://huntr.id';

// Use a stable build date so sitemap is deterministic and cache-friendly.
// Update this date whenever you do a meaningful content release.
const LAST_MODIFIED = new Date('2026-08-07');

interface RouteConfig {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
  lastModified?: Date;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    changeFrequency: 'weekly',
    priority: 1.0,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/pricing',
    changeFrequency: 'monthly',
    priority: 0.9,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/use-case',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/rfq',
    changeFrequency: 'daily',
    priority: 0.8,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/our-company',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/contact',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/our-team',
    changeFrequency: 'monthly',
    priority: 0.6,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/careers',
    changeFrequency: 'weekly',
    priority: 0.6,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/news',
    changeFrequency: 'daily',
    priority: 0.7,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/article',
    changeFrequency: 'daily',
    priority: 0.7,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/investor-relations',
    changeFrequency: 'monthly',
    priority: 0.5,
    lastModified: LAST_MODIFIED,
  },
  {
    path: '/privacy-policy',
    changeFrequency: 'yearly',
    priority: 0.3,
    lastModified: LAST_MODIFIED,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: `${baseUrl}${path}`,
    lastModified: lastModified ?? LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}
