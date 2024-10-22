// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Donation Matching Platform</h1>
      <p style={styles.description}>
        Donate to causes you care about and have your donations matched!
      </p>
      <Link to="/donors" style={styles.button}>Get Started</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  title: {
    color: '#4CAF50',
    marginBottom: '20px',
  },
  description: {
    marginBottom: '30px',
  },
  button: {
    padding: '10px 20px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
};

export default Home;
