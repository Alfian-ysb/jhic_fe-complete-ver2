// API Configuration
// Uses environment variables set during build time

const SABAQUIZ_API_URL = import.meta.env.VITE_SABAQUIZ_API_URL || 'http://localhost/api/sabaquiz';
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost/api/auth';

export const API_ENDPOINTS = {
  // Quiz endpoints
  quizzes: `${SABAQUIZ_API_URL}/quizzes`,
  quiz: (id: string) => `${SABAQUIZ_API_URL}/quizzes/${id}`,
  submitQuiz: (id: string) => `${SABAQUIZ_API_URL}/quizzes/${id}/submit`,
  
  // Leaderboard endpoints
  leaderboard: `${SABAQUIZ_API_URL}/leaderboard`,
  myStats: `${SABAQUIZ_API_URL}/my-stats`,
  
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
