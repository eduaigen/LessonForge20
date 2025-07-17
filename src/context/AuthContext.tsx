
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import type { GeneratedContent as LessonPackageContent } from '@/components/generators/NVBiologyGenerator';
import type { TestGeneratedContent } from '@/components/generators/NVBiologyTestGenerator';
import { allModules } from '@/lib/modules-data';
import { useRouter } from 'next/navigation';

type GeneratedContent = LessonPackageContent | TestGeneratedContent;

const ADMIN_EMAIL = 'admin@eduaigen.org';
const MAX_HISTORY_LENGTH = 20;

interface User {
    name: string | null;
    email: string;
    isVerified: boolean;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isSubscribed: boolean;
  user: User | null;
  users: User[];
  subscriptions: string[];
  hasScienceSubscription: boolean;
  hasMathSubscription: boolean;
  hasELASubscription: boolean;
  hasSocialStudiesSubscription: boolean;
  hasELLSubscription: boolean;
  hasPremiumTools: boolean;
  generationHistory: GeneratedContent[][];
  addToHistory: (newPackage: GeneratedContent[]) => void;
  signup: (userInfo: { email: string; name?: string }) => void;
  verifyUser: (email: string) => void;
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
  const [users, setUsers] = useState<User[]>([]); // To simulate a user database
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
        const storedUsers = sessionStorage.getItem('users');
        const storedSubscriptions = sessionStorage.getItem('subscriptions');
        const storedHistory = sessionStorage.getItem('generationHistory');
        
        if (loggedInStatus) setIsLoggedIn(true);
        if (adminStatus) setIsAdmin(true);
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedUsers) setUsers(JSON.parse(storedUsers));
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

  const signup = ({ email, name }: { email: string; name?: string }) => {
    const newUser: User = { name: name || email.split('@')[0], email, isVerified: false };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    sessionStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const verifyUser = (email: string) => {
    const updatedUsers = users.map(u => u.email === email ? { ...u, isVerified: true } : u);
    setUsers(updatedUsers);
    sessionStorage.setItem('users', JSON.stringify(updatedUsers));
  };


  const login = ({ email, name }: { email: string; name?: string }) => {
    const isAdminUser = email.toLowerCase() === ADMIN_EMAIL;
    const existingUser = users.find(u => u.email === email);

    const currentUser: User = { 
        name: name || existingUser?.name || email.split('@')[0], 
        email,
        isVerified: existingUser?.isVerified || isAdminUser
    };

    setIsLoggedIn(true);
    setIsAdmin(isAdminUser);
    setUser(currentUser);
    
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('user', JSON.stringify(currentUser));
    if (isAdminUser) {
        sessionStorage.setItem('isAdmin', 'true');
        const allPriceIds = [...allModules.courses.map(c => c.id), ...allModules.assessment_tools.map(t => t.id), ...allModules.premium_tools.map(t => t.id)];
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
  };

  const subscribe = (priceIds: string[]) => {
    setIsLoggedIn(true);
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
  
  const hasSubscriptionFor = useCallback((subject: string): boolean => {
      if (isAdmin) return true;
      const subjectCourses = allModules.coursesBySubject?.[subject] || [];
      return subjectCourses.some(course => subscriptions.includes(course.id));
  }, [isAdmin, subscriptions]);

  const hasToolSubscription = useCallback((toolId: string): boolean => {
      if (isAdmin) return true;
      return subscriptions.includes(toolId);
  }, [isAdmin, subscriptions]);

  const hasScienceSubscription = useMemo(() => hasSubscriptionFor('science'), [hasSubscriptionFor]);
  const hasMathSubscription = useMemo(() => hasSubscriptionFor('math'), [hasSubscriptionFor]);
  const hasELASubscription = useMemo(() => hasSubscriptionFor('ela'), [hasSubscriptionFor]);
  const hasSocialStudiesSubscription = useMemo(() => hasSubscriptionFor('social studies'), [hasSubscriptionFor]);
  const hasELLSubscription = useMemo(() => hasSubscriptionFor('ell'), [hasSubscriptionFor]);

  const hasPremiumTools = useMemo(() => {
      if(isAdmin) return true;
      return allModules.premium_tools.some(tool => subscriptions.includes(tool.id));
  }, [subscriptions, isAdmin]);


  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, users, isSubscribed, subscriptions, hasScienceSubscription, hasMathSubscription, hasELASubscription, hasSocialStudiesSubscription, hasELLSubscription, hasPremiumTools, generationHistory, addToHistory, signup, verifyUser, login, logout, subscribe, showDisclaimer, setShowDisclaimer, agreeToDisclaimer }}>
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
