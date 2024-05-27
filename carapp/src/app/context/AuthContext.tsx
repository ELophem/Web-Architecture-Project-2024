'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  updateAuthState: (loggedIn: boolean) => void; // Function to update auth state
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    
    setIsLoggedIn(true);
    console.log('isLoggedIn:', isLoggedIn);
  };

  const logout = () => {
    // Perform logout logic
    setIsLoggedIn(false);
  };

  const updateAuthState = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};