import React from 'react';

const AlumniCard = ({ alumnus }) => {
  const { name, department, batch } = alumnus;

  // Generate initials for avatar representation
  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const names = fullName.trim().split(' ');
    if (names.length > 1) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <div className="card-alumni">
      <div className="avatar-circle">
        {getInitials(name)}
      </div>
      <h3 className="alumni-name">{name}</h3>
      <p className="alumni-dept">{department}</p>
      <span className="alumni-batch">Class of {batch}</span>
    </div>
  );
};

export default AlumniCard;
