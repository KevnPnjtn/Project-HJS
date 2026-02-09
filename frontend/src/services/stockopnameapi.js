import api from './api';

export const stockopnameapi = {
  getAll: async (params = {}) => {
    const response = await api.get('/dev/stock-opnames', {
      params,
      headers: {
        'Cache-Control': 'max-age=300'
      }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/dev/stock-opnames/${id}`);
    return response.data;
  },

  create: async (opnameData) => {
    const response = await api.post('/dev/stock-opnames', opnameData);
    localStorage.removeItem('opnames_cache');
    return response.data;
  },

  adjustStock: async (id) => {
    const response = await api.post(`/dev/stock-opnames/${id}/adjust`);
    localStorage.removeItem('opnames_cache');
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/dev/stock-opnames/${id}`);
    localStorage.removeItem('opnames_cache');
    return response.data;
  },

  getByProduct: async (productId) => {
    const response = await api.get(`/dev/stock-opnames/product/${productId}`);
    return response.data;
  },

  getSummary: async (params = {}) => {
    const response = await api.get('/dev/stock-opnames/summary/all', { params });
    return response.data;
  }
};