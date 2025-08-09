'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const userData = localStorage.getItem('user-data');

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setIsReady(true);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    if (email === 'admin@example.com' && password === 'admin123') {
      const userData = {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin' as const,
      };

      localStorage.setItem('auth-token', 'mock-token-123');
      localStorage.setItem('user-data', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } else if (email === 'editor@example.com' && password === 'editor123') {
      const userData = {
        id: '2',
        name: 'Editor User',
        email: 'editor@example.com',
        role: 'editor' as const,
      };

      localStorage.setItem('auth-token', 'mock-token-456');
      localStorage.setItem('user-data', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-data');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isReady, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
