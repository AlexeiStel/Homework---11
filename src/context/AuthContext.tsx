import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../features/database/db';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthState = async () => {
      const authData = await db.auth.get('auth');
      setIsAuthenticated(authData?.isAuthenticated ?? false);
    };
    fetchAuthState();
  }, []);

  const login = async (_username: string, _password: string) => {
    await db.auth.put({ id: 'auth', isAuthenticated: true });
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await db.auth.put({ id: 'auth', isAuthenticated: false });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
