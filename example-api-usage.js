// Example usage of the create-news API endpoint

// Example 1: Create a post in the 'posts' directory
const createPost = async () => {
  const response = await fetch('/api/create-news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'My Amazing New Post',
      date: '2024-12-10',
      summary: 'This is a summary of my amazing new post',
      content: `## Introduction

This is the main content of my post written in markdown.

### Key Points
- Point 1
- Point 2
- Point 3

![Sample Image](https://example.com/image.jpg "Image description")

[Read more](https://example.com)`,
      type: 'posts' // Will create in /posts directory
    })
  });

  const result = await response.json();
  console.log(result);
};

// Example 2: Create a blog entry in the 'blog' directory
const createBlogPost = async () => {
  const response = await fetch('/api/create-news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Why Tech Industry is Evolving',
      summary: 'Analysis of current tech trends and future predictions',
      content: `## The Evolution of Technology

Technology continues to evolve at an unprecedented pace...

### Current Trends
1. Artificial Intelligence
2. Blockchain Technology
3. Quantum Computing

Read more about this topic [here](https://example.com).`,
      type: 'blog' // Will create in /blog directory
      // Note: date is optional - will use current date if not provided
    })
  });

  const result = await response.json();
  console.log(result);
};

// Example 3: Using with form data
const handleFormSubmit = async (formData) => {
  try {
    const response = await fetch('/api/create-news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.get('title'),
        date: formData.get('date'),
        summary: formData.get('summary'),
        content: formData.get('content'),
        type: formData.get('type') || 'posts'
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Post created successfully:', result);
      return result;
    } else {
      const error = await response.json();
      console.error('Error creating post:', error);
      throw new Error(error.error);
    }
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};

// Example 4: Testing the API with curl (run in terminal)
/*
curl -X POST http://localhost:3000/api/create-news \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post from cURL",
    "date": "2024-12-10",
    "summary": "This post was created using cURL",
    "content": "## Hello World\n\nThis is a test post created via API call.",
    "type": "posts"
  }'
*/ 