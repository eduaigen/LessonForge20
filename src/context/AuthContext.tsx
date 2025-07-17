
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import type { GeneratedContent as LessonPackageContent } from '@/components/generators/NVBiologyGenerator';
import type { TestGeneratedContent } from '@/components/generators/NVBiologyTestGenerator';
import { allModules } from '@/lib/modules-data';
import { useRouter } from 'next/navigation';

type GeneratedContent = LessonPackageContent | TestGeneratedContent;

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
  hasPremiumTools: boolean;
  generationHistory: GeneratedContent[][];
  addToHistory: (newPackage: GeneratedContent[]) => void;
  login: (userInfo: { email: string; name?: string }) => void;
  logout: () => void;
  subscribe: (priceIds: string[]) => void;
  showDisclaimer: boolean;
  setShowDisclaimer: React.Dispatch<React.SetStateAction<boolean>>;
  agreeToDisclaimer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [generationHistory, setGenerationHistory] = useState<GeneratedContent[][]>([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
        const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
        const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
        const agreedToDisclaimer = localStorage.getItem('agreedToDisclaimer') === 'true';
        const shouldShowDisclaimer = sessionStorage.getItem('showDisclaimer') === 'true';
        
        const storedUser = sessionStorage.getItem('user');
        const storedSubscriptions = sessionStorage.getItem('subscriptions');
        const storedHistory = sessionStorage.getItem('generationHistory');
        
        if (loggedInStatus) setIsLoggedIn(true);
        if (adminStatus) setIsAdmin(true);
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedSubscriptions) setSubscriptions(JSON.parse(storedSubscriptions));
        if (storedHistory) setGenerationHistory(JSON.parse(storedHistory));

        if (loggedInStatus && shouldShowDisclaimer && !agreedToDisclaimer) {
            setShowDisclaimer(true);
        }

    } catch (error) {
        console.error("Error reading from session storage:", error);
        sessionStorage.clear();
        localStorage.clear();
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
        // Admins get all access
        const allPriceIds = [...allModules.courses.map(c => c.id), ...allModules.tools.map(t => t.id)];
        setSubscriptions(allPriceIds);
        sessionStorage.setItem('subscriptions', JSON.stringify(allPriceIds));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setSubscriptions([]);
    setGenerationHistory([]);
    sessionStorage.clear();
    // Keep disclaimer agreement in localStorage
  };

  const subscribe = (priceIds: string[]) => {
    setIsLoggedIn(true); // A user must be logged in to subscribe
    setSubscriptions(prev => {
        const newSubscriptions = [...new Set([...prev, ...priceIds])];
        sessionStorage.setItem('subscriptions', JSON.stringify(newSubscriptions));
        return newSubscriptions;
    });
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

  const agreeToDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem('agreedToDisclaimer', 'true');
    sessionStorage.removeItem('showDisclaimer');
    router.push('/auth-dashboard');
  };

  const isSubscribed = isAdmin || subscriptions.length > 0;
  
  const hasSubscriptionFor = (subject: string): boolean => {
      if (isAdmin) return true;
      const subjectCourses = allModules.coursesBySubject[subject] || [];
      return subjectCourses.some(course => subscriptions.includes(course.id));
  };

  const hasToolSubscription = (toolId: string): boolean => {
      if (isAdmin) return true;
      return subscriptions.includes(toolId);
  }

  const hasScienceSubscription = useMemo(() => hasSubscriptionFor('science'), [subscriptions, isAdmin]);
  const hasMathSubscription = useMemo(() => hasSubscriptionFor('math'), [subscriptions, isAdmin]);
  const hasELASubscription = useMemo(() => hasSubscriptionFor('ela'), [subscriptions, isAdmin]);
  const hasSocialStudiesSubscription = useMemo(() => hasSubscriptionFor('social studies'), [subscriptions, isAdmin]);
  const hasELLSubscription = useMemo(() => hasSubscriptionFor('ell'), [subscriptions, isAdmin]);

  const hasPremiumTools = useMemo(() => {
      if(isAdmin) return true;
      return allModules.tools.some(tool => subscriptions.includes(tool.id));
  }, [subscriptions, isAdmin]);


  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, isSubscribed, subscriptions, hasScienceSubscription, hasMathSubscription, hasELASubscription, hasSocialStudiesSubscription, hasELLSubscription, hasPremiumTools, generationHistory, addToHistory, login, logout, subscribe, showDisclaimer, setShowDisclaimer, agreeToDisclaimer }}>
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
