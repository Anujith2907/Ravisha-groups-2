import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rg2_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('rg2_token');
      localStorage.removeItem('rg2_user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH
// ============================================
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.put('/auth/password', { currentPassword, newPassword }),
};

// ============================================
// CONTENT
// ============================================
export const contentAPI = {
  get: () => api.get('/content'),
  update: (data: object) => api.put('/content', data),
  uploadImage: (section: string, file: File) => {
    const form = new FormData();
    form.append('image', file);
    return api.post(`/content/upload/${section}`, form);
  },
};

// ============================================
// FOUNDER
// ============================================
export const founderAPI = {
  get: () => api.get('/founder'),
  update: (data: object) => api.put('/founder', data),
  uploadImage: (file: File) => {
    const form = new FormData();
    form.append('image', file);
    return api.post('/founder/image', form);
  },
  deleteImage: () => api.delete('/founder/image'),
};

// ============================================
// PROJECTS
// ============================================
export const projectsAPI = {
  getAll: (featured?: boolean) =>
    api.get('/projects', { params: featured ? { featured: true } : {} }),
  getOne: (id: string) => api.get(`/projects/${id}`),
  create: (data: object) => api.post('/projects', data),
  update: (id: string, data: object) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  uploadMainImage: (id: string, file: File) => {
    const form = new FormData();
    form.append('image', file);
    return api.post(`/projects/${id}/main-image`, form);
  },
  uploadImage: (id: string, file: File) => {
    const form = new FormData();
    form.append('image', file);
    return api.post(`/projects/${id}/images`, form);
  },
  deleteImage: (id: string, publicId: string) =>
    api.delete(`/projects/${id}/images/${encodeURIComponent(publicId)}`),
  toggleFeature: (id: string) => api.put(`/projects/${id}/feature`),
};

// ============================================
// PRODUCTIONS
// ============================================
export const productionsAPI = {
  getAll: (featured?: boolean) =>
    api.get('/productions', { params: featured ? { featured: true } : {} }),
  getOne: (id: string) => api.get(`/productions/${id}`),
  create: (data: object) => api.post('/productions', data),
  update: (id: string, data: object) => api.put(`/productions/${id}`, data),
  delete: (id: string) => api.delete(`/productions/${id}`),
  uploadPoster: (id: string, file: File) => {
    const form = new FormData();
    form.append('image', file);
    return api.post(`/productions/${id}/poster`, form);
  },
  uploadMainImage: (id: string, file: File) => {
    const form = new FormData();
    form.append('image', file);
    return api.post(`/productions/${id}/main-image`, form);
  },
  uploadImage: (id: string, file: File) => {
    const form = new FormData();
    form.append('image', file);
    return api.post(`/productions/${id}/images`, form);
  },
  deleteImage: (id: string, publicId: string) =>
    api.delete(`/productions/${id}/images/${encodeURIComponent(publicId)}`),
  toggleFeature: (id: string) => api.put(`/productions/${id}/feature`),
};

// ============================================
// MEDIA
// ============================================
export const mediaAPI = {
  getAll: (category?: string) =>
    api.get('/media', { params: category ? { category } : {} }),
  upload: (file: File, category: string, alt?: string) => {
    const form = new FormData();
    form.append('image', file);
    form.append('category', category);
    if (alt) form.append('alt', alt);
    return api.post('/media', form);
  },
  delete: (id: string) => api.delete(`/media/${id}`),
};

// ============================================
// INQUIRIES
// ============================================
export const inquiriesAPI = {
  submit: (data: object) => api.post('/inquiries', data),
  getAll: (params?: object) => api.get('/inquiries', { params }),
  getOne: (id: string) => api.get(`/inquiries/${id}`),
  updateStatus: (id: string, status: string) =>
    api.put(`/inquiries/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/inquiries/${id}`),
  getStats: () => api.get('/inquiries/stats'),
};

// ============================================
// SETTINGS
// ============================================
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data: object) => api.put('/settings', data),
};

export default api;
