import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

// Professional mock data for fallbacks
const MOCK_EVENTS = [
  {
    _id: '1',
    title: 'Annual Alumni Homecoming Meet 2026',
    venue: 'Main University Amphitheater',
    date: '2026-10-15',
    description: 'Welcome back our distinguished alumni! Join us for a full day of networking panels, alumni-student interactive panels, department presentations, and an evening cultural banquet.'
  },
  {
    _id: '2',
    title: 'Webinar: Industry Trends in Generative AI',
    venue: 'Online (Zoom Meeting)',
    date: '2026-07-20',
    description: 'Join industry researchers and leads from top technology firms as they talk about modern Transformer design, AI-driven automation pipelines, and next-generation engineering roles.'
  },
  {
    _id: '3',
    title: 'Career & Placement Fair',
    venue: 'Campus Placement Arena',
    date: '2026-08-05',
    description: 'A great opportunity for current students and recent graduates to network with top employers. Bring multiple copies of your resume. Alumni mentors will be on-site to help with reviews.'
  }
];

const Events = () => {
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/events');
        setEventsList(response.data || []);
      } catch (err) {
        console.warn('Backend API not responding, falling back to mock data:', err.message);
        setEventsList(MOCK_EVENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="directory-layout">
      <div>
        <h1 className="section-title">Upcoming Events</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Participate in webinars, workshops, campus placements, and physical homecoming events.
        </p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading events schedule...</p>
        </div>
      ) : eventsList.length > 0 ? (
        <div className="cards-grid">
          {eventsList.map((event, idx) => (
            <EventCard key={event._id || idx} event={event} />
          ))}
        </div>
      ) : (
        <div className="no-data">
          <h3>No events scheduled</h3>
          <p>Check back later or check the announcements feed on your Dashboard.</p>
        </div>
      )}
    </div>
  );
};

export default Events;
