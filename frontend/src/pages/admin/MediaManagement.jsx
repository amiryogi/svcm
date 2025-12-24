import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  HiUpload, HiTrash, HiPhotograph, HiFilm, HiDocument,
  HiClipboard, HiSearch, HiX
} from 'react-icons/hi';
import { mediaAPI } from '../../services/api';

const MediaManagement = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, [filter]);

  const fetchMedia = async () => {
    try {
      const params = filter !== 'all' ? { type: filter } : {};
      const response = await mediaAPI.getAll(params);
      setMedia(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        // Determine type based on file
        let type = 'image';
        if (file.type.startsWith('video/')) type = 'video';
        else if (file.type === 'application/pdf') type = 'document';
        
        formData.append('type', type);
        
        await mediaAPI.upload(formData);
        successCount++;
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} file(s) uploaded successfully!`);
      fetchMedia();
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    try {
      await mediaAPI.delete(id);
      toast.success('File deleted successfully!');
      fetchMedia();
      if (selectedMedia?._id === id) setSelectedMedia(null);
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'image': return HiPhotograph;
      case 'video': return HiFilm;
      case 'document': return HiDocument;
      default: return HiDocument;
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-1">Upload and manage your media files</p>
        </div>
        <label className={`btn-primary cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
          <HiUpload className="text-xl" />
          {uploading ? 'Uploading...' : 'Upload Files'}
          <input
            type="file"
            multiple
            accept="image/*,video/*,.pdf"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All Files' },
            { value: 'image', label: 'Images' },
            { value: 'video', label: 'Videos' },
            { value: 'document', label: 'Documents' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === item.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Media Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-2xl">
              <div className="loader"></div>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-16 text-gray-500 bg-white rounded-2xl">
              <HiPhotograph className="text-6xl mx-auto mb-4 text-gray-300" />
              <p className="text-xl font-medium">No media files</p>
              <p className="text-sm mt-2">Upload your first file!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => {
                const Icon = getIcon(item.type);
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSelectedMedia(item)}
                    className={`bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all hover:shadow-md ${
                      selectedMedia?._id === item._id ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                      {item.type === 'image' ? (
                        <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
                      ) : item.type === 'video' ? (
                        <video src={item.url} className="w-full h-full object-cover" />
                      ) : (
                        <Icon className="text-4xl text-gray-400" />
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.filename}</p>
                      <p className="text-xs text-gray-500">{formatSize(item.size)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Details Sidebar */}
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-gray-900">File Details</h3>
              <button onClick={() => setSelectedMedia(null)} className="p-1 hover:bg-gray-100 rounded">
                <HiX />
              </button>
            </div>
            <div className="p-4">
              {/* Preview */}
              <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                {selectedMedia.type === 'image' ? (
                  <img src={selectedMedia.url} alt={selectedMedia.filename} className="w-full h-full object-contain" />
                ) : selectedMedia.type === 'video' ? (
                  <video src={selectedMedia.url} controls className="w-full h-full" />
                ) : (
                  <HiDocument className="text-6xl text-gray-400" />
                )}
              </div>

              {/* Info */}
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Filename:</span>
                  <p className="font-medium text-gray-900 break-all">{selectedMedia.filename}</p>
                </div>
                <div>
                  <span className="text-gray-500">Type:</span>
                  <p className="font-medium text-gray-900 capitalize">{selectedMedia.type}</p>
                </div>
                <div>
                  <span className="text-gray-500">Size:</span>
                  <p className="font-medium text-gray-900">{formatSize(selectedMedia.size)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Uploaded:</span>
                  <p className="font-medium text-gray-900">{formatDate(selectedMedia.createdAt)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => copyToClipboard(selectedMedia.url)}
                  className="w-full btn-outline py-2 text-sm justify-center"
                >
                  <HiClipboard />
                  Copy URL
                </button>
                <a
                  href={selectedMedia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary py-2 text-sm justify-center inline-flex"
                >
                  Open in New Tab
                </a>
                <button
                  onClick={() => handleDelete(selectedMedia._id)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <HiTrash />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MediaManagement;
