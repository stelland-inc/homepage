import type { Metadata } from 'next';
import { getRequestLanguage } from '../../../lib/getRequestLanguage';
import AboutView from './AboutView';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const title = lang === 'en' ? 'About Us' : '회사 소개';
  const description = lang === 'en'
    ? "Stella&Inc. is a content globalization partner for webtoons and web novels — translation into 24+ languages, global distribution, and IP development. See our mission, philosophy, and company history since 2022."
    : '웹툰·웹소설을 24개 이상 언어로 번역하고 글로벌 유통·IP 개발까지 함께하는 콘텐츠 글로벌화 파트너, 스텔라앤을 소개합니다. 2022년 설립 이후의 미션, 철학, 연혁을 확인하세요.';

  return {
    title,
    description,
    alternates: { canonical: 'https://stelland.io/about' },
    openGraph: { title, description, url: 'https://stelland.io/about' },
  };
}

export default function About() {
  return <AboutView />;
}
