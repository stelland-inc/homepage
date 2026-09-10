import MarkdownIt from 'markdown-it';
import Link from 'next/link';
import moment from 'moment';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts } from 'lib/posts';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.scss';

const md = new MarkdownIt();

type Post = {
  title: string;
  content: string;
  slug: string;
  date: string;
  summary: string;
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function fetchPost(slug: string): Promise<Post | undefined> {
  const posts: Post[] = getAllPosts() as Post[];
  return posts.find((post) => post.slug === slug);
}

// A handful of older posts were published with an empty `summary` in their
// frontmatter — falling back to the post's own body (stripped of markdown/
// HTML) beats every post sharing the site-wide description, which is what
// happened before any per-post metadata existed here at all.
function excerptFrom(content: string, maxLength = 155): string {
  const plain = md
    .render(content)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return {};

  const description = post.summary || excerptFrom(post.content);

  return {
    title: post.title,
    description,
    alternates: { canonical: `https://stelland.io/news/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      url: `https://stelland.io/news/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description,
    },
  };
}

export default async function Post({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const post = await fetchPost(resolvedParams.slug);

  // Was returning this same JSX with a 200 status — a soft 404. A slug
  // that matches no real post is a genuine not-found, not a normal page.
  if (!post) {
    notFound();
  }

  const htmlContent = md.render(post.content);
  const description = post.summary || excerptFrom(post.content);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description,
    datePublished: post.date,
    url: `https://stelland.io/news/${post.slug}`,
    mainEntityOfPage: `https://stelland.io/news/${post.slug}`,
    publisher: { '@type': 'Organization', name: 'Stella&Inc.', url: 'https://stelland.io' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Same dotted-grid ground as the News index, so a post reads as
          part of the same section rather than a separate template. */}
      <article
        className="w-full"
        style={{
          backgroundColor: '#FFF8F3',
          backgroundImage: 'radial-gradient(rgba(55,75,115,0.08) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        <div className="max-w-screen-md mx-auto px-6 pt-32 md:pt-40 pb-32">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#374B73]/60 transition-colors hover:text-[#FF8197]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            뉴스로 돌아가기
          </Link>

          <header className="mt-10 pb-10 border-b border-[#374B73]/15">
            <p className="text-[#FF8197] text-sm tracking-[0.3em] uppercase">Newsroom</p>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#374B73] text-balance">
              {post.title}
            </h1>
            {post.summary && (
              <p className="mt-6 text-lg text-[#374B73]/60 text-balance">{post.summary}</p>
            )}
            <p className="mt-6 text-sm tabular-nums text-[#374B73]/45">
              {moment(post.date).format('YYYY.MM.DD')}
            </p>
          </header>

          <div
            className={`mt-14 ${styles.postContent}`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <div className="mt-20 pt-10 border-t border-[#374B73]/15">
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#374B73] transition-colors hover:text-[#FF8197]"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              모든 뉴스 보기
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
