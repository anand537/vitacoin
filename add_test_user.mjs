import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Script to add a test user to the MongoDB database with password
async function addTestUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/vitacoin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Use the actual User model from the backend
    const User = (await import('./backend/models/User.js')).default;

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'demo@university.edu' });
    if (existingUser) {
      console.log('User already exists, updating password...');
      
      // Update password for existing user
      const hashedPassword = await bcrypt.hash('password123', 10);
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log('User password updated successfully');
      return;
    }

    // Create test user with hashed password
    const hashedPassword = await bcrypt.hash('password123', 10);
    const testUser = new User({
      userId: 'user_001',
      username: 'Demo User',
      email: 'demo@university.edu',
      password: hashedPassword,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      coinBalance: 2850,
      totalBadges: 12,
      level: 8,
      experiencePoints: 3200
    });

    await testUser.save();
    console.log('Test user created successfully with password');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

addTestUser();
