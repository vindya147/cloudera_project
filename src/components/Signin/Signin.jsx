import React, { useState } from 'react';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMsg(''); // Clear previous alerts

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        setAlertType('success');
        setAlertMsg(data.message || 'Login successful!');
        // You might want to store user data or a token in localStorage/sessionStorage here
        // localStorage.setItem('userToken', data.token); // Example if your backend sends a token
        // localStorage.setItem('userData', JSON.stringify(data.user)); // Example to store user details

        setTimeout(() => {
          navigate('/chatui'); // Redirect to chat page
        }, 1500); // Give user time to read success message
      } else {
        // Login failed
        setAlertType('error');
        setAlertMsg(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setAlertType('error');
      setAlertMsg('Network error. Could not connect to the server.');
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="signin-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo">
              <i className="fas fa-robot" aria-hidden="true"></i>
              <h1>RAG Assistant</h1>
            </div>
            <p>Sign in to continue your conversations</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email"> Email Address</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="   Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password"> Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock" aria-hidden="true"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  placeholder="   Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i
                    className={
                      showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                    }
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
              <div className="forgot-password-link">
                <Link to="/Forgot-password" className="auth-link">
                  Forgot password?
                </Link>
              </div>
            </div>

            {alertMsg && (
              <div className={`alert ${alertType === 'error' ? 'alert-error' : 'alert-success'}`}>
                {alertMsg}
              </div>
            )}

            <button
              type="submit"
              className="auth-btn"
              disabled={!email || !password}
            >
              <span>Sign In</span>
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </button>

            <div className="auth-divider">
              <span>Don't have an account?</span>
            </div>

            <Link to="/signup" className="auth-link">
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
