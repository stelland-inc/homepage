// import { getAllBlogPosts } from 'lib/posts';
import MarkdownIt from 'markdown-it';
import { getAllBlogPosts } from 'lib/posts';
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
  const posts = getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function fetchPost(slug: string): Promise<Post | undefined> {
  const posts: Post[] = getAllBlogPosts() as Post[];
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
    return <div>Post not found</div>;
  }

  const htmlContent = md.render(post.content);

  return (
    <article className="max-w-screen-xl mx-auto md:pt-40 pt-40 md:p-0 p-5">
      <div className="flex flex-col gap-4">
        <h1 className="text-center md:text-4xl text-xl font-bold uppercase">{post.title}</h1>
        <p className="text-center text-md text-gray-300">{post.date}</p>
        <p className="text-center text-md text-gray-300">{post.summary}</p>
      </div>
      <div className="max-w-screen-md mx-auto mt-10 ">
        <div className={`mb-32 ${styles.postContent}`} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </article>
  );
}
