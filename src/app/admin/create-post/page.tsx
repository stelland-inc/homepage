'use client'
import CreatePostForm from '@/components/CreatePostForm';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CreatePostPage() {
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  const handlePostSuccess = (result: any) => {
    // Add the new post to the recent posts list
    setRecentPosts(prev => [result, ...prev.slice(0, 4)]); // Keep only last 5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-lg mx-auto pt-20 pb-10 px-4">
        {/* Header */}
        <div className="mb-8">
            {/* Floating Create Post Button */}
            {/*             
            <Link 
                href="/admin/create-post" 
                className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 group"
                title="Create New Post"
            >
                <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-200" />
            </Link> */}

          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Create New Post
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create and publish new blog posts or news articles to your website
            </p>
          </div>
        </div>

        {/* Form */}
        <CreatePostForm onSuccess={handlePostSuccess} className="mb-12" />

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Recently Created Posts
            </h3>
            
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-4 rounded-lg border shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{post.filename}</h4>
                      <p className="text-sm text-gray-500">
                        Created in /{post.path.split('/')[0]} directory
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        post.path.startsWith('posts/') 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {post.path.startsWith('posts/') ? 'News' : 'Blog'}
                      </span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="h-20"></div>
        <Footer />
      </div>
    </div>
  );
} 