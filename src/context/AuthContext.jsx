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
  
      // Check for response.ok to handle failure scenarios
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to login');
      }
  
      const data = await response.json();
  
      // Ensure the response contains the necessary data
      if (data && data.token) {
        setAuth({
          isAuthenticated: true,
          user: data.user || null,
        });
  
        localStorage.setItem('authToken', data.token); // Store token
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; // This will allow the error to be caught in the Login component
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
