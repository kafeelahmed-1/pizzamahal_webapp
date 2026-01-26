const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

connectDB();

const app = express();

// CORS configuration for security
const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:3000'], // Allow frontend URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Limit payload size

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});