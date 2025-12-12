import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../services/authService';
import { setAuthToken } from '../services/api';

interface User {
  id?: string;
  email: string;
  name?: string;
  phone?: string;
  isActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al montar si hay token
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          console.log('[AuthContext] Token found, attempting to fetch profile...');
          setAuthToken(token); // Ensure token is set in axios headers BEFORE fetching profile
          const { user: userData } = await getProfile();
          console.log('[AuthContext] Profile fetched successfully:', userData);
          setUser(userData);
        } catch (error) {
          console.error('[AuthContext] Error fetching user profile:', error);
          // Token inválido o expirado, limpiar
          localStorage.removeItem('auth_token');
          setAuthToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData: User, token: string) => {
    console.log('[AuthContext] Logging in user:', userData.email);
    // Set token in axios headers FIRST
    setAuthToken(token);
    // Then save to localStorage
    localStorage.setItem('auth_token', token);
    // Finally update user state
    setUser(userData);
    console.log('[AuthContext] User logged in successfully');
  };

  const logout = () => {
    console.log('[AuthContext] Logging out user');
    setAuthToken(null); // Clear token from axios headers
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const refreshUser = async () => {
    try {
      console.log('[AuthContext] Refreshing user profile...');
      const { user: userData } = await getProfile();
      setUser(userData);
      console.log('[AuthContext] User profile refreshed:', userData);
    } catch (error) {
      console.error('[AuthContext] Error refreshing user:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
