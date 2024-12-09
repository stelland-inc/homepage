import { getAllBlogPosts } from 'lib/posts';
import Link from 'next/link';
import moment from 'moment';

export default function BlogCard() {
    const posts = getAllBlogPosts() as Array<{ content: string; slug: string; title: string; date: string }>;
   
    return posts.length > 0 ? (
      <div>
        <h2 className="text-center md:text-4xl text-3xl font-bold uppercase">BLOG</h2>
        <div className="flex flex-col gap-4 mt-10 md:p-0 p-5">
          {posts.map((post) => (
            <div key={post.slug} className="border-b border-gray-300 pb-4 flex flex-row justify-between">
              <Link href={`/blog/${post.slug}`} className="md:text-2xl text-md">{post.title || "Untitled"}</Link>
              <span className="text-sm text-gray-300 self-center">{moment(post.date).format('YYYY.MM.DD')}</span>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div>
        <span className='text-center text-gray-300 pt-10'>No posts found</span>
      </div>
    );
  }
  