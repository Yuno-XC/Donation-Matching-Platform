// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the process if the database connection fails
    }
    console.log('MySQL connected...');
});

// Log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Donor registration route
app.post('/donors', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO donors (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error occurred while registering donor.' });
        }
        res.json({ id: result.insertId, name, email, message: 'Donor registered!' });
    });
});

// Fetch all donors route
app.get('/donors', (req, res) => {
    const sql = 'SELECT * FROM donors';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching donors.' });
        }
        res.json(results);
    });
});

// Company registration route
app.post('/companies', (req, res) => {
    const { name, matchingPercentage } = req.body;
    const sql = 'INSERT INTO companies (name, matching_percentage) VALUES (?, ?)';
    db.query(sql, [name, matchingPercentage], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error occurred while registering company.' });
        }
        res.json({ id: result.insertId, name, matchingPercentage, message: 'Company registered!' });
    });
});

// Fetch all companies route
app.get('/companies', (req, res) => {
    const sql = 'SELECT * FROM companies';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching companies.' });
        }
        res.json(results);
    });
});

// Donation registration route
app.post('/donations', (req, res) => {
    const { donorId, companyId, amount } = req.body;
    const sql = 'INSERT INTO donations (donor_id, company_id, amount) VALUES (?, ?, ?)';
    db.query(sql, [donorId, companyId, amount], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error occurred while registering donation.' });
        }
        res.json({ id: result.insertId, donorId, companyId, amount, message: 'Donation registered!' });
    });
});

// Fetch all donations route
app.get('/donations', (req, res) => {
    const sql = `
        SELECT d.id, donors.name AS donor_name, companies.name AS company_name, d.amount
        FROM donations d
        JOIN donors ON d.donor_id = donors.id
        JOIN companies ON d.company_id = companies.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching donations.' });
        }
        res.json(results);
    });
});

// Fetch matched donations route
app.get('/matched-donations', (req, res) => {
    const sql = `
        SELECT d.*, donors.name AS donor_name, companies.name AS company_name, companies.matching_percentage
        FROM donations d
        JOIN donors ON d.donor_id = donors.id
        JOIN companies ON d.company_id = companies.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching matched donations.' });
        }
        const matchedDonations = results.map((donation) => ({
            id: donation.id,
            donor_name: donation.donor_name,
            company_name: donation.company_name,
            amount: donation.amount,
            matching_amount: (donation.amount * donation.matching_percentage) / 100,
            total_amount: donation.amount + (donation.amount * donation.matching_percentage) / 100
        }));
        res.json(matchedDonations);
    });
});

// Start the server
const PORT = process.env.PORT || 5001; // Use environment variable for the port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
