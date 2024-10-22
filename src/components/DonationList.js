// DonationList.js
import React, { useEffect, useState } from 'react';

const DonationList = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            const response = await fetch('http://localhost:5000/donations');
            const data = await response.json();
            setDonations(data);
        };

        fetchDonations();
    }, []);

    return (
        <div className="container">
            <h2>Donations</h2>
            {donations.length > 0 ? (
                donations.map((donation) => (
                    <div className="card" key={donation.id}>
                        <h3>{donation.name}</h3>
                        <p>Amount: {donation.amount}</p>
                    </div>
                ))
            ) : (
                <p>No donations available.</p>
            )}
        </div>
    );
};

export default DonationList;
