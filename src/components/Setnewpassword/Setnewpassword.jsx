import React, { useState } from 'react';
import './Setnewpassword.css';
import { useNavigate } from 'react-router-dom';

const SetNewPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    showPassword: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (formData.newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }
    setErrorMessage('');
    setShowPopup(true); // Show success popup
  };

  const redirectToSignIn = () => {
    navigate('/signin'); // Redirect to Sign-In page
  };

  return (
    <div className="set-new-password-page">
      <div className="set-new-password-container">
        <h2>Set New Password</h2>
        <p>Enter your new password to reset your account.</p>
        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <div className="password-wrapper">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
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

          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="reset-password-btn">
            Save Password
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <h3>Password Changed Successfully!</h3>
            <p>Your password has been updated. You can now sign in with your new password.</p>
            <button className="popup-btn" onClick={redirectToSignIn}>
              Go to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetNewPassword;
