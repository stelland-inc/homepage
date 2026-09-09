import { getAllPosts } from 'lib/posts';
import moment from 'moment';
import Link from 'next/link';

export default function PostCard() {
  const posts = getAllPosts();

  return (
    <section>
      <h2 className="md:text-5xl text-3xl font-bold uppercase text-[#374B73]">News</h2>
      <div className='w-16 h-[3px] bg-[#FF8197] mt-4 rounded-full' />

      {posts.length > 0 ? (
        <ul className="mt-10 list-none">
          {posts.map((post) => (
            <li key={post.slug}>
              {/* The whole row is the link, not just the title — a wider hit
                  target reads better on an index list like this. */}
              <Link
                href={`/news/${post.slug}`}
                className="group flex items-baseline justify-between gap-8 border-b border-[#374B73]/15 py-6 transition-colors hover:border-[#FF8197]"
              >
                <span className="min-w-0 break-keep md:text-2xl text-base font-semibold text-[#374B73] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#FF8197]">
                  {post.title || 'Untitled'}
                </span>
                <span className="shrink-0 text-sm tabular-nums text-[#374B73]/45 transition-colors group-hover:text-[#FF8197]">
                  {moment(post.date).format('YYYY.MM.DD')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-[#374B73]/50">No posts yet — check back soon.</p>
      )}
    </section>
  );
}
