import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCalendar, HiUser, HiArrowLeft, HiTag } from 'react-icons/hi';
import { blogAPI } from '../services/api';
import Loader from '../components/common/Loader';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogAPI.getBySlug(slug);
        setBlog(response.data.data);
      } catch (err) {
        setError('Blog post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <Loader message="Loading article..." />;
  if (error || !blog) {
    return (
      <div className="section-padding text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Blog not found'}</h2>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={blog.featuredImage || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary-400 font-medium mb-6 hover:text-primary-300 transition-colors">
                <HiArrowLeft />
                Back to Blog
              </Link>
              <span className="badge badge-primary mb-4 capitalize">{blog.category}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <HiUser className="text-primary-500" />
                  <span>{blog.author?.name || 'Admin'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCalendar className="text-primary-500" />
                  <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container-custom -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
            >
              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-xl text-gray-600 font-medium italic mb-8 border-l-4 border-primary-500 pl-6">
                  {blog.excerpt}
                </p>
              )}
              
              {/* Main Content */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                {blog.content.split('\n').map((para, i) => para.trim() && (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-3 flex-wrap">
                    <HiTag className="text-gray-400" />
                    {blog.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Share Post</h3>
              <div className="flex gap-4">
                {/* Social media placeholders */}
                <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  f
                </button>
                <button className="w-10 h-10 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                  t
                </button>
                <button className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                  w
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
