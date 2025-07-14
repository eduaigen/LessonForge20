
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { modules } from '@/lib/modules-data';

const ADMIN_EMAIL = 'admin@eduaigen.org';

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isSubscribed: boolean;
  subscriptions: string[];
  hasScienceSubscription: boolean;
  login: (email: string) => void;
  logout: () => void;
  subscribe: (priceIds: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    // Check sessionStorage to persist state across page reloads
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
    const storedSubscriptions = sessionStorage.getItem('subscriptions');
    
    setIsLoggedIn(loggedInStatus);
    setIsAdmin(adminStatus);
    if (storedSubscriptions) {
        setSubscriptions(JSON.parse(storedSubscriptions));
    }
  }, []);

  const login = (email: string) => {
    const isAdminUser = email.toLowerCase() === ADMIN_EMAIL;
    setIsLoggedIn(true);
    setIsAdmin(isAdminUser);
    sessionStorage.setItem('isLoggedIn', 'true');
    if (isAdminUser) {
        sessionStorage.setItem('isAdmin', 'true');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setSubscriptions([]);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('subscriptions');
  };

  const subscribe = (priceIds: string[]) => {
    setIsLoggedIn(true); // A user must be logged in to subscribe
    setSubscriptions(priceIds);
    sessionStorage.setItem('subscriptions', JSON.stringify(priceIds));
  };

  const isSubscribed = isAdmin || subscriptions.length > 0;

  const hasScienceSubscription = useMemo(() => {
    if (isAdmin) return true;
    if (!isSubscribed) return false;
    const scienceModuleIds = modules.science.map(m => m.id);
    return subscriptions.some(subId => scienceModuleIds.includes(subId));
  }, [subscriptions, isSubscribed, isAdmin]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, isSubscribed, subscriptions, hasScienceSubscription, login, logout, subscribe }}>
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
