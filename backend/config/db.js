import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use a fallback MongoDB connection string if MONGO_URI is not set
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/vitacoin';
    
    // MongoDB connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    await mongoose.connect(mongoURI, options);
    console.log('✅ MongoDB Connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Close connection on app termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (err) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', err.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is running locally: mongod');
    console.log('2. Or use MongoDB Atlas cloud database');
    console.log('3. Check your MONGO_URI in .env file');
    console.log('4. For development, you can use: mongodb://localhost:27017/vitacoin');
    
    // Don't exit the process immediately for development
    console.log('\n⚠️  Continuing without database connection (mock data will be used)');
  }
};

export default connectDB;
