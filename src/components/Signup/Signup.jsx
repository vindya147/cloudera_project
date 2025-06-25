import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setAlertMsg(`Account created for: ${formData.username}\nEmail: ${formData.email}`);
    setTimeout(() => {
      setShowAlert(false);
      navigate('/signin');
    }, 1800);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
      
          <i className="fas fa-robot" aria-hidden="true"></i>
          <h2>Create Account</h2>
        
        <p>Join the RAG Assistant family today!</p>

        <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              minLength={3}
              required
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="username"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Create a password"
                minLength={6}
                required
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="signup-btn"
            disabled={!formData.username || !formData.email || !formData.password}
          >
            Create Account
          </button>
        </form>

        <p>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>

        {showAlert && <div className="alert">{alertMsg}</div>}
      </div>
    </div>
  );
};

export default Signup;
