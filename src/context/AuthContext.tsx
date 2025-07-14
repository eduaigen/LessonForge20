
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { modules } from '@/lib/modules-data';

interface AuthContextType {
  isLoggedIn: boolean;
  isSubscribed: boolean;
  subscriptions: string[];
  hasScienceSubscription: boolean;
  login: () => void;
  logout: () => void;
  subscribe: (priceIds: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    // Check sessionStorage to persist state across page reloads
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    const storedSubscriptions = sessionStorage.getItem('subscriptions');
    
    setIsLoggedIn(loggedInStatus);
    if (storedSubscriptions) {
        setSubscriptions(JSON.parse(storedSubscriptions));
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setSubscriptions([]);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('subscriptions');
  };

  const subscribe = (priceIds: string[]) => {
    setIsLoggedIn(true);
    setSubscriptions(priceIds);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('subscriptions', JSON.stringify(priceIds));
  };

  const isSubscribed = subscriptions.length > 0;

  const hasScienceSubscription = useMemo(() => {
    if (!isSubscribed) return false;
    const scienceModuleIds = modules.science.map(m => m.id);
    return subscriptions.some(subId => scienceModuleIds.includes(subId));
  }, [subscriptions, isSubscribed]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isSubscribed, subscriptions, hasScienceSubscription, login, logout, subscribe }}>
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
