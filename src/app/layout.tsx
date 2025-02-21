import { Roboto } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { headers } from 'next/headers'
import { CursorProvider } from '@/contexts/CursorContext';

const titles = {
  en: "Stella&Inc.",
  ko: "스텔라앤"
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const lang = headersList.get('accept-language')?.includes('en') ? 'en' : 'ko'

  return {
    title: titles[lang],
    description: "Stella&Inc.",
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
    openGraph: {
      title: titles[lang],
      description: "Stella&Inc.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <link 
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap"
        />
      </head>
      <body
        className="antialiased"
      >
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
