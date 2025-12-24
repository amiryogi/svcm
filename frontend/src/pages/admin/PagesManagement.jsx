import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  HiPlus, HiPencil, HiTrash, HiEye, HiSearch, HiX,
  HiCollection, HiPhotograph
} from 'react-icons/hi';
import { pageAPI } from '../../services/api';

const PagesManagement = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    isPublished: true,
    order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await pageAPI.getAdminPages();
      setPages(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch pages');
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
      data.append('metaTitle', formData.metaTitle);
      data.append('metaDescription', formData.metaDescription);
      data.append('isPublished', formData.isPublished);
      data.append('order', formData.order);
      if (imageFile) data.append('featuredImage', imageFile);

      if (editingPage) {
        await pageAPI.update(editingPage._id, data);
        toast.success('Page updated successfully!');
      } else {
        await pageAPI.create(data);
        toast.success('Page created successfully!');
      }
      setShowModal(false);
      resetForm();
      fetchPages();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save page');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      await pageAPI.delete(id);
      toast.success('Page deleted successfully!');
      fetchPages();
    } catch (error) {
      toast.error('Failed to delete page');
    }
  };

  const openEditModal = (page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      content: page.content,
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || '',
      isPublished: page.isPublished,
      order: page.order || 0,
    });
    setImagePreview(page.featuredImage || '');
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingPage(null);
    setFormData({
      title: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      isPublished: true,
      order: 0,
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
          <h1 className="text-3xl font-bold text-gray-900">CMS Pages</h1>
          <p className="text-gray-600 mt-1">Manage static pages for your website</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="btn-primary"
        >
          <HiPlus className="text-xl" />
          New Page
        </button>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center h-64">
            <div className="loader"></div>
          </div>
        ) : pages.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-500 bg-white rounded-2xl">
            <HiCollection className="text-6xl mx-auto mb-4 text-gray-300" />
            <p className="text-xl font-medium">No pages yet</p>
            <p className="text-sm mt-2">Create your first CMS page!</p>
          </div>
        ) : (
          pages.map((page) => (
            <motion.div
              key={page._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {page.featuredImage && (
                <div className="h-40 overflow-hidden">
                  <img src={page.featuredImage} alt={page.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    page.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {page.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-xs text-gray-400">Order: {page.order}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{page.title}</h3>
                <p className="text-sm text-gray-500 mb-2">/{page.slug}</p>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{page.content.substring(0, 100)}...</p>
                <div className="flex gap-2">
                  <a
                    href={`/page/${page.slug}`}
                    target="_blank"
                    className="flex-1 btn-outline py-2 text-sm justify-center"
                  >
                    <HiEye />
                    View
                  </a>
                  <button
                    onClick={() => openEditModal(page)}
                    className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <HiPencil />
                  </button>
                  <button
                    onClick={() => handleDelete(page._id)}
                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <HiTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
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
                {editingPage ? 'Edit Page' : 'New Page'}
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
                  <label className="form-label">Meta Title (SEO)</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="form-input"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Meta Description (SEO)</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="form-input"
                  rows="2"
                />
              </div>
              <div>
                <label className="form-label">Featured Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img src={imagePreview} alt="Preview" className="max-h-32 rounded-lg" />
                      <button
                        type="button"
                        onClick={() => { setImageFile(null); setImagePreview(''); }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <HiX />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <HiPhotograph className="text-3xl text-gray-400 mx-auto mb-2" />
                      <span className="text-primary-600 font-medium text-sm">Click to upload</span>
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
                  {editingPage ? 'Update Page' : 'Create Page'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PagesManagement;
