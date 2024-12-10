import fs from 'fs';  // Use promises-based fs
import path from 'path';
import matter from 'gray-matter';

export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        
        return {
          slug,
          title: matterResult.data.title || '',
          date: matterResult.data.date || '',
          content: matterResult.content
        };
      });

    // Sort posts by date in descending order
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading posts directory', error);
    return [];
  }
}

export function getAllBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'blog');
  
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Blog posts directory does not exist: ${postsDirectory}`);
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory)
      .filter(fileName => 
        fileName.endsWith('.md') && 
        fs.statSync(path.join(postsDirectory, fileName)).isFile()
      );

    const posts = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      return {
        slug,
        title: matterResult.data.title || fileName,
        date: matterResult.data.date || '',
        content: matterResult.content
      };
    });

    // Sort posts by date in ascending order
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}