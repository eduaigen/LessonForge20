
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import type { GeneratedContent as LessonPackageContent } from '@/components/generators/NVBiologyGenerator';
import type { TestGeneratedContent } from '@/components/generators/NVBiologyTestGenerator';

type GeneratedContent = LessonPackageContent | TestGeneratedContent;


const ADMIN_EMAIL = 'admin@eduaigen.org';
const MAX_HISTORY_LENGTH = 20;

const ALL_PRICE_IDS = [
    'price_1PgWqMRpWk9d9d2F1zJ4d5fG', 'price_1PgWrERpWk9d9d2Fn8Y9a7bC', 'price_1PgWrSRpWk9d9d2F5fE6g7hJ',
    'price_1PgWreRpWk9d9d2FhK8d9e0F', 'price_1PgWrrRpWk9d9d2FpL6m7n8O', 'price_1PgWs9RpWk9d9d2FqR5s6t7U',
    'price_1PgWsTRpWk9d9d2FvW4x5y6Z', 'price_1PgWshRpWk9d9d2FaB3c4d5E', 'price_1PgWsrRpWk9d9d2FfG2h3i4J',
    'price_1PgWtARpWk9d9d2FkL1m2n3O', 'price_1PgWtORpWk9d9d2FpQ0r1s2T', 'price_1PgWtZRpWk9d9d2FuV9w8x9Y',
    'price_1PgWtnRpWk9d9d2Fz0a1b2c3', 'price_1PgWuBRpWk9d9d2Fd4e5f6g7', 'price_1PgWuORpWk9d9d2Fh8i9j0k1',
    'price_1PgWuXRpWk9d9d2Fl2m3n4o5', 'price_1PgWupRpWk9d9d2Fp6q7r8s9', 'price_1PgWv3RpWk9d9d2Ft0u1v2w3',
    'price_1PgWvGRpWk9d9d2Fx4y5z6a7', 'price_1PgWvURpWk9d9d2Fb8c9d0e1'
];

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
    const newSubscriptions = priceIds.length > 0 ? priceIds : ALL_PRICE_IDS;
    setSubscriptions(newSubscriptions);
    sessionStorage.setItem('subscriptions', JSON.stringify(newSubscriptions));
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

  const hasScienceSubscription = useMemo(() => isSubscribed, [isSubscribed]);
  const hasMathSubscription = useMemo(() => isSubscribed, [isSubscribed]);
  const hasELASubscription = useMemo(() => isSubscribed, [isSubscribed]);
  const hasSocialStudiesSubscription = useMemo(() => isSubscribed, [isSubscribed]);
  const hasELLSubscription = useMemo(() => isSubscribed, [isSubscribed]);

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
