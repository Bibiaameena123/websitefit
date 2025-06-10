// server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
import connectDB from './config/db.js';
connectDB();

// Import routes (using default imports)
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import contactRoutes from './routes/contactRoutes.js'; // ✅ Fixed: default import
import paymentRoutes from './routes/paymentRoutes.js';

// Import error handler middleware
import errorHandler from './middleware/errorHandler.js';

const app = express();

// CORS Setup - adjust 'origin' for production frontend URL if needed
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  })
);

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (screenshots, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Admin login route (env credentials check)
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// Mount all API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/contacts', contactRoutes); // ✅ Contact Us endpoint
app.use('/api/payments', paymentRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('🏋️‍♂️ Gym Management Backend API is running...');
});

// Global Error Handler - must be last
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
