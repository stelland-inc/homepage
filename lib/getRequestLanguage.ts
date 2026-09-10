import { headers } from 'next/headers';

/**
 * Guesses the visitor's language from the Accept-Language header, for
 * metadata generation only (the on-page language toggle itself is a
 * separate client-side LanguageContext with no URL/cookie of its own —
 * this is just a best-effort default for title/description before any
 * client JS runs). Mirrors the check already used in the root layout.
 */
export async function getRequestLanguage(): Promise<'en' | 'ko'> {
  const headersList = await headers();
  return headersList.get('accept-language')?.includes('en') ? 'en' : 'ko';
}
