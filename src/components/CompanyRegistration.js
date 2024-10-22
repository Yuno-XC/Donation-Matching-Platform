// src/components/CompanyRegistration.js
import React, { useState } from 'react';

const CompanyRegistration = ({ addCompany }) => {
  const [name, setName] = useState('');
  const [matchingPercentage, setMatchingPercentage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && matchingPercentage) {
      try {
        const response = await fetch('http://localhost:5001/companies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, matchingPercentage }),
        });

        if (!response.ok) {
          throw new Error('Failed to register company');
        }

        const data = await response.json();
        addCompany({ id: data.id, name, matchingPercentage });
        setSuccess('Company registered successfully!');
        setName('');
        setMatchingPercentage('');
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
      <h2>Company Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter company name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter matching percentage"
          value={matchingPercentage}
          onChange={(e) => setMatchingPercentage(e.target.value)}
        />
        <button type="submit">Register Company</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CompanyRegistration;
