import { useState, useEffect } from 'react';

/**
 * Custom hook for handling user authentication
 * Manages user login state and authentication operations
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from memory storage)
    const savedUser = window.taskManagerUser;
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  /**
   * Login function - creates user session
   * @param {string} username - User's username
   */
  const login = (username) => {
    const userData = { 
      username: username.trim(), 
      id: Date.now(),
      loginTime: new Date().toISOString()
    };
    setUser(userData);
    window.taskManagerUser = userData;
  };

  /**
   * Logout function - clears user session and tasks
   */
  const logout = () => {
    setUser(null);
    window.taskManagerUser = null;
    window.taskManagerTasks = [];
  };

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  const isAuthenticated = () => {
    return user !== null;
  };

  return { 
    user, 
    login, 
    logout, 
    isLoading,
    isAuthenticated: isAuthenticated()
  };
};