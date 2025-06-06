import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const [showPopup, setShowPopup] = useState(false);
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
    setShowPopup(true);
    alert(`Account created for: ${formData.name}\nEmail: ${formData.email}`);
    // Add your API call logic here
  };

  const redirectToSignIn = () => {
    navigate('/signin'); // Redirect to the Sign-In page
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create an Account</h2>
        <p>
          Already have an account? <a href="/signin">Sign in</a>
        </p>
        <form onSubmit={handleSubmit}>
          <label>What should we call you?</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your profile name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <label>What’s your email?</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label>Create a password</label>
          <div className="password-wrapper">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
              role="button"
              tabIndex={0}
              aria-label="Toggle password visibility"
            >
              {formData.showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <p className="password-hint">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
          <button type="submit" className="signup-btn">
            Create an account
          </button>
        </form>
      </div>
        {showPopup && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <h3>Account Created Successfully!</h3>
            <p>Your account has been created. Please sign in to continue.</p>
            <button className="popup-btn" onClick={redirectToSignIn}>
              Go to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
