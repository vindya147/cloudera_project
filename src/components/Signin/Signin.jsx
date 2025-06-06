import React, { useState } from 'react';
import './Signin.css';
import { Link } from 'react-router-dom';


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    alert(`Email: ${email}\nPassword: ${password}\nRemember Me: ${rememberMe}`);
  };

  return (
    <div className="signin-background">
      <div className="signin-container">
        <button className="close-btn" aria-label="Close">&times;</button>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              tabIndex={0}
              aria-label="Toggle password visibility"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <Link to="/Forgot-password" className="forgot-password">Forgot Password</Link>

          <button type="submit" className="signin-btn" disabled={!email || !password}>
            Sign in
          </button>

          <div className="signin-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <a href="#" className="need-help">Need help?</a>
          </div>
        </form>
        <div className="signup-link">
          Don’t have an account? <a href="/Signup">Sign up</a>
        </div>
        <div className="recaptcha-note">
          This page is protected by Google reCAPTCHA to ensure you’re not a bot. <a href="#">Learn more.</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
