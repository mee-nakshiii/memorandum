import React from 'react';

const JobCard = ({ job }) => {
  const { company, title, description } = job;

  return (
    <div className="card-job">
      <div className="job-meta">
        <span className="job-company">{company}</span>
      </div>
      <h3 className="job-title">{title}</h3>
      <p className="job-description">{description}</p>
    </div>
  );
};

export default JobCard;
