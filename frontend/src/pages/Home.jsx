import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero">
        <h1 className="hero-title">Memorandum</h1>
        <p className="hero-description">
          Connecting graduates, students, and administrators to foster mentorship, career opportunities, and lifelong university bonds. Join our thriving community today.
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
          <Link to="/alumni" className="btn btn-secondary">
            Explore Alumni
          </Link>
        </div>
      </header>

      <section className="features-section">
        <h2 className="section-title">Why Join Our Alumni Network?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Alumni Directory</h3>
            <p>Search and connect with directory of graduates filterable by name, batch, or department. Find mentors or check on peers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Career Opportunities</h3>
            <p>Post and discover job opportunities posted by verified alumni. Get referrals and kickstart your professional career.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Campus & Alumni Events</h3>
            <p>Stay informed about webinars, physical meetups, and local events to expand your academic and career networking circles.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
