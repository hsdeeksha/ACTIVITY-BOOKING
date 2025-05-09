 const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the authentication routes
app.use('/api/auth', require('./routes/authRoutes'));

// Use the activity routes
app.use('/api', require('./routes/activityRoutes')); // <-- Add this line

// Set up the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));