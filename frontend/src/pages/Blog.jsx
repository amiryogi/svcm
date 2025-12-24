import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCalendar, HiUser, HiTag, HiArrowRight, HiSearch } from 'react-icons/hi';
import { blogAPI } from '../services/api';
import Loader from '../components/common/Loader';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  const fetchBlogs = async () => {
    try {
      const params = { limit: 12 };
      if (category) params.category = category;
      const response = await blogAPI.getAll(params);
      setBlogs(response.data.data);
    } catch (error) {
      // Use sample data if API fails
      setBlogs(sampleBlogs);
    } finally {
      setLoading(false);
    }
  };

  const sampleBlogs = [
    {
      _id: '1',
      title: 'Admission Open for BBS 2025 - Apply Now!',
      slug: 'admission-open-2025',
      excerpt: 'SVCM Campus is now accepting applications for the Bachelor of Business Studies program for the academic year 2025.',
      featuredImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'admission',
      author: { name: 'Admin' },
      publishedAt: '2024-12-20',
      views: 245,
    },
    {
      _id: '2',
      title: 'Annual Sports Week 2024 Highlights',
      slug: 'sports-week-2024',
      excerpt: 'Relive the exciting moments from our Annual Sports Week featuring various inter-house competitions.',
      featuredImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'sports',
      author: { name: 'Sports Committee' },
      publishedAt: '2024-12-15',
      views: 189,
    },
    {
      _id: '3',
      title: 'Workshop on Financial Literacy',
      slug: 'financial-literacy-workshop',
      excerpt: 'Our students participated in a comprehensive workshop on financial literacy and investment basics.',
      featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'academic',
      author: { name: 'Academic Cell' },
      publishedAt: '2024-12-10',
      views: 156,
    },
    {
      _id: '4',
      title: 'Cultural Day Celebration',
      slug: 'cultural-day-2024',
      excerpt: 'Students showcased the rich cultural diversity of Nepal during our annual Cultural Day celebrations.',
      featuredImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'events',
      author: { name: 'Cultural Committee' },
      publishedAt: '2024-12-05',
      views: 203,
    },
    {
      _id: '5',
      title: 'Guest Lecture by Industry Expert',
      slug: 'guest-lecture-banking',
      excerpt: 'A renowned banking professional shared insights on career opportunities in the financial sector.',
      featuredImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'academic',
      author: { name: 'Admin' },
      publishedAt: '2024-11-28',
      views: 178,
    },
    {
      _id: '6',
      title: 'Campus Placement Drive 2024',
      slug: 'placement-drive-2024',
      excerpt: 'Multiple companies participated in our annual placement drive, offering opportunities to graduating students.',
      featuredImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'achievements',
      author: { name: 'Placement Cell' },
      publishedAt: '2024-11-20',
      views: 312,
    },
  ];

  const categories = [
    { value: '', label: 'All Posts' },
    { value: 'news', label: 'News' },
    { value: 'events', label: 'Events' },
    { value: 'academic', label: 'Academic' },
    { value: 'sports', label: 'Sports' },
    { value: 'achievements', label: 'Achievements' },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 gradient-hero text-white">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-4"
          >
            News & Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Stay updated with the latest news, events, and achievements from SVCM Campus.
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-11"
              />
            </div>
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <Loader message="Loading articles..." />
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={blog.featuredImage || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="badge badge-primary capitalize">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <HiCalendar className="text-primary-500" />
                        {formatDate(blog.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiUser className="text-primary-500" />
                        {blog.author?.name || 'Admin'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all"
                    >
                      Read More
                      <HiArrowRight />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
