import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  HiPlus, HiPencil, HiTrash, HiSpeakerphone, HiX,
  HiPhotograph, HiStar
} from 'react-icons/hi';
import { noticeAPI } from '../../services/api';

const NoticesManagement = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isHighlight: false,
    isActive: true,
    priority: 0,
    expiresAt: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await noticeAPI.getAdminNotices();
      setNotices(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch notices');
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
      data.append('isHighlight', formData.isHighlight);
      data.append('isActive', formData.isActive);
      data.append('priority', formData.priority);
      if (formData.expiresAt) data.append('expiresAt', formData.expiresAt);
      if (imageFile) data.append('image', imageFile);

      if (editingNotice) {
        await noticeAPI.update(editingNotice._id, data);
        toast.success('Notice updated successfully!');
      } else {
        await noticeAPI.create(data);
        toast.success('Notice created successfully!');
      }
      setShowModal(false);
      resetForm();
      fetchNotices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save notice');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      await noticeAPI.delete(id);
      toast.success('Notice deleted successfully!');
      fetchNotices();
    } catch (error) {
      toast.error('Failed to delete notice');
    }
  };

  const openEditModal = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      isHighlight: notice.isHighlight,
      isActive: notice.isActive,
      priority: notice.priority || 0,
      expiresAt: notice.expiresAt ? new Date(notice.expiresAt).toISOString().split('T')[0] : '',
    });
    setImagePreview(notice.image || '');
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      content: '',
      isHighlight: false,
      isActive: true,
      priority: 0,
      expiresAt: '',
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
          <h1 className="text-3xl font-bold text-gray-900">Notices</h1>
          <p className="text-gray-600 mt-1">Manage announcements and highlights</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="btn-primary"
        >
          <HiPlus className="text-xl" />
          New Notice
        </button>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center h-64">
            <div className="loader"></div>
          </div>
        ) : notices.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-500 bg-white rounded-2xl">
            <HiSpeakerphone className="text-6xl mx-auto mb-4 text-gray-300" />
            <p className="text-xl font-medium">No notices yet</p>
            <p className="text-sm mt-2">Create your first announcement!</p>
          </div>
        ) : (
          notices.map((notice) => (
            <motion.div
              key={notice._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {notice.image && (
                <div className="h-40 overflow-hidden">
                  <img src={notice.image} alt={notice.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start gap-2 mb-3">
                  {notice.isHighlight && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                      <HiStar className="text-amber-500" />
                      Highlight
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    notice.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {notice.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{notice.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{notice.content}</p>
                <div className="text-xs text-gray-400 mb-4">
                  Created: {formatDate(notice.createdAt)}
                  {notice.expiresAt && ` • Expires: ${formatDate(notice.expiresAt)}`}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(notice)}
                    className="flex-1 btn-outline py-2 text-sm"
                  >
                    <HiPencil />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
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
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingNotice ? 'Edit Notice' : 'New Notice'}
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
                  className="form-input min-h-[120px]"
                  required
                />
              </div>
              <div>
                <label className="form-label">Image</label>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Priority</label>
                  <input
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                    className="form-input"
                    min="0"
                  />
                </div>
                <div>
                  <label className="form-label">Expires At</label>
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isHighlight}
                    onChange={(e) => setFormData({ ...formData, isHighlight: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-amber-500"
                  />
                  <span className="text-gray-700">Show as Highlight (Modal)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-primary-600"
                  />
                  <span className="text-gray-700">Active</span>
                </label>
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  {editingNotice ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NoticesManagement;
