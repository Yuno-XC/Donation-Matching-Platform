# Donation Matching Platform

This is a **Donation Matching Platform** built using **React**, **Express**, and **MySQL**. The platform allows donors and companies to register and match donations.

## Features

- Donor and company registration.
- Real-time matching of donations based on set criteria.
- Secure API for data interaction.
- Responsive UI for a seamless experience.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Express.js
- **Database:** MySQL
- **API Integration:** RESTful APIs for donor and company data

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Yuno-XC/donation-matching-platform.git

```

### 2. Navigate to the Project Directory

```bash 
cd donation-matching-platform
```
### 3. Install Dependencies

#### For the Frontend (React)

```bash
cd client
npm install
```

#### For the Backend (Express)

```bash
cd ../server
npm install
```
### 4. Setup MySQL Database

Create a new MySQL database.
Update the connection details in the backend configuration.

### 5. Start the Application

#### Frontend (React)

```bash
cd client
npm start
```

Runs on http://localhost:3001.

#### Backend (Express)

```bash
cd server
npm start
```
Runs on http://localhost:3000

### Environment Variables

Make sure to set up environment variables for both the frontend and backend.

#### Backend (server/.env)

makefile
```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=donation_matching
PORT=3000
```
### Contributing

Feel free to fork the project and submit pull requests if you'd like to improve or add new features.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.




