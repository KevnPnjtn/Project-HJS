import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000, 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json", 
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('🔑 [API] Request with token:', token ? 'Yes' : 'No');
    return config;
  },
  (error) => {
    console.error('❌ [API] Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('🚫 [API] Unauthorized - Clearing auth data');
      
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("emailVerified");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("emailVerified");
      
      if (!window.location.pathname.includes('/login')) {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  } 
);

export default api;