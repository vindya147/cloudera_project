import React, { useState } from 'react';
import './Verifyemail.css';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState(Array(5).fill(''));
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (value, index) => {
    if (isNaN(value)) return; // Only allow numeric input

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move to the next input field automatically
    if (value && index < verificationCode.length - 1) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = verificationCode.join('');
    if (code.length < 5) {
      setErrorMessage('Please enter all 5 digits.');
      return;
    }
    alert(`Verification code entered: ${code}`);
    setErrorMessage('');
    // Add API call logic here for verification
  };

  const resendEmail = () => {
    alert('Resend email logic here.');
    // Add logic for resending email
  };

  return (
    <div className="verify-email-page">
      <div className="verify-email-container">
        <button className="close-btn" aria-label="Close">&times;</button>
        <h2>Check Your Email</h2>
        <p>We sent a reset link to <strong>contact@dscode...com</strong></p>
        <p>Enter the 5-digit code mentioned in the email.</p>
        <form onSubmit={handleVerify}>
          <div className="code-inputs">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(e.target.value, index)}
                className="code-input"
              />
            ))}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="verify-btn">Verify Code</button>
        </form>
        <p>
          Haven't got the email yet? <span className="resend-email" onClick={resendEmail}>Resend email</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
