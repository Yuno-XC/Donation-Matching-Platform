// src/components/DonorForm.js
import React, { useState } from 'react';
import axios from 'axios';

const DonorForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error

    try {
      await axios.post('http://localhost:5001/donors', { name, email });
      alert('Donor registered successfully');
      setName(''); // Reset the name field
      setEmail(''); // Reset the email field
    } catch (error) {
      console.error(error);
      setError('Failed to register donor. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
    </div>
  );
};

export default DonorForm;
