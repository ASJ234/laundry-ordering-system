import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAdmin(storedIsAdmin === 'true');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login(email, password);
      const userData = data.user;
      const isAdminUser = userData.role === 'admin';
      setUser(userData);
      setIsAdmin(isAdminUser);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', String(isAdminUser));
      return { success: true, user: userData };
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid credentials';
      return { success: false, message };
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const { data } = await authAPI.login(email, password);
      if (data.user.role !== 'admin') {
        return { success: false, message: 'Access denied. Admin credentials required.' };
      }
      const userData = data.user;
      setUser(userData);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', 'true');
      return { success: true, user: userData };
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid credentials';
      return { success: false, message };
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const { data } = await authAPI.register(name, email, phone, password);
      const userData = data.user;
      setUser(userData);
      setIsAdmin(false);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', 'false');
      return { success: true, user: userData };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    adminLogin,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
