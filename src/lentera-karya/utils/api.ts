// API Configuration
// Uses environment variables set during build time

const LENTERA_API_URL = import.meta.env.VITE_LENTERA_KARYA_API_URL || 'http://localhost/api/lentera';
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost/api/auth';

export const API_ENDPOINTS = {
  // Karya endpoints
  karya: `${LENTERA_API_URL}/karya`,
  karyaById: (id: string) => `${LENTERA_API_URL}/karya/${id}`,
  karyaApprove: (id: string) => `${LENTERA_API_URL}/karya/${id}/approve`,
  karyaReject: (id: string) => `${LENTERA_API_URL}/karya/${id}/reject`,
  
  // Category endpoints
  categories: `${LENTERA_API_URL}/categories`,
  
  // Auth endpoints
  login: `${AUTH_API_URL}/login`,
  register: `${AUTH_API_URL}/register`,
};

// Helper function for authenticated API calls
export const apiCall = async (endpoint: string, options?: RequestInit) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (response.status === 401) {
    // Token expired or invalid, redirect to login
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response;
};
