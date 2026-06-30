import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import api from "../services/api";

// Professional mock data for fallbacks
const MOCK_JOBS = [
  {
    _id: '1',
    company: 'Google',
    title: 'Software Engineer - Frontend',
    description: 'We are looking for a Software Engineer to join our Frontend core infrastructure team. Experience in React, TypeScript, and high-performance rendering frameworks is preferred.'
  },
  {
    _id: '2',
    company: 'Microsoft',
    title: 'Systems Program Manager',
    description: 'Lead cross-functional engineering processes to release next-generation Azure Cloud Services. Strong communication and systems-level coordination expertise needed.'
  },
  {
    _id: '3',
    company: 'Meta',
    title: 'Product Designer',
    description: 'Design intuitive interfaces and micro-interactions for VR-centric social spaces. Proficiency in design systems, Figma prototypes, and user empathy maps is essential.'
  },
  {
    _id: '4',
    company: 'Amazon',
    title: 'DevOps & SRE Engineer',
    description: 'Build and maintain automated CI/CD configurations, logging pipelines, and multi-region Kubernetes clusters. Knowledge of AWS, Terraform, and Docker is mandatory.'
  }
];

const Jobs = () => {
  const [jobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await api.get("/jobs");
        setJobsList(response.data || []);
      } catch (err) {
        console.warn('Backend API not responding, falling back to mock data:', err.message);
        setJobsList(MOCK_JOBS);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="directory-layout">
      <div>
        <h1 className="section-title">Job Board</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Explore professional opportunities posted by university alumni and network administrators.
        </p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading job postings...</p>
        </div>
      ) : jobsList.length > 0 ? (
        <div className="cards-grid">
          {jobsList.map((job, idx) => (
            <JobCard key={job._id || idx} job={job} />
          ))}
        </div>
      ) : (
        <div className="no-data">
          <h3>No job postings available</h3>
          <p>Check back later or post a new job from your Alumni Dashboard.</p>
        </div>
      )}
    </div>
  );
};

export default Jobs;
