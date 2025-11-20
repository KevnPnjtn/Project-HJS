// src/services/productapi.js
import api from './api';

export const productapi = {
  // Get all products with filters
  getAll: async (params = {}) => {
    const response = await api.get('/dev/products', { params });
    return response.data;
  },

  // Get single product by ID
  getById: async (id) => {
    const response = await api.get(`/dev/products/${id}`);
    return response.data;
  },

  // Create new product
  create: async (productData) => {
    const response = await api.post('/dev/products', productData);
    return response.data;
  },

  // Update product
  update: async (id, productData) => {
    const response = await api.put(`/dev/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  delete: async (id) => {
    const response = await api.delete(`/dev/products/${id}`);
    return response.data;
  },

  // Scan QR Code
  scanQr: async (qrData) => {
    const response = await api.post('/dev/products/scan-qr', qrData);
    return response.data;
  },
};