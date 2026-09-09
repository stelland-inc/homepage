import MarkdownIt from 'markdown-it';
import Link from 'next/link';
import moment from 'moment';
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

export default async function Post({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const post = await fetchPost(resolvedParams.slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center">
        <p className="text-[#374B73]/60">Post not found</p>
        <Link href="/news" className="text-[#FF8197] font-semibold hover:underline">
          뉴스로 돌아가기
        </Link>
      </div>
    );
  }

  const htmlContent = md.render(post.content);

  return (
    <>
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
