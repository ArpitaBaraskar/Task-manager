import React, { useState } from 'react';
import { User } from 'lucide-react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onLogin(username.trim());
      setIsLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-icon">
          <User size={40} color="#2563EB" />
        </div>
        <h1 className="login-title">Task Manager</h1>
        <p className="login-subtitle">Please enter your username to continue</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className={`login-input${error ? ' login-input-error' : ''}`}
            disabled={isLoading}
            autoFocus
          />
          {error && (
            <p className="login-error">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="login-btn"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;