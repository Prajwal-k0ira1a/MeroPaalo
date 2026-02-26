import axios from 'axios';

// The hosted backend URL from Render
const BASE_URL = 'https://clashathon-thefrictionfixers-meropaalo.onrender.com/api';

/**
 * Simple Axios Instance
 * This allows us to set a common base URL and other configurations
 * for all our API calls.
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Needed if your backend uses cookies for auth
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * This runs before every request is sent.
 * You can use this to add auth tokens to headers.
 */
apiClient.interceptors.request.use(
  (config) => {
    // For example, if you store a token in localStorage:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * This runs after every response is received.
 * Great for centralizing error handling.
 */
apiClient.interceptors.response.use(
  (response) => {
    // Just return the data part of the response for simplicity in components
    return response.data;
  },
  (error) => {
    // Centralized error logging or alerts
    console.error('API Error:', error.response?.data?.message || error.message);
    
    // You could handle specific status codes here (e.g., 401 for logout)
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
    }

    return Promise.reject(error);
  }
);

export default apiClient;
