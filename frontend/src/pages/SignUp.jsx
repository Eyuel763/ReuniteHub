import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { debounce } from 'lodash';
import '../Auth.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user',
  });
  const [usernameStatus, setUsernameStatus] = useState({
    loading: false,
    available: false,
    message: '',
    suggestions: [],
  });
  const [formValid, setFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Check overall form validity
  useEffect(() => {
    const isValid =
      usernameStatus.available === true &&
      formData.username.length >= 3 &&
      formData.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && // Email validation
      formData.password &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 8;

    setFormValid(isValid);
  }, [formData, usernameStatus.available]);

  // Debounced username check
  const checkUsername = debounce(async (username) => {
    if (!username || username.length < 3) {
      setUsernameStatus({
        loading: false,
        available: false,
        message: username ? 'Minimum 3 characters' : '',
        suggestions: [],
      });
      return;
    }

    setUsernameStatus((prev) => ({ ...prev, loading: true, message: 'Checking...' }));

    try {
      const response = await axios.get('http://localhost:8000/auth/check-username/', {
        params: { username },
      });
      

      setUsernameStatus({
        loading: false,
        available: response.data.available,
        message: response.data.message,
        suggestions: response.data.suggestions || [],
      });
    } catch (error) {
      setUsernameStatus({
        loading: false,
        available: false,
        message: 'Error checking username',
        suggestions: [],
      });
    }
  }, 500);

  useEffect(() => {
    if (formData.username) {
      checkUsername(formData.username);
    }
    return () => checkUsername.cancel();
  }, [formData.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Clear error when user makes changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formValid) {
      setError('Please fill all required fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/users/',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          role: formData.role,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Registration successful:', response.data);
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      
      let errorMessage = 'Registration failed';
      if (error.response?.data) {
        if (error.response.data.email) {
          errorMessage = error.response.data.email[0];
        } else if (error.response.data.username) {
          errorMessage = error.response.data.username[0];
        } else if (error.response.data.non_field_errors) {
          errorMessage = error.response.data.non_field_errors[0];
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-box">
          <h2>Create Account</h2>
          <p>Fill in the details to register</p>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="form-row">
              <input
                type="text"
                name="first_name"
                placeholder="First Name*"
                maxLength={150}
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name*"
                maxLength={150}
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              maxLength={20}
              value={formData.phone}
              onChange={handleChange}
            />

            {/* Account Information */}
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username*"
                required
                maxLength={150}
                value={formData.username}
                onChange={handleChange}
                className={usernameStatus.message && !usernameStatus.available ? 'is-invalid' : ''}
              />
              {usernameStatus.loading && (
                <div className="status loading">{usernameStatus.message}</div>
              )}
              {!usernameStatus.loading && usernameStatus.message && (
                <div
                  className={`status ${
                    usernameStatus.available ? 'success' : 'error'
                  }`}
                >
                  {usernameStatus.message}
                  {usernameStatus.suggestions.length > 0 && (
                    <div className="suggestions">
                      Try:{' '}
                      {usernameStatus.suggestions.slice(0, 3).map((s, i) => (
                        <span
                          key={i}
                          className="suggestion"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, username: s }));
                            setUsernameStatus((prev) => ({
                              ...prev,
                              suggestions: [],
                            }));
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email*"
              required
              maxLength={254}
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password* (min 8 characters)"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password*"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={formData.password && formData.password !== formData.confirmPassword ? 'is-invalid' : ''}
            />
            {formData.password && formData.password !== formData.confirmPassword && (
              <div className="invalid-feedback">Passwords don't match</div>
            )}

            {/* Enhanced Role Selection */}
            <div className="role-section">
              <h4 className="role-title">Select Your Role</h4>
              <div className="role-grid">
                <label
                  className={`role-card ${
                    formData.role === 'user' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === 'user'}
                    onChange={handleChange}
                    hidden
                  />
                  <div className="role-content">
                    <div className="role-icon">👤</div>
                    <span className="role-name">User</span>
                  </div>
                </label>

                <label
                  className={`role-card ${
                    formData.role === 'volunteer' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="volunteer"
                    checked={formData.role === 'volunteer'}
                    onChange={handleChange}
                    hidden
                  />
                  <div className="role-content">
                    <div className="role-icon">🤝</div>
                    <span className="role-name">Volunteer</span>
                  </div>
                </label>

                <label
                  className={`role-card ${
                    formData.role === 'moderator' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="moderator"
                    checked={formData.role === 'moderator'}
                    onChange={handleChange}
                    hidden
                  />
                  <div className="role-content">
                    <div className="role-icon">🛡️</div>
                    <span className="role-name">Moderator</span>
                  </div>
                </label>

                <label
                  className={`role-card ${
                    formData.role === 'admin' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={handleChange}
                    hidden
                  />
                  <div className="role-content">
                    <div className="role-icon">👑</div>
                    <span className="role-name">Admin</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={!formValid || isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;