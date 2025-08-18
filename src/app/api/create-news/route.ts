import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, date, summary, content, type = 'posts' } = body;

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Validate type
    if (type !== 'posts' && type !== 'blog') {
      return NextResponse.json(
        { error: 'Type must be either "posts" or "blog"' },
        { status: 400 }
      );
    }

    // Generate filename - you can customize this logic
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .substring(0, 50); // Limit length

    // Use current date if not provided
    const postDate = date || new Date().toISOString().split('T')[0];

    // Determine target directory
    const targetDir = path.join(process.cwd(), type);

    // Ensure directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Generate unique filename
    let fileName = `${slug}.md`;
    let filePath = path.join(targetDir, fileName);
    let counter = 1;

    // Check if file exists and generate unique name
    while (fs.existsSync(filePath)) {
      fileName = `${slug}-${counter}.md`;
      filePath = path.join(targetDir, fileName);
      counter++;
    }

    // Create frontmatter
    const frontMatter = `---
title: ${title}
date: '${postDate}'${summary ? `
summary: ${summary}` : ''}
---

${content}`;

    // Write file
    fs.writeFileSync(filePath, frontMatter, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      filename: fileName,
      path: `${type}/${fileName}`,
      slug: slug
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to retrieve existing posts
export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to create a new post',
    requiredFields: ['title', 'content'],
    optionalFields: ['date', 'summary', 'type'],
    example: {
      title: 'My New Post',
      date: '2024-12-10',
      summary: 'This is a summary of my post',
      content: 'This is the main content of the post in markdown format.',
      type: 'posts' // or 'blog'
    }
  });
} 