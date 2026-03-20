import axios from 'axios';
import { useAuthStore } from '@/stores';
import { formatErrorResponse } from '@/utils/formatErrorResponse';

const http = axios.create({
    timeout: 60000,
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

// Attach token dynamically
http.interceptors.request.use(
    (request) => {
        const authStore = useAuthStore();

        if (authStore.token) {
            request.headers = request.headers || {};
            request.headers.Authorization = `Bearer ${authStore.token}`;
        }

        return request;
    },
    (error) => Promise.reject(error)
);

// Global response handling
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore()

    // Timeout handling
    if (error.code === 'ECONNABORTED') {
      error = {
        response: {
          data: {
            type: 'error',
            message: 'Request timed out. Please try again.',
            errors: {}
          }
        }
      }
    }

    // Network error (no response)
    if (!error.response) {
      error = {
        response: {
          data: {
            type: 'error',
            message: 'Network error. Please check your internet connection.',
            errors: {}
          }
        }
      }
    }

    // Unauthorized handling
    if (error.response?.status === 401) {
      authStore.logout()
    }

    // Global formatting (single source of truth)
    const formattedError = formatErrorResponse(error)

    return Promise.reject(formattedError)
  }
)
export default http;