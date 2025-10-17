// API Configuration
// Uses environment variables set during build time

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost';

export const API_ENDPOINTS = {
  // Add your API endpoints here as needed
};

// Helper function for API calls
export const apiCall = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response;
};
