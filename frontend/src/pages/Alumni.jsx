import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlumniCard from '../components/AlumniCard';
import SearchBar from '../components/SearchBar';

// Professional mock data for fallbacks
const MOCK_ALUMNI = [
  { _id: '1', name: 'Arjun Mehta', department: 'Computer Science', batch: '2022' },
  { _id: '2', name: 'Priya Sharma', department: 'Electrical Engineering', batch: '2020' },
  { _id: '3', name: 'Rohan Sen', department: 'Mechanical Engineering', batch: '2021' },
  { _id: '4', name: 'Sneha Nair', department: 'Information Technology', batch: '2023' },
  { _id: '5', name: 'Vikram Joshi', department: 'Civil Engineering', batch: '2019' },
  { _id: '6', name: 'Divya Iyer', department: 'Electronics & Communication', batch: '2024' }
];

const Alumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/alumni');
        setAlumniList(response.data || []);
      } catch (err) {
        console.warn('Backend API not responding, falling back to mock data:', err.message);
        // Fallback to mock data so the app displays correctly
        setAlumniList(MOCK_ALUMNI);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  // Filter alumni based on search query (case-insensitive)
  const filteredAlumni = alumniList.filter((alumnus) =>
    alumnus.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="directory-layout">
      <div>
        <h1 className="section-title">Alumni Directory</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Search and connect with graduates from various batches and departments.
        </p>
        
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          placeholder="Search alumni by name..." 
        />
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading alumni directory...</p>
        </div>
      ) : filteredAlumni.length > 0 ? (
        <div className="cards-grid">
          {filteredAlumni.map((alumnus, idx) => (
            <AlumniCard key={alumnus._id || idx} alumnus={alumnus} />
          ))}
        </div>
      ) : (
        <div className="no-data">
          <h3>No alumni found matching "{searchQuery}"</h3>
          <p>Try searching for a different name or checking back later.</p>
        </div>
      )}
    </div>
  );
};

export default Alumni;
