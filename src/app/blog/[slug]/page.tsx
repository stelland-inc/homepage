import MarkdownIt from 'markdown-it';
import { getAllBlogPosts } from 'lib/posts';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

// Define the Post type to include title, content, slug, and date
type Post = {
  title: string;
  content: string;
  slug: string;
  date: string;
};

// Define the PageProps type if it's not already defined
// You might need to adjust this according to your actual PageProps definition
type PageProps = {
  params: {
    slug: string;
  };
};

// Define the props type for the page component
type PostPageProps = PageProps; // Ensure PostPageProps satisfies PageProps

const md = new MarkdownIt();

export async function generateStaticParams() {
  const posts = getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Update the fetchPost function to return the correct type
async function fetchPost(slug: string): Promise<Post | undefined> {
  const posts: Post[] = getAllBlogPosts() as Post[];
  return posts.find((post) => post.slug === slug);
}

export default async function Post({ params }: PostPageProps) {
  const { slug } = params; // Removed unnecessary await
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = md.render(post.content);

  return (
    <article className="max-w-screen-xl mx-auto md:pt-40 pt-40 md:p-0 p-5">
      <div className="flex flex-col gap-4">
        <h1 className="text-center md:text-4xl text-xl font-bold uppercase">{post.title}</h1>
        <p className="text-center text-md text-gray-300">{post.date}</p>
        {/* <p className="text-center text-md text-gray-300">{post.summary}</p> */}
      </div>
      <div className="max-w-screen-md mx-auto mt-10 ">
        <div className={`mb-32 ${styles.postContent}`} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </article>
  );
}
