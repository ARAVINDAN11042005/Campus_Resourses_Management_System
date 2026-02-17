import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const resourceService = {
    getAll: () => api.get('/resources'),
    getById: (id) => api.get(`/resources/${id}`),
    create: (data) => api.post('/resources', data),
    update: (id, data) => api.put(`/resources/${id}`, data),
    delete: (id) => api.delete(`/resources/${id}`),
};

export const studentService = {
    getAll: () => api.get('/students'),
    getById: (id) => api.get(`/students/${id}`),
    create: (data) => api.post('/students', data),
    update: (id, data) => api.put(`/students/${id}`, data),
    delete: (id) => api.delete(`/students/${id}`),
};

export const issuanceService = {
    getAll: () => api.get('/issuances'),
    issue: (data) => api.post('/issuances/issue', data),
    returnResource: (id) => api.put(`/issuances/return/${id}`),
};

export default api;
