import fs from 'fs';  // Use promises-based fs
import path from 'path';
import matter from 'gray-matter';

export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  try {
    // Use synchronous readdir for simplicity in Next.js
    const fileNames = fs.readdirSync(postsDirectory);
    
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        
        // Read file contents synchronously
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
        
        return {
          slug,
          title: matterResult.data.title || '',
          date: matterResult.data.date || '',
          content: matterResult.content
        };
      });
  } catch (error) {
    console.error('Error reading posts directory', error);
    return [];
  }
}


export function getAllBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'blog');
  
  // Check if directory exists
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
    
    return fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title || fileName,
        date: data.date || '',
        content: content
      };
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}
