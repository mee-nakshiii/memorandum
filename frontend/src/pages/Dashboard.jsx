import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from "../services/api";

const Dashboard = () => {
  const [role, setRole] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'User',
    email: '',
    department: '',
    batch: ''
  });
  const [jobForm, setJobForm] = useState({ company: '', title: '', description: '' });
  const [eventForm, setEventForm] = useState({ title: '', venue: '', date: '', description: '' });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    setRole(savedRole || 'Student');

    // Simulate fetching user profile information or decode token if available.
    // By default, since we are doing only frontend, we can mock it, or if there's a profile endpoint, we can call it.
    // Let's populate some default mocked profile data based on standard flow
    setUserProfile({
      name: savedRole ? `${savedRole} Member` : 'Academy Member',
      email: 'member@university.edu',
      department: 'Information Technology',
      batch: '2024'
    });
  }, [navigate]);

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      await api.post("/jobs", jobForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: 'success', text: 'Job posted successfully!' });
      setJobForm({ company: '', title: '', description: '' });
    } catch (err) {
      console.error(err);
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to post job. Please verify connection.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/events',
        eventForm,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage({ type: 'success', text: 'Event created successfully!' });
      setEventForm({ title: '', venue: '', date: '', description: '' });
    } catch (err) {
      console.error(err);
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to create event. Please verify connection.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStudentDashboard = () => (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">🚀 Student Hub</h2>
      <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
        As a student, you can search for graduating alumni, discover job postings, and join career seminars/events.
      </p>
      <div className="quick-actions">
        <Link to="/alumni" className="action-card">
          <span className="action-icon">🔍</span>
          <span>Search Alumni</span>
        </Link>
        <Link to="/jobs" className="action-card">
          <span className="action-icon">💼</span>
          <span>View Jobs</span>
        </Link>
        <Link to="/events" className="action-card">
          <span className="action-icon">📅</span>
          <span>View Events</span>
        </Link>
      </div>
    </div>
  );

  const renderAlumniDashboard = () => (
    <>
      <div className="dashboard-card">
        <h2 className="dashboard-card-title">🔧 Manage Profile</h2>
        <div className="form-grid">
          <div className="form-group">
            <span className="form-label">Name</span>
            <input type="text" className="form-control" value={userProfile.name} disabled />
          </div>
          <div className="form-group">
            <span className="form-label">Email</span>
            <input type="text" className="form-control" value={userProfile.email} disabled />
          </div>
          <div className="form-group">
            <span className="form-label">Department</span>
            <input type="text" className="form-control" value={userProfile.department} disabled />
          </div>
          <div className="form-group">
            <span className="form-label">Batch</span>
            <input type="text" className="form-control" value={userProfile.batch} disabled />
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-card-title">💼 Post a New Job</h2>
        <form onSubmit={handleJobSubmit} className="inline-form">
          <div className="form-group">
            <label className="form-label" htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              className="form-control"
              value={jobForm.company}
              onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
              placeholder="e.g. Google"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              className="form-control"
              value={jobForm.title}
              onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
              placeholder="e.g. Frontend React Developer"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="jobDesc">Job Description</label>
            <textarea
              id="jobDesc"
              className="form-control"
              rows="4"
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              placeholder="Provide key requirements, location, and apply links..."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </>
  );

  const renderAdminDashboard = () => (
    <>
      <div className="dashboard-card">
        <h2 className="dashboard-card-title">👥 Administrative Actions</h2>
        <div className="quick-actions">
          <Link to="/alumni" className="action-card">
            <span className="action-icon">👥</span>
            <span>Manage Users</span>
          </Link>
          <Link to="/jobs" className="action-card">
            <span className="action-icon">💼</span>
            <span>Manage Jobs</span>
          </Link>
          <Link to="/events" className="action-card">
            <span className="action-icon">📅</span>
            <span>Manage Events</span>
          </Link>
        </div>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="dashboard-card" style={{ marginBottom: 0 }}>
          <h2 className="dashboard-card-title">📅 Create Campus Event</h2>
          <form onSubmit={handleEventSubmit} className="inline-form">
            <div className="form-group">
              <label className="form-label" htmlFor="eventTitle">Event Title</label>
              <input
                type="text"
                id="eventTitle"
                className="form-control"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                placeholder="e.g. Annual Alumni Meet 2026"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="venue">Venue</label>
              <input
                type="text"
                id="venue"
                className="form-control"
                value={eventForm.venue}
                onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                placeholder="e.g. Main Seminar Hall"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="form-control"
                value={eventForm.date}
                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="eventDesc">Event Description</label>
              <textarea
                id="eventDesc"
                className="form-control"
                rows="3"
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                placeholder="Details of scheduling, guest speakers, etc..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        </div>

        <div className="dashboard-card" style={{ marginBottom: 0 }}>
          <h2 className="dashboard-card-title">💼 Post Job Listing</h2>
          <form onSubmit={handleJobSubmit} className="inline-form">
            <div className="form-group">
              <label className="form-label" htmlFor="adminCompany">Company Name</label>
              <input
                type="text"
                id="adminCompany"
                className="form-control"
                value={jobForm.company}
                onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                placeholder="e.g. Microsoft"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="adminJobTitle">Job Title</label>
              <input
                type="text"
                id="adminJobTitle"
                className="form-control"
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                placeholder="e.g. Systems Engineer"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="adminJobDesc">Job Description</label>
              <textarea
                id="adminJobDesc"
                className="form-control"
                rows="3"
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                placeholder="Provide details about requirements..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Job'}
            </button>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-card">
        <h1>Welcome, {role}!</h1>
        <p>Manage your alumni profile, announcements, jobs, and networking lists.</p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}

      {role === 'Student' && renderStudentDashboard()}
      {role === 'Alumni' && renderAlumniDashboard()}
      {role === 'Admin' && renderAdminDashboard()}
    </div>
  );
};

export default Dashboard;
