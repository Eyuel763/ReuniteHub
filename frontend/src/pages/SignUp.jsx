import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { debounce } from 'lodash';
import '../Auth.css';

const SignupPage = () => {
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

  // Check overall form validity
  useEffect(() => {
    const isValid =
      usernameStatus.available === true &&
      formData.username.length >= 3 &&
      formData.email &&
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
      const response = await axios.get('/api/auth/check-username/', {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValid) {
      alert('Please fill all required fields correctly');
      return;
    }

    try {
      const response = await axios.post(
        'http://your-django-server/api/register/',
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
            'X-CSRFToken': getCookie('csrftoken'),
          },
        }
      );

      console.log('Registration successful:', response.data);
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Registration failed');
    }
  };

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-box">
          <h2>Create Account</h2>
          <p>Fill in the details to register</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="form-row">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                maxLength={150}
                value={formData.first_name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                maxLength={150}
                value={formData.last_name}
                onChange={handleChange}
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
            />

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
              disabled={!formValid}
            >
              {usernameStatus.loading ? 'Verifying...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-link">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;