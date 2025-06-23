import { Roboto } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { headers } from 'next/headers'

const titles = {
  en: "Stella&Inc.",
  ko: "스텔라앤"
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const lang = headersList.get('accept-language')?.includes('en') ? 'en' : 'ko'

  return {
    title: titles[lang],
    description: "콘텐츠 테크 스타트업, 스텔라앤. 콘텐츠 현지화, 글로벌 유통, 콘텐츠 IP개발, 글로벌 스토리 플랫폼 투니즈 개발 및 운영",
    icons: {
      icon: [
        {
          url: 'https://stelland.io/favicon.ico',
          sizes: 'any',
        },
        {
          url: '/apple-touch-icon',
          type: 'image/png',
        },
      ],
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


const roboto = Roboto({ subsets: ['latin'], weight: '400'  })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <LanguageProvider>
          <Header />
            {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
