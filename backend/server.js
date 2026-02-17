const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database on Startup
const { getPool } = require('./config/db');
getPool().then(() => {
    console.log('Database initialized successfully');
}).catch(err => {
    console.error('Fatal Database Error:', err.message);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const resourceRoutes = require('./routes/resourceRoutes');
const studentRoutes = require('./routes/studentRoutes');
const issuanceRoutes = require('./routes/issuanceRoutes');
app.use('/api/resources', resourceRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/issuances', issuanceRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Campus Resource Management API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
