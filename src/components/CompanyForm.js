// src/components/CompanyForm.js
import React, { useState } from 'react';

const CompanyForm = () => {
  const [name, setName] = useState('');
  const [matchingPercentage, setMatchingPercentage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error state

    try {
      const response = await fetch('http://localhost:5000/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, matchingPercentage }),
      });

      if (!response.ok) {
        throw new Error('Failed to register company');
      }

      const result = await response.text();
      alert(result);
      setName('');
      setMatchingPercentage('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Register as a Company</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Matching Percentage"
          value={matchingPercentage}
          onChange={(e) => setMatchingPercentage(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
    </div>
  );
};

export default CompanyForm;
