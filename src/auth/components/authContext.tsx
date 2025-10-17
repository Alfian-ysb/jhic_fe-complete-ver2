// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import authUtils from './authUtils';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (user: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Load cached user if exists
    const cachedUser = authUtils.getUser();
    if (cachedUser) {
      setUser(cachedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    authUtils.setAuth(null, userData); // token handled by cookie
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    authUtils.logout();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
