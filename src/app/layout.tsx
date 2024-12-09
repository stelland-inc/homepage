import { Roboto } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { LanguageProvider } from '@/contexts/LanguageContext';

export const metadata: Metadata = {
  title: "Stella&Inc Entertainment",
  description: "Stella&Inc Entertainment",
};

// const inter = Inter({ subsets: ['latin'] })
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
