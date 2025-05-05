import React, { useState } from 'react';
import '../Auth.css'; // This ensures your styling is applied

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/password-reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Password reset link has been sent to your email.');
      } else {
        const data = await response.json();
        alert(data.detail || 'Failed to send reset link. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-box">
          <h2>Forgot Password</h2>
          <p className="auth-subtitle">
            Enter your email and we’ll send you a link to reset your password.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email*"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="auth-button">
              Send Reset Link
            </button>
          </form>

          <div className="auth-footer">
            Remembered your password?{' '}
            <a href="/login" className="auth-link">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;