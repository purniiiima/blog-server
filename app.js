const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001', // Your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Include credentials if needed (like cookies or auth headers)
  }));
  
app.get('/api/test', (req, res) => {
    res.json({ message: 'Frontend and backend are connected!' });
  });

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API is running'));

module.exports = app;
