import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiDocumentText, HiSpeakerphone, HiUserGroup, HiCollection,
  HiTrendingUp, HiEye, HiClock, HiCheckCircle, HiExclamationCircle
} from 'react-icons/hi';
import { blogAPI, noticeAPI, admissionAPI, pageAPI } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    notices: 0,
    admissions: { total: 0, pending: 0, approved: 0, rejected: 0 },
    pages: 0,
  });
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats in parallel
      const [blogsRes, noticesRes, admissionsRes, pagesRes] = await Promise.all([
        blogAPI.getAll({ limit: 1 }).catch(() => ({ data: { pagination: { total: 0 } } })),
        noticeAPI.getAll({ limit: 1 }).catch(() => ({ data: { pagination: { total: 0 } } })),
        admissionAPI.getStats().catch(() => ({ data: { data: { total: 0, pending: 0, approved: 0, rejected: 0 } } })),
        pageAPI.getAll({ limit: 1 }).catch(() => ({ data: { pagination: { total: 0 } } })),
      ]);

      setStats({
        blogs: blogsRes.data.pagination?.total || 0,
        notices: noticesRes.data.pagination?.total || 0,
        admissions: admissionsRes.data.data || { total: 0, pending: 0, approved: 0, rejected: 0 },
        pages: pagesRes.data.pagination?.total || 0,
      });

      // Fetch recent admissions
      const recentRes = await admissionAPI.getAll({ limit: 5, sort: '-createdAt' }).catch(() => ({ data: { data: [] } }));
      setRecentAdmissions(recentRes.data.data || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Total Blogs', 
      value: stats.blogs, 
      icon: HiDocumentText, 
      color: 'from-blue-500 to-blue-700',
      link: '/admin/blogs' 
    },
    { 
      title: 'Active Notices', 
      value: stats.notices, 
      icon: HiSpeakerphone, 
      color: 'from-amber-500 to-amber-700',
      link: '/admin/notices' 
    },
    { 
      title: 'Total Applications', 
      value: stats.admissions.total, 
      icon: HiUserGroup, 
      color: 'from-primary-500 to-primary-700',
      link: '/admin/admissions' 
    },
    { 
      title: 'CMS Pages', 
      value: stats.pages, 
      icon: HiCollection, 
      color: 'from-purple-500 to-purple-700',
      link: '/admin/pages' 
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={card.link}
              className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <card.icon className="text-2xl text-white" />
                </div>
                <HiTrendingUp className="text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
              <div className="text-gray-500 text-sm">{card.title}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admission Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Admission Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50">
              <div className="flex items-center gap-3">
                <HiClock className="text-2xl text-yellow-600" />
                <span className="font-medium text-gray-700">Pending</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{stats.admissions.pending}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-50">
              <div className="flex items-center gap-3">
                <HiCheckCircle className="text-2xl text-green-600" />
                <span className="font-medium text-gray-700">Approved</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{stats.admissions.approved}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-red-50">
              <div className="flex items-center gap-3">
                <HiExclamationCircle className="text-2xl text-red-600" />
                <span className="font-medium text-gray-700">Rejected</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{stats.admissions.rejected}</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
            <Link to="/admin/admissions" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          {recentAdmissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No applications yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Phone</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAdmissions.map((admission) => (
                    <tr key={admission._id} className="border-b last:border-0">
                      <td className="py-4">
                        <div className="font-medium text-gray-900">{admission.fullName}</div>
                        <div className="text-sm text-gray-500">{admission.email}</div>
                      </td>
                      <td className="py-4 text-gray-600">{admission.phone}</td>
                      <td className="py-4 text-gray-600">{formatDate(admission.createdAt)}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(admission.status)}`}>
                          {admission.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/blogs" className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-colors">
            + New Blog Post
          </Link>
          <Link to="/admin/notices" className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-colors">
            + New Notice
          </Link>
          <Link to="/admin/pages" className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-colors">
            + New Page
          </Link>
          <a href="/" target="_blank" className="bg-accent-500 text-primary-900 hover:bg-accent-400 px-6 py-3 rounded-xl font-medium transition-colors">
            View Website →
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
