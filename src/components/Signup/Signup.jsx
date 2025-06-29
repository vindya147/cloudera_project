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
  const [alertType, setAlertType] = useState('success'); // 'success' or 'error'
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.username // or add a separate name field if you have one
        })
      });

      const data = await res.json();

      if (res.ok) {
        setAlertType('success');
        setAlertMsg('Account created! Redirecting to sign in...');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate('/signin');
        }, 1800);
      } else {
        setAlertType('error');
        setAlertMsg(data.error || 'Signup failed. Please try again.');
        setShowAlert(true);
      }
    } catch (err) {
      setAlertType('error');
      setAlertMsg('Network error. Please try again.');
      setShowAlert(true);
    }
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

        {showAlert && (
          <div className={`alert ${alertType === 'error' ? 'alert-error' : 'alert-success'}`}>
            {alertMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
