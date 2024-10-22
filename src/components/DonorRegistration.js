// src/components/DonorRegistration.js
import React, { useState } from 'react';

const DonorRegistration = ({ addDonor }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email) {
      try {
        const response = await fetch('http://localhost:5001/donors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
        });

        if (!response.ok) {
          throw new Error('Failed to register donor');
        }

        const data = await response.json();
        addDonor({ id: data.id, name, email });
        setSuccess('Donor registered successfully!');
        setName('');
        setEmail('');
        setError('');
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError('Please fill out all fields');
    }
  };

  return (
    <div className="container">
      <h2>Donor Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter donor name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter donor email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register Donor</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default DonorRegistration;
