import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/vitacoin';

async function testConnection() {
  try {
    console.log('Testing Local MongoDB connection...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Local MongoDB connection successful!');
    
    // Check if we can list databases
    const adminDb = mongoose.connection.db.admin();
    const databases = await adminDb.listDatabases();
    console.log('Available databases:', databases.databases.map(db => db.name));
    
    // Check collections in vitacoin database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in vitacoin database:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    await mongoose.disconnect();
    console.log('Connection closed');
  } catch (error) {
    console.error('❌ Local MongoDB connection failed:');
    console.error(error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('\nPossible issues:');
      console.log('1. Make sure MongoDB is running locally: mongod');
      console.log('2. Check if MongoDB service is started');
      console.log('3. Verify the connection string: mongodb://localhost:27017/vitacoin');
    }
  }
}

testConnection();
