// API Configuration
// Uses environment variables set during build time

const API_BASE_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost/api/auth';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,
  logout: `${API_BASE_URL}/logout`,
  me: `${API_BASE_URL}/me`,
};

// Helper function for API calls
export const apiCall = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include', // Include cookies
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response;
};
