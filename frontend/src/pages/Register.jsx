import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    batch: '',
    role: 'student' // default value
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, department, batch, role } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        department,
        batch,
        role
      });

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed. Please check your inputs and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <h2>Create Account</h2>
        <p>Join Memorandum</p>
      </div>
      <div className="auth-body">
        {error && <div className="alert alert-error">❌ {error}</div>}
        {success && <div className="alert alert-success">✅ {success}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="John Doe"
              value={name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="name@university.edu"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Create a strong password"
              value={password}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                className="form-control"
                placeholder="e.g. Computer Science"
                value={department}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="batch">Batch (Graduation Year)</label>
              <input
                type="text"
                id="batch"
                name="batch"
                className="form-control"
                placeholder="e.g. 2024"
                value={batch}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                className="form-control"
                value={role}
                onChange={onChange}
                required
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
