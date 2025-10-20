// src/utils/authUtils.ts
const authUtils = {
  // Get cached user (localStorage)
  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Set cached user (after login)
  setAuth: (_token: string | null, user?: any) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  // Clear auth (logout)
  logout: () => {
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  },

  // Headers for API requests (cookies sent automatically)
  getAuthHeaders: () => ({
    'Content-Type': 'application/json',
    // No Authorization header needed if backend uses HTTP-only cookie
  }),
};

export default authUtils;
