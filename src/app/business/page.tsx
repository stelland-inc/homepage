import type { Metadata } from 'next';
import { getRequestLanguage } from '../../../lib/getRequestLanguage';
import BusinessView from './BusinessView';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const title = lang === 'en' ? 'What We Do' : '비즈니스';
  const description = lang === 'en'
    ? 'Stella&Inc.\'s business: webtoon, web novel, comic, and animation localization into 24 languages, global distribution through region-specific pipelines, and an in-house short-form animation production studio.'
    : '스텔라앤의 비즈니스: 웹소설·웹툰·만화·애니메이션을 24개 언어로 현지화하고, 해외 거점별 파이프라인으로 글로벌 유통하며, 숏폼 애니메이션 제작 스튜디오를 직접 운영합니다.';

  return {
    title,
    description,
    alternates: { canonical: 'https://stelland.io/business' },
    openGraph: { title, description, url: 'https://stelland.io/business' },
  };
}

export default function Business() {
  return <BusinessView />;
}
