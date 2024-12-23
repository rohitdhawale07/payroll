import React, { createContext, useContext, useState } from 'react';

// Create a context with a default value
const AuthContext = createContext({
  auth: { isAuthenticated: false, user: null },
  login: async (email, password) => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  const login = async (email, password) => {
    try {
      const response = await fetch('https://payroll-latest-1uzw.onrender.com/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();

      // Assuming the API response includes user info (email, role, etc.)
      setAuth({
        isAuthenticated: true,
        user: data, // Adjust based on your API response structure
      });

      // Optional: Handle token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials or server error');
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
