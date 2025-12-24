import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  HiSearch, HiEye, HiCheckCircle, HiXCircle, HiClock,
  HiDownload, HiMail, HiPhone, HiUser, HiX
} from 'react-icons/hi';
import { admissionAPI } from '../../services/api';

const AdmissionsManagement = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAdmissions();
  }, [statusFilter]);

  const fetchAdmissions = async () => {
    try {
      const params = { limit: 100 };
      if (statusFilter) params.status = statusFilter;
      const response = await admissionAPI.getAll(params);
      setAdmissions(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch admissions');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await admissionAPI.updateStatus(id, newStatus);
      toast.success(`Application ${newStatus} successfully!`);
      fetchAdmissions();
      if (selectedAdmission?._id === id) {
        setSelectedAdmission({ ...selectedAdmission, status: newStatus });
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openDetailModal = (admission) => {
    setSelectedAdmission(admission);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'reviewing': return 'bg-blue-100 text-blue-700';
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

  const filteredAdmissions = admissions.filter(admission =>
    admission.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    admission.email?.toLowerCase().includes(search.toLowerCase()) ||
    admission.phone?.includes(search)
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admission Applications</h1>
        <p className="text-gray-600 mt-1">Review and manage student applications</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input pl-11"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input w-full md:w-48"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: admissions.length, color: 'bg-gray-100 text-gray-700' },
          { label: 'Pending', value: admissions.filter(a => a.status === 'pending').length, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Approved', value: admissions.filter(a => a.status === 'approved').length, color: 'bg-green-100 text-green-700' },
          { label: 'Rejected', value: admissions.filter(a => a.status === 'rejected').length, color: 'bg-red-100 text-red-700' },
        ].map((stat, index) => (
          <div key={index} className={`rounded-xl p-4 ${stat.color}`}>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="loader"></div>
          </div>
        ) : filteredAdmissions.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <HiUser className="text-6xl mx-auto mb-4 text-gray-300" />
            <p className="text-xl font-medium">No applications found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600 text-sm">
                  <th className="px-6 py-4 font-medium">Applicant</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Shift</th>
                  <th className="px-6 py-4 font-medium">Applied</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAdmissions.map((admission) => (
                  <tr key={admission._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{admission.fullName}</div>
                      <div className="text-sm text-gray-500">{admission.gender}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{admission.email}</div>
                      <div className="text-sm text-gray-500">{admission.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                        {admission.shift}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {formatDate(admission.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(admission.status)}`}>
                        {admission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetailModal(admission)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                          title="View Details"
                        >
                          <HiEye />
                        </button>
                        {admission.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(admission._id, 'approved')}
                              className="p-2 rounded-lg hover:bg-green-50 text-green-600"
                              title="Approve"
                            >
                              <HiCheckCircle />
                            </button>
                            <button
                              onClick={() => handleStatusChange(admission._id, 'rejected')}
                              className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                              title="Reject"
                            >
                              <HiXCircle />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showModal && selectedAdmission && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <HiX className="text-xl" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-full font-medium capitalize ${getStatusColor(selectedAdmission.status)}`}>
                  {selectedAdmission.status}
                </span>
                <div className="text-sm text-gray-500">
                  Applied: {formatDate(selectedAdmission.createdAt)}
                </div>
              </div>

              {/* Personal Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Name:</span> <span className="font-medium">{selectedAdmission.fullName}</span></div>
                  <div><span className="text-gray-500">Gender:</span> <span className="font-medium">{selectedAdmission.gender}</span></div>
                  <div><span className="text-gray-500">DOB:</span> <span className="font-medium">{formatDate(selectedAdmission.dateOfBirth)}</span></div>
                  <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{selectedAdmission.phone}</span></div>
                  <div className="col-span-2"><span className="text-gray-500">Email:</span> <span className="font-medium">{selectedAdmission.email}</span></div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">Address</h3>
                <p className="text-sm text-gray-700">
                  {selectedAdmission.address?.tole && `${selectedAdmission.address.tole}, `}
                  Ward {selectedAdmission.address?.ward}, {selectedAdmission.address?.municipality}, {selectedAdmission.address?.district}
                </p>
              </div>

              {/* Education */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">Previous Education</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Level:</span> <span className="font-medium">{selectedAdmission.previousEducation?.level}</span></div>
                  <div><span className="text-gray-500">Board:</span> <span className="font-medium">{selectedAdmission.previousEducation?.board}</span></div>
                  <div><span className="text-gray-500">Institution:</span> <span className="font-medium">{selectedAdmission.previousEducation?.institution}</span></div>
                  <div><span className="text-gray-500">Passed Year:</span> <span className="font-medium">{selectedAdmission.previousEducation?.passedYear}</span></div>
                </div>
              </div>

              {/* Guardian */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">Guardian Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Name:</span> <span className="font-medium">{selectedAdmission.guardian?.name}</span></div>
                  <div><span className="text-gray-500">Relation:</span> <span className="font-medium">{selectedAdmission.guardian?.relation}</span></div>
                  <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{selectedAdmission.guardian?.phone}</span></div>
                  <div><span className="text-gray-500">Occupation:</span> <span className="font-medium">{selectedAdmission.guardian?.occupation || 'N/A'}</span></div>
                </div>
              </div>

              {/* Documents */}
              {selectedAdmission.documents && Object.keys(selectedAdmission.documents).length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Documents</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedAdmission.documents).map(([key, url]) => (
                      url && (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:bg-gray-50 text-sm"
                        >
                          <HiDownload />
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {selectedAdmission.status === 'pending' && (
                <div className="flex gap-4 pt-4 border-t">
                  <button
                    onClick={() => handleStatusChange(selectedAdmission._id, 'approved')}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <HiCheckCircle />
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedAdmission._id, 'rejected')}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <HiXCircle />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdmissionsManagement;
