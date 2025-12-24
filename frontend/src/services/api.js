import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  setup: (data) => api.post('/auth/setup', data),
};

// Blog endpoints
export const blogAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getBySlug: (slug) => api.get(`/blogs/detail/${slug}`),
  create: (data) => api.post('/blogs', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/blogs/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/blogs/${id}`),
  getAdminBlogs: (params) => api.get('/blogs/admin', { params }),
};

// Notice endpoints
export const noticeAPI = {
  getAll: (params) => api.get('/notices', { params }),
  getHighlights: () => api.get('/notices/highlights'),
  getById: (id) => api.get(`/notices/detail/${id}`),
  create: (data) => api.post('/notices', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/notices/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/notices/${id}`),
  getAdminNotices: (params) => api.get('/notices/admin', { params }),
};

// Admission endpoints
export const admissionAPI = {
  submit: (data) => api.post('/admissions', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAll: (params) => api.get('/admissions', { params }),
  getById: (id) => api.get(`/admissions/${id}`),
  updateStatus: (id, status) => api.put(`/admissions/${id}/status`, { status }),
  delete: (id) => api.delete(`/admissions/${id}`),
  getStats: () => api.get('/admissions/stats'),
};

// Page endpoints
export const pageAPI = {
  getAll: (params) => api.get('/pages', { params }),
  getBySlug: (slug) => api.get(`/pages/detail/${slug}`),
  create: (data) => api.post('/pages', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/pages/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/pages/${id}`),
  getAdminPages: (params) => api.get('/pages/admin', { params }),
};

// Media endpoints
export const mediaAPI = {
  upload: (data) => api.post('/media/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAll: (params) => api.get('/media', { params }),
  delete: (id) => api.delete(`/media/${id}`),
};

export default api;

