'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (token: string, adminStatus: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(adminStatus);
    }
    console.log(`User is ${isLoggedIn ? 'logged in' : 'logged out'}`);
  }, [isLoggedIn]);

  const login = (token: string, adminStatus: boolean) => {
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', String(adminStatus));
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push('/login');
  };

  const value: AuthContextValue = {
    isLoggedIn,
    isAdmin,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
