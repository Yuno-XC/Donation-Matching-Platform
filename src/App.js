// src/App.js
import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles.css'; 
import DonorForm from './components/DonorForm'; // Updated to use DonorForm
import CompanyRegistration from './components/CompanyRegistration'; 
import Dashboard from './components/Dashboard'; 
import axios from 'axios';

const App = () => {
  const [donors, setDonors] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Fetch donors from backend
  const fetchDonors = async () => {
    try {
      const response = await axios.get('http://localhost:5001/donors');
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  // Fetch companies from backend
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5001/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDonors();
    fetchCompanies();
  }, []);

  const addDonor = (donor) => {
    setDonors((prevDonors) => [...prevDonors, donor]);
  };

  const addCompany = (company) => {
    setCompanies((prevCompanies) => [...prevCompanies, company]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Donation Matching Platform</h1>
      <TransitionGroup>
        <CSSTransition classNames="fade" timeout={300}>
          <DonorForm addDonor={addDonor} /> {/* Use DonorForm */}
        </CSSTransition>
        <CSSTransition classNames="fade" timeout={300}>
          <CompanyRegistration addCompany={addCompany} />
        </CSSTransition>
        <CSSTransition classNames="fade" timeout={300}>
          <Dashboard donors={donors} companies={companies} />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#4CAF50',
    marginBottom: '20px',
  },
};

export default App;
