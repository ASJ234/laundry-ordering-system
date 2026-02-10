import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 - clear auth and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (name, email, phone, password) =>
    api.post('/auth/register', { name, email, phone, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

// Orders API (customer)
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
};


// Admin API
export const adminAPI = {
  getAllOrders: () => api.get('/admin/orders'),
  updateOrderStatus: (id, status) => api.put(`/admin/orders/${id}`, { status }),
  getStats: () => api.get('/admin/stats'),
  getNotifications: (params) => api.get('/admin/notifications', { params }),
  getUnreadNotificationCount: () => api.get('/admin/notifications/unread-count'),
  markNotificationRead: (id) => api.put(`/admin/notifications/${id}/read`),
  markAllNotificationsRead: () => api.put('/admin/notifications/read-all'),
};

export default api;
