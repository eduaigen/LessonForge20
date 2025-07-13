// This is a new file or has been significantly updated.
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  isSubscribed: boolean;
  login: () => void;
  logout: () => void;
  subscribe: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check sessionStorage to persist state across page reloads
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    const subscribedStatus = sessionStorage.getItem('isSubscribed') === 'true';
    setIsLoggedIn(loggedInStatus);
    setIsSubscribed(subscribedStatus);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsSubscribed(false);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isSubscribed');
  };

  const subscribe = () => {
    setIsSubscribed(true);
    if (!isLoggedIn) {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', 'true');
    }
    sessionStorage.setItem('isSubscribed', 'true');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isSubscribed, login, logout, subscribe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
