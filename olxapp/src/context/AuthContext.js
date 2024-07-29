import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for API calls

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token) {
      setIsAuthenticated(true);
      setToken(token);
      setRefreshToken(refreshToken);
      fetchUserData(token);
    }
  }, []);

  const login = (token, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    setIsAuthenticated(true);
    setToken(token);
    setRefreshToken(refreshToken);
    fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsAdmin(false); // Clear admin state on logout
  };

  const fetchUserData = async (accessToken) => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/me/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const userData = response.data;
      setUser(userData);
      setIsAdmin(userData.isAdmin); // Assuming the API response includes an `isAdmin` field
    } catch (error) {
      console.error('Failed to fetch user data:', error.message);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, refreshToken, login, logout, user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
