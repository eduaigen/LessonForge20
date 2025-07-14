
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { modules } from '@/lib/modules-data';

const ADMIN_EMAIL = 'admin@eduaigen.org';

interface User {
    name: string | null;
    email: string | null;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isSubscribed: boolean;
  user: User | null;
  subscriptions: string[];
  hasScienceSubscription: boolean;
  login: (userInfo: { email: string; name?: string }) => void;
  logout: () => void;
  subscribe: (priceIds: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    // Check sessionStorage to persist state across page reloads
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
    const storedUser = sessionStorage.getItem('user');
    const storedSubscriptions = sessionStorage.getItem('subscriptions');
    
    setIsLoggedIn(loggedInStatus);
    setIsAdmin(adminStatus);
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
    if (storedSubscriptions) {
        setSubscriptions(JSON.parse(storedSubscriptions));
    }
  }, []);

  const login = ({ email, name }: { email: string; name?: string }) => {
    const isAdminUser = email.toLowerCase() === ADMIN_EMAIL;
    const userName = name || (isAdminUser ? 'Admin' : email.split('@')[0]);
    
    const currentUser: User = { name: userName, email };

    setIsLoggedIn(true);
    setIsAdmin(isAdminUser);
    setUser(currentUser);
    
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('user', JSON.stringify(currentUser));
    if (isAdminUser) {
        sessionStorage.setItem('isAdmin', 'true');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setSubscriptions([]);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('user');
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
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, isSubscribed, subscriptions, hasScienceSubscription, login, logout, subscribe }}>
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

    