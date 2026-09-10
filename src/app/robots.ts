import type { MetadataRoute } from 'next';

// Search visibility and "allow AI model training on this content" are two
// separate policy decisions (per OpenAI/Anthropic/Perplexity/Google's own
// current docs, checked live: each vendor lets a site allow search/citation
// use while independently blocking training use, or vice versa).
//
// Explicit decision (confirmed by the site owner): allow search-indexing
// and user-triggered-citation bots (needed to show up in AI search), block
// training-only crawlers.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        // Search-indexing and user-triggered-citation crawlers — allowing
        // these is exactly what "show up in AI search" requires.
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Yeti', // Naver
          'OAI-SearchBot', // OpenAI: ChatGPT search indexing
          'ChatGPT-User', // OpenAI: live fetch for a user's question
          'Claude-SearchBot', // Anthropic: search indexing
          'Claude-User', // Anthropic: live fetch for a user's question
          'PerplexityBot', // Perplexity: search indexing
          'Perplexity-User', // Perplexity: live fetch for a user's question
        ],
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        // Training-only crawlers — blocked site-wide per explicit
        // instruction. This is independent of the search-indexing rule
        // above (e.g. Anthropic exposes ClaudeBot for training separately
        // from Claude-SearchBot/Claude-User for search).
        userAgent: [
          'GPTBot', // OpenAI: model training
          'ClaudeBot', // Anthropic: model training
          'Google-Extended', // Google: Gemini training / some grounding use
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://stelland.io/sitemap.xml',
  };
}
