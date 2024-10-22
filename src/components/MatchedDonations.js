// src/MatchedDonations.js
import React, { useEffect, useState } from 'react';

const MatchedDonations = () => {
    const [matchedDonations, setMatchedDonations] = useState([]);

    useEffect(() => {
        const fetchMatchedDonations = async () => {
            const response = await fetch('http://localhost:5000/matched-donations');
            const data = await response.json();
            setMatchedDonations(data);
        };

        fetchMatchedDonations();
    }, []);

    return (
        <div className="container">
            <h2>Matched Donations</h2>
            {matchedDonations.length > 0 ? (
                matchedDonations.map((donation) => (
                    <div className="card" key={donation.id}>
                        <h3>{donation.name}</h3>
                        <p>Amount: {donation.amount}</p>
                        <p>Matched by: {donation.company_name}</p>
                        <p>Matching Percentage: {donation.matching_percentage}%</p>
                    </div>
                ))
            ) : (
                <p>No matched donations available.</p>
            )}
        </div>
    );
};

export default MatchedDonations;
