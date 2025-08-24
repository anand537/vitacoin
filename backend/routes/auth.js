import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      userId: `user_${Date.now()}`,
      username,
      email,
      password: hashedPassword,
      coinBalance: 0,
      totalBadges: 0,
      level: 1,
      experiencePoints: 0
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.userId, email: newUser.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        userId: newUser.userId,
        username: newUser.username,
        email: newUser.email,
        coinBalance: newUser.coinBalance,
        level: newUser.level
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        coinBalance: user.coinBalance,
        level: user.level,
        avatar: user.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    // In a real implementation, you would verify the JWT token
    // and get the user ID from the token
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token (simplified for demo)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    // const user = await User.findOne({ userId: decoded.userId });
    
    // For demo purposes, return the first user
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      userId: user.userId,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      coinBalance: user.coinBalance,
      totalBadges: user.totalBadges,
      level: user.level,
      experiencePoints: user.experiencePoints
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
