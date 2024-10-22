// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ donors, companies }) => {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div>
        <h3>Registered Donors:</h3>
        {donors.length > 0 ? (
          <ul>
            {donors.map((donor) => (
              <li key={donor.id}>{donor.name} ({donor.email})</li>
            ))}
          </ul>
        ) : (
          <p>No donors registered yet.</p>
        )}
      </div>
      <div>
        <h3>Registered Companies:</h3>
        {companies.length > 0 ? (
          <ul>
            {companies.map((company) => (
              <li key={company.id}>{company.name} (Matching: {company.matchingPercentage}%)</li>
            ))}
          </ul>
        ) : (
          <p>No companies registered yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
