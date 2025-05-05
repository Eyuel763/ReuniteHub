import React, { useState } from 'react';
import '../Auth.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-box">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Please login to your account</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password*"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <div className="auth-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Remember me
              </label>

              <Link to="/forgotpassword" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;