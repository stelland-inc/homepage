import type { Metadata } from 'next';
import { getRequestLanguage } from '../../../lib/getRequestLanguage';
import ContactView from './ContactView';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const title = lang === 'en' ? 'Contact' : '문의하기';
  const description = lang === 'en'
    ? "Get in touch with Stella&Inc. for content localization, global distribution, or IP partnerships. We're based in Gangnam-gu, Seoul, and typically reply within 48 hours."
    : '콘텐츠 현지화, 글로벌 유통, IP 협업 문의는 스텔라앤으로 연락해 주세요. 서울 강남구에 위치해 있으며, 문의에 대해 보통 48시간 내에 답변드립니다.';

  return {
    title,
    description,
    alternates: { canonical: 'https://stelland.io/contact' },
    openGraph: { title, description, url: 'https://stelland.io/contact' },
  };
}

export default function Contact() {
  return <ContactView />;
}
