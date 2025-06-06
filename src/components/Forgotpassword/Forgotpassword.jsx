import React, { useState } from 'react';
import './Forgotpassword.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email}`);
    navigate('/verifyemail');
    // Add your API call logic here
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <button className="close-btn" aria-label="Close">&times;</button>
        <h2>Forgot Password</h2>
        <p>Please enter your email to reset the password</p>
        <form onSubmit={handleResetPassword}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="reset-password-btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
