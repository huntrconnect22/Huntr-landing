import { MetadataRoute } from 'next';

const baseUrl = 'https://huntr.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/#en`,
          id: `${baseUrl}/#id`,
        },
      },
    },
  ];
}
