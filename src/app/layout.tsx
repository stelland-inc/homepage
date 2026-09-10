import { Roboto } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import IntroSplash from "@/components/IntroSplash";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CursorProvider } from '@/contexts/CursorContext';
import { getRequestLanguage } from '../../lib/getRequestLanguage';

const titles = {
  en: "Stella&Inc.",
  ko: "스텔라앤"
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage()

  return {
    // Every URL used elsewhere in this metadata is already absolute
    // (https://stelland.io/...), so nothing depends on this today — it's
    // a safeguard so a future relative URL in metadata can never resolve
    // against Next's own fallback (localhost, or a Vercel preview host)
    // instead of the real production domain.
    metadataBase: new URL('https://stelland.io'),
    // `template` lets every page set its own short title (e.g. "About Us")
    // and automatically get the brand suffix appended ("About Us |
    // Stella&Inc.") — pages that don't override `title` at all fall back
    // to `default`, which is what every page showed before this.
    title: {
      default: titles[lang],
      template: `%s | ${titles[lang]}`,
    },
    description: "콘텐츠 테크 스타트업, 스텔라앤. 콘텐츠 현지화, 글로벌 유통, 콘텐츠 IP개발, 글로벌 스토리 플랫폼 투니즈 개발 및 운영",
    icons: {
      icon: [
        {
          url: '/favicon.ico',
          sizes: 'any',
        },
        {
          url: '/apple-touch-icon.png',
          type: 'image/png',
        },
      ],
    },
    alternates: {
      canonical: "https://stelland.io",
    },
    verification: {
      google: "XWvBW1Kv6FQDKvYSOe-SDmQOtGcCI5PRST0XF1JFpB8"
    },
    other: {
      title: "콘텐츠 테크 스타트업, 스텔라앤",
      description: "콘텐츠 현지화, 글로벌 유통, 콘텐츠 IP개발, 글로벌 스토리 플랫폼 '투니즈' 개발 및 운영"
    },
    openGraph: {
      title: titles[lang],
      description: "콘텐츠 테크 스타트업, 스텔라앤. 콘텐츠 현지화, 글로벌 유통, 콘텐츠 IP개발, 글로벌 스토리 플랫폼 투니즈 개발 및 운영",
      url: "https://stelland.io",
      siteName: titles[lang],
      images: [
        {
          url: 'https://stelland.io/images/logo/Logo_landscape.png',
          alt: titles[lang]
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: 'Stella&Inc.',
      images: ['https://stelland.io/apple-touch-icon.png'],
    },
  }
}

// Organization schema, site-wide. Deliberately narrow: name, url, logo, and
// sameAs (social links already published and linked from the real Footer)
// are the only facts confirmed elsewhere in this codebase — no address or
// phone number here, since the two are inconsistent between the English
// and Korean footer copy and haven't been confirmed (see the content-stage
// report).
const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stella&Inc.',
  alternateName: '스텔라앤',
  url: 'https://stelland.io',
  logo: 'https://stelland.io/images/logo/Logo.png',
  sameAs: [
    'https://www.linkedin.com/company/stellandio',
    'https://www.instagram.com/stelland_official',
    'https://stelland.medium.com',
    'https://blog.naver.com/stelland_official',
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Was hardcoded "en" regardless of the actual guessed/toggled language —
  // a real mismatch for the majority-Korean content this site serves.
  const lang = await getRequestLanguage();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body
        className="antialiased"
      >
        <IntroSplash />
        <LanguageProvider>
          <CursorProvider>
            <Header />
            {children}
          </CursorProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
