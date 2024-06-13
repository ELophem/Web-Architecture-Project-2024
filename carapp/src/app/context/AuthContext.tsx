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

// Create AuthContext with undefined default value
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //State for login status
  const [isAdmin, setIsAdmin] = useState(false); //State for admin status
  const router = useRouter(); //Next router for navigation

  useEffect(() => { //Retreive the tokend and admin status from localstorage
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    
    if (token) {
      //If token exists then update states accordingly
      setIsLoggedIn(true);
      setIsAdmin(adminStatus);
    }
    console.log(`User is ${isLoggedIn ? 'logged in' : 'logged out'}`);
  }, [isLoggedIn]);
  //User Login function
  const login = (token: string, adminStatus: boolean) => {
    localStorage.setItem('token', token); //Store token in local
    localStorage.setItem('isAdmin', String(adminStatus)); //Store admin status in local
    setIsLoggedIn(true); //Update login State
    setIsAdmin(adminStatus); //Update admin state
  };
  //User logout function
  const logout = () => {
    localStorage.removeItem('token'); //Remove tokeb abd admin status from local storage
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false); //Update login state
    setIsAdmin(false); //update admin state
    router.push('/login'); //Navigate to the login page
  };
  // The values that are provided to end users 
  const value: AuthContextValue = {
    isLoggedIn,
    isAdmin,
    login,
    logout
  };
 // The context provider rendered
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
//Hook to use the AuthContext 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
