import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import coinRoutes from './routes/coin.js';
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';
import transactionRoutes from './routes/transactions.js';
import userTaskRoutes from './routes/userTasks.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/coin', coinRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/userTasks', userTaskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Test MongoDB connection route
import mongoose from 'mongoose';
app.get('/api/ping', async (req, res) => {
  try {
    // Try a simple MongoDB command
    await mongoose.connection.db.admin().ping();
    res.json({ connected: true });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
