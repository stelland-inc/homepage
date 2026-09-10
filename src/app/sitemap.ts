import type { MetadataRoute } from 'next';
import { getAllPosts } from 'lib/posts';

const BASE_URL = 'https://stelland.io';

// Only real, public, indexable routes — /admin/create-post and /api/* are
// deliberately left out (not public content), matching the same set of
// pages that got their own metadata in the content-improvement stage.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/business`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/news`, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const posts = getAllPosts() as Array<{ slug: string; date: string }>;
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/news/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
