import React from 'react';

const EventCard = ({ event }) => {
  const { title, venue, date, description } = event;

  // Format date nicely
  const formatDate = (dateStr) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="card-event">
      <h3 className="event-title">{title}</h3>
      <div className="event-details">
        <div className="event-detail-item">
          📍 <strong>Venue:</strong> {venue}
        </div>
        <div className="event-detail-item">
          📅 <strong>Date:</strong> {formatDate(date)}
        </div>
      </div>
      <p className="event-description">{description}</p>
    </div>
  );
};

export default EventCard;
