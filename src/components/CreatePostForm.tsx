'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Send, FileText, Calendar, Tag, Type } from 'lucide-react';

interface CreatePostFormProps {
  onSuccess?: (result: any) => void;
  className?: string;
}

export default function CreatePostForm({ onSuccess, className = '' }: CreatePostFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    summary: '',
    content: '',
    type: 'posts'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/create-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: `Post created successfully! File: ${result.filename}` 
        });
        
        // Reset form
        setFormData({
          title: '',
          date: '',
          summary: '',
          content: '',
          type: 'posts'
        });

        if (onSuccess) {
          onSuccess(result);
        }
      } else {
        setMessage({ 
          type: 'error', 
          text: result.error || 'Failed to create post' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl mx-auto p-6 bg-white rounded-lg border shadow-sm ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex rounded-full bg-pink-200/20 p-3">
          <Plus className="h-6 w-6 text-pink-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
          <p className="text-gray-600">Create a new blog post or news article</p>
        </div>
      </div>

      {message.text && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Tag className="h-4 w-4" />
            Post Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="posts">News Post</option>
            <option value="blog">Blog Post</option>
          </select>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Type className="h-4 w-4" />
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter post title..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4" />
            Date (optional)
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
          />
          <p className="text-xs text-gray-500">Leave empty to use current date</p>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FileText className="h-4 w-4" />
            Summary (optional)
          </label>
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            placeholder="Brief summary or description..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FileText className="h-4 w-4" />
            Content *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Write your content in Markdown format...

## Example Heading
This is a paragraph with **bold** and *italic* text.

### Key Points
- Point 1
- Point 2
- Point 3

![Image](https://example.com/image.jpg 'Alt text')

[Link text](https://example.com)"
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
            required
          />
          <p className="text-xs text-gray-500">Use Markdown syntax for formatting</p>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Creating Post...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Create Post
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
} 