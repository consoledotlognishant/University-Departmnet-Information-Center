import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { StorageService } from '../services/storageService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (usernameOrEmail: string, password?: string, roleOverride?: Role) => boolean;
  logout: () => void;
  switchRole: (role: Role) => void;
  updateCurrentUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'udis_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = (usernameOrEmail: string, _password?: string, roleOverride?: Role): boolean => {
    const users = StorageService.getUsers();
    const query = usernameOrEmail.trim().toLowerCase();

    // 1. Try finding by matching username or email
    let matchedUser = users.find(
      (u) => u.username.toLowerCase() === query || u.email.toLowerCase() === query
    );

    // If roleOverride specified or matched, verify or select sample
    if (!matchedUser) {
      if (roleOverride) {
        matchedUser = users.find((u) => u.role === roleOverride);
      } else if (query.includes('admin') || query.includes('hod')) {
        matchedUser = users.find((u) => u.role === 'admin');
      } else if (query.includes('faculty') || query.includes('prof')) {
        matchedUser = users.find((u) => u.role === 'faculty');
      } else if (query.includes('student') || /^\d+$/.test(query)) {
        matchedUser = users.find((u) => u.role === 'student');
      }
    }

    if (matchedUser) {
      const activeUser: User = {
        ...matchedUser,
        lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };
      setUser(activeUser);
      return true;
    }

    // Default fallback if unknown username entered: if role provided, sign in as that role demo
    if (roleOverride) {
      const fallback = users.find((u) => u.role === roleOverride) || users[0];
      setUser(fallback);
      return true;
    }

    return false;
  };

  const switchRole = (newRole: Role) => {
    const users = StorageService.getUsers();
    const targetUser = users.find((u) => u.role === newRole);
    if (targetUser) {
      setUser(targetUser);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateCurrentUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    StorageService.updateUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
