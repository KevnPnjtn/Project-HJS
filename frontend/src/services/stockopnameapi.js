import api from './api';
import { cache as productCache } from './productapi';

const cache = {
  data: new Map(),
  timestamps: new Map(),
  TTL: 2 * 60 * 1000,

  set(key, value) {
    this.data.set(key, value);
    this.timestamps.set(key, Date.now());
  },

  get(key) {
    const timestamp = this.timestamps.get(key);
    if (!timestamp) return null;
    const age = Date.now() - timestamp;
    if (age > this.TTL) {
      this.data.delete(key);
      this.timestamps.delete(key);
      return null;
    }
    return this.data.get(key);
  },

  invalidate(pattern) {
    if (pattern === '*') {
      this.data.clear();
      this.timestamps.clear();
    } else {
      for (const key of this.data.keys()) {
        if (key.includes(pattern)) {
          this.data.delete(key);
          this.timestamps.delete(key);
        }
      }
    }
  }
};

const pendingRequests = new Map();

const dedupedRequest = async (key, requestFn) => {
  if (pendingRequests.has(key)) return pendingRequests.get(key);
  const promise = requestFn().finally(() => pendingRequests.delete(key));
  pendingRequests.set(key, promise);
  return promise;
};

export const stockopnameapi = {
  getAll: async (params = {}) => {
    const cacheKey = `opnames:all:${JSON.stringify(params)}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const data = await dedupedRequest(cacheKey, async () => {
      const response = await api.get('/dev/stock-opnames', { params });
      return response.data;
    });

    cache.set(cacheKey, data);
    return data;
  },

  getById: async (id) => {
    const cacheKey = `opnames:${id}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const data = await dedupedRequest(cacheKey, async () => {
      const response = await api.get(`/dev/stock-opnames/${id}`);
      return response.data;
    });

    cache.set(cacheKey, data);
    return data;
  },

  create: async (opnameData) => {
    const response = await api.post('/dev/stock-opnames', opnameData);
    cache.invalidate('opnames:');
    productCache.invalidate('products:');
    return response.data;
  },

  adjustStock: async (id) => {
    const response = await api.post(`/dev/stock-opnames/${id}/adjust`);
    cache.invalidate('opnames:');
    productCache.invalidate('products:');
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/dev/stock-opnames/${id}`);
    cache.invalidate('opnames:');
    return response.data;
  },

  getByProduct: async (productId) => {
    const cacheKey = `opnames:product:${productId}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const data = await dedupedRequest(cacheKey, async () => {
      const response = await api.get(`/dev/stock-opnames/product/${productId}`);
      return response.data;
    });

    cache.set(cacheKey, data);
    return data;
  },

  getSummary: async (params = {}) => {
    const cacheKey = `opnames:summary:${JSON.stringify(params)}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const data = await dedupedRequest(cacheKey, async () => {
      const response = await api.get('/dev/stock-opnames/summary/all', { params });
      return response.data;
    });

    cache.set(cacheKey, data);
    return data;
  },

  clearCache: () => cache.invalidate('*')
};