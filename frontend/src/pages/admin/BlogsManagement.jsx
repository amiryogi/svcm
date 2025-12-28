import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  HiPlus, HiPencil, HiTrash, HiEye, HiSearch, HiX,
  HiPhotograph, HiCalendar
} from 'react-icons/hi';
import { blogAPI, mediaAPI } from '../../services/api';

const BlogsManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'news',
    tags: '',
    isPublished: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAdminBlogs();
      setBlogs(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('excerpt', formData.excerpt);
      data.append('category', formData.category);
      data.append('tags', formData.tags);
      data.append('isPublished', formData.isPublished);
      if (imageFile) data.append('featuredImage', imageFile);

      if (editingBlog) {
        await blogAPI.update(editingBlog._id, data);
        toast.success('Blog updated successfully!');
      } else {
        await blogAPI.create(data);
        toast.success('Blog created successfully!');
      }
      setShowModal(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save blog');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      await blogAPI.delete(id);
      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      category: blog.category,
      tags: blog.tags?.join(', ') || '',
      isPublished: blog.isPublished,
    });
    setImagePreview(blog.featuredImage || '');
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'news',
      tags: '',
      isPublished: true,
    });
    setImageFile(null);
    setImagePreview('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-600 mt-1">Manage your blog posts</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="btn-primary"
        >
          <HiPlus className="text-xl" />
          New Blog
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <div className="relative">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-11"
          />
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="loader"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <HiPhotograph className="text-6xl mx-auto mb-4 text-gray-300" />
            <p className="text-xl font-medium">No blogs found</p>
            <p className="text-sm mt-2">Create your first blog post!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600 text-sm">
                  <th className="px-6 py-4 font-medium">Blog</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {blog.featuredImage ? (
                            <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <HiPhotograph className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">{blog.title}</div>
                          <div className="text-sm text-gray-500">/{blog.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 capitalize">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        >
                          <HiEye />
                        </a>
                        <button
                          onClick={() => openEditModal(blog)}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                        >
                          <HiPencil />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                        >
                          <HiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingBlog ? 'Edit Blog' : 'New Blog'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <HiX className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Excerpt</label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="form-input"
                  placeholder="Short description"
                />
              </div>
              <div>
                <label className="form-label">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="form-input min-h-[200px]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-input"
                  >
                    <option value="news">News</option>
                    <option value="events">Events</option>
                    <option value="academic">Academic</option>
                    <option value="sports">Sports</option>
                    <option value="achievements">Achievements</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="form-input"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Featured Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg" />
                      <button
                        type="button"
                        onClick={() => { setImageFile(null); setImagePreview(''); }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full"
                      >
                        <HiX />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <HiPhotograph className="text-4xl text-gray-400 mx-auto mb-2" />
                      <span className="text-primary-600 font-medium">Click to upload</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600"
                />
                <label htmlFor="isPublished" className="font-medium text-gray-700">Publish immediately</label>
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BlogsManagement;
