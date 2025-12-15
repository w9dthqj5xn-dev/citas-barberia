import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para añadir el token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (email, password, name, phone) =>
    api.post('/auth/register', { email, password, name, phone }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (name, phone) =>
    api.put('/users/profile', { name, phone }),
};

export const barberService = {
  getAll: () => api.get('/barbers'),
  getById: (id) => api.get(`/barbers/${id}`),
  create: (name, specialty, phone, email) =>
    api.post('/barbers', { name, specialty, phone, email }),
  update: (id, name, specialty, phone, email) =>
    api.put(`/barbers/${id}`, { name, specialty, phone, email }),
  deactivate: (id) => api.delete(`/barbers/${id}`),
};

export const appointmentService = {
  create: (barberId, appointmentDate, appointmentTime, serviceType) =>
    api.post('/appointments', { barberId, appointmentDate, appointmentTime, serviceType }),
  getMyAppointments: () => api.get('/appointments/my-appointments'),
  getBarberAppointments: () => api.get('/appointments/barber-appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  cancel: (id) => api.delete(`/appointments/${id}`),
  updateStatus: (id, status) => api.put(`/appointments/${id}/status`, { status }),
  getAvailableSlots: (barberId, date) =>
    api.get('/appointments/available-slots', { params: { barberId, date } }),
};

export default api;
