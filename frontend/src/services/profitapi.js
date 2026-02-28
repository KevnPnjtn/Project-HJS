import api from './api';

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
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }

  const promise = requestFn()
    .finally(() => {
      pendingRequests.delete(key);
    });

  pendingRequests.set(key, promise);
  return promise;
};

export const profitapi = {
  getAll: async (params = {}) => {
    const cacheKey = `profit:all:${JSON.stringify(params)}`;

    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const data = await dedupedRequest(cacheKey, async () => {
      const response = await api.get('/dev/profit-reports', { params });
      return response.data;
    });

    cache.set(cacheKey, data);
    return data;
  },

  getById: async (id) => {
    const cacheKey = `profit:${id}`;

    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const data = await dedupedRequest(cacheKey, async () => {
      const response = await api.get(`/dev/profit-reports/${id}`);
      return response.data;
    });

    cache.set(cacheKey, data);
    return data;
  },

  generate: async (reportData) => {
    const response = await api.post('/dev/profit-reports/generate', reportData);
    cache.invalidate('profit:');
    return response.data;
  },

  generateDaily: async (date) => {
    const response = await api.post('/dev/profit-reports/generate/daily', { date });
    cache.invalidate('profit:');
    return response.data;
  },

  generateWeekly: async (date) => {
    const response = await api.post('/dev/profit-reports/generate/weekly', { date });
    cache.invalidate('profit:');
    return response.data;
  },

  generateMonthly: async (date) => {
    const response = await api.post('/dev/profit-reports/generate/monthly', { date });
    cache.invalidate('profit:');
    return response.data;
  },

  getSummary: async (params = {}) => {
    const cacheKey = `profit:summary:${JSON.stringify(params)}`;

    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const data = await dedupedRequest(cacheKey, async () => {
      const response = await api.get('/dev/profit-reports/summary/all', { params });
      return response.data;
    });

    cache.set(cacheKey, data);
    return data;
  },

  delete: async (id) => {
    const response = await api.delete(`/dev/profit-reports/${id}`);
    cache.invalidate('profit:');
    return response.data;
  },

  clearCache: () => {
    cache.invalidate('*');
  }
};