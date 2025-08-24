// Script to add a test user to the MongoDB database
const mongoose = require('mongoose');

async function addTestUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/vitacoin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Define User schema (matching the backend model)
    const userSchema = new mongoose.Schema({
      userId: { type: String, required: true, unique: true },
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      avatar: String,
      coinBalance: { type: Number, default: 0 },
      totalBadges: { type: Number, default: 0 },
      level: { type: Number, default: 1 },
      experiencePoints: { type: Number, default: 0 },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });

    const User = mongoose.model('User', userSchema);

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'demo@university.edu' });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return;
    }

    // Create test user
    const testUser = new User({
      userId: 'user_001',
      username: 'Demo User',
      email: 'demo@university.edu',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      coinBalance: 2850,
      totalBadges: 12,
      level: 8,
      experiencePoints: 3200
    });

    await testUser.save();
    console.log('Test user created successfully:', testUser);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

addTestUser();
