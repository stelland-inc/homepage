import type { Metadata } from 'next';
import PostCard from "@/components/PostCard";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer/Footer";
import { getRequestLanguage } from '../../../lib/getRequestLanguage';
// import MediumPostList from "@/components/MediumPostList";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLanguage();
  const title = lang === 'en' ? 'Newsroom' : '뉴스룸';
  const description = lang === 'en'
    ? 'News, partnerships, and updates from Stella&Inc., a content globalization and webtoon localization company.'
    : '스텔라앤의 새로운 소식과 파트너십, 콘텐츠 현지화·글로벌 유통 사업 관련 업데이트를 전합니다.';

  return {
    title,
    description,
    alternates: { canonical: 'https://stelland.io/news' },
    openGraph: { title, description, url: 'https://stelland.io/news' },
  };
}

export default function News() {
    return (
        <>
        {/* Same dotted-grid ground as the About page, so the two editorial
            pages read as one family instead of a bare white index. */}
        <div
            className="w-full"
            style={{
                backgroundColor: '#FFF8F3',
                backgroundImage: 'radial-gradient(rgba(55,75,115,0.08) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
            }}
        >
            {/* Padding has to hold until the viewport is wider than the
                container itself (lg), not just md — otherwise the copy
                runs into the window edge between 768px and 1024px. */}
            <div className="max-w-screen-lg mx-auto px-6 lg:px-0 pt-40 pb-32">
                <header className="pb-20 border-b border-[#374B73]/15">
                    <p className="text-[#FF8197] text-sm tracking-[0.3em] uppercase">Newsroom</p>
                    <h1 className="mt-4 md:text-7xl text-4xl font-bold uppercase leading-[0.95] tracking-tight text-[#374B73]">
                        What&apos;s new<br />at Stella&amp;
                    </h1>
                    <p className="mt-6 max-w-xl text-base md:text-lg text-[#374B73]/60">
                        새로운 소식과 파트너십, 그리고 우리가 만들어가는 이야기를 전합니다.
                    </p>
                </header>

                <div className="flex flex-col gap-28 pt-20">
                    <PostCard />
                    {/* medium post list */}
                    <BlogCard />
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
