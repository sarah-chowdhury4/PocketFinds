import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

const api = axios.create({
  baseURL: API_BASE_URL
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// User APIs
export const userAPI = {
  login: (email, password) => api.post('/api/user/login', { email, password }),
  signup: (userData) => api.post('/api/user/signup', userData),
  getProfile: () => api.get('/api/user/profile'),
  updateProfile: (data) => api.put('/api/user/profile', data)
}

// Stall APIs
export const stallAPI = {
  create: (formData) => api.post('/api/stall/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (stallId) => api.delete(`/api/stall/${stallId}`)
}

// Menu/Item APIs
export const menuAPI = {
  getMenu: (stallId) => api.get(`/api/menu/${stallId}`),
  createItem: (itemData) => api.post('/api/menu', itemData),
  updateItem: (itemId, itemData) => api.put(`/api/menu/${itemId}`, itemData),
  deleteItem: (itemId) => api.delete(`/api/menu/${itemId}`)
}

// Dashboard APIs
export const dashboardAPI = {
  getAdminDashboard: () => api.get('/api/dashboard/admin'),
  getCustomerDashboard: () => api.get('/api/dashboard/customer'),
  getStallOwnerDashboard: () => api.get('/api/dashboard/stall-owner')
}

// Notification APIs
export const notificationAPI = {
  getNotifications: () => api.get('/api/notifications'),
  markAsRead: (notificationId) => api.put(`/api/notifications/${notificationId}/read`)
}

// Bookmark APIs
export const bookmarkAPI = {
  getBookmarks: () => api.get('/api/bookmarks'),
  addBookmark: (stallId) => api.post('/api/bookmarks', { stallId }),
  removeBookmark: (stallId) => api.delete(`/api/bookmarks/${stallId}`)
}

export default api
