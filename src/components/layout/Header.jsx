import React from 'react';
import { CheckSquare, LogOut, User, Clock } from 'lucide-react';

/**
 * Header Component
 * Navigation bar with user info and logout functionality
 */
const Header = ({ user, onLogout }) => {
  /**
   * Format login time for display
   */
  const formatLoginTime = (loginTime) => {
    if (!loginTime) return '';
    
    const time = new Date(loginTime);
    return time.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  /**
   * Handle logout with confirmation
   */
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout? This will clear all your tasks.')) {
      onLogout();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
              <CheckSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-xs text-gray-500">Stay organized, stay productive</p>
            </div>
          </div>
          
          {/* User Info and Actions */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                <User className="w-4 h-4" />
              </div>
              <div className="text-right">
                <p className="font-medium">Welcome, {user.username}!</p>
                {user.loginTime && (
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Since {formatLoginTime(user.loginTime)}
                  </p>
                )}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Logout and clear all tasks"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;