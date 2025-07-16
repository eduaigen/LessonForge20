
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { modules } from '@/lib/modules-data';
import type { GeneratedContent } from '@/components/generators/NVBiologyGenerator';

const ADMIN_EMAIL = 'admin@eduaigen.org';
const MAX_HISTORY_LENGTH = 20;

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
  hasMathSubscription: boolean;
  hasELASubscription: boolean;
  hasSocialStudiesSubscription: boolean;
  hasELLSubscription: boolean;
  generationHistory: GeneratedContent[][];
  addToHistory: (newPackage: GeneratedContent[]) => void;
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
  const [generationHistory, setGenerationHistory] = useState<GeneratedContent[][]>([]);

  useEffect(() => {
    try {
        const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
        const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
        const storedUser = sessionStorage.getItem('user');
        const storedSubscriptions = sessionStorage.getItem('subscriptions');
        const storedHistory = sessionStorage.getItem('generationHistory');
        
        setIsLoggedIn(loggedInStatus);
        setIsAdmin(adminStatus);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedSubscriptions) {
            setSubscriptions(JSON.parse(storedSubscriptions));
        }
        if (storedHistory) {
            setGenerationHistory(JSON.parse(storedHistory));
        }
    } catch (error) {
        console.error("Error reading from session storage:", error);
        // Clear potentially corrupted storage
        sessionStorage.clear();
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
    setGenerationHistory([]);
    sessionStorage.clear();
  };

  const subscribe = (priceIds: string[]) => {
    setIsLoggedIn(true); // A user must be logged in to subscribe
    setSubscriptions(priceIds);
    sessionStorage.setItem('subscriptions', JSON.stringify(priceIds));
  };
  
  const addToHistory = useCallback((newPackage: GeneratedContent[]) => {
    setGenerationHistory(prevHistory => {
        const updatedHistory = [newPackage, ...prevHistory];
        if (updatedHistory.length > MAX_HISTORY_LENGTH) {
            updatedHistory.pop();
        }
        sessionStorage.setItem('generationHistory', JSON.stringify(updatedHistory));
        return updatedHistory;
    });
  }, []);

  const isSubscribed = isAdmin || subscriptions.length > 0;

  const hasScienceSubscription = useMemo(() => {
    if (isAdmin) return true;
    if (!isSubscribed) return false;
    const scienceModuleIds = modules.science.map(m => m.id);
    return subscriptions.some(subId => scienceModuleIds.includes(subId));
  }, [subscriptions, isSubscribed, isAdmin]);

  const hasMathSubscription = useMemo(() => {
    if (isAdmin) return true;
    if (!isSubscribed) return false;
    const mathModuleIds = modules.math.map(m => m.id);
    return subscriptions.some(subId => mathModuleIds.includes(subId));
  }, [subscriptions, isSubscribed, isAdmin]);

  const hasELASubscription = useMemo(() => {
    if (isAdmin) return true;
    if (!isSubscribed) return false;
    const elaModuleIds = modules.ela.map(m => m.id);
    return subscriptions.some(subId => elaModuleIds.includes(subId));
  }, [subscriptions, isSubscribed, isAdmin]);

  const hasSocialStudiesSubscription = useMemo(() => {
    if (isAdmin) return true;
    if (!isSubscribed) return false;
    const socialStudiesModuleIds = modules.social.map(m => m.id);
    return subscriptions.some(subId => socialStudiesModuleIds.includes(subId));
  }, [subscriptions, isSubscribed, isAdmin]);

  const hasELLSubscription = useMemo(() => {
    if (isAdmin) return true;
    if (!isSubscribed) return false;
    const ellModuleIds = modules.ell.map(m => m.id);
    return subscriptions.some(subId => ellModuleIds.includes(subId));
  }, [subscriptions, isSubscribed, isAdmin]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, isSubscribed, subscriptions, hasScienceSubscription, hasMathSubscription, hasELASubscription, hasSocialStudiesSubscription, hasELLSubscription, generationHistory, addToHistory, login, logout, subscribe }}>
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
