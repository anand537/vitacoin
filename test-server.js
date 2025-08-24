import { spawn } from 'child_process';
import path from 'path';

console.log('Testing backend server startup...');

// Mock environment variables for testing
process.env.MONGO_URI = 'mongodb://localhost:27017/vitacoin';
process.env.JWT_SECRET = 'your-secret-key-here';

console.log('✅ Environment variables are set');

// Try to start the server
console.log('Starting backend server...');

const serverProcess = spawn('node', ['backend/server.js'], {
  cwd: process.cwd(),
  env: process.env
});

serverProcess.stdout.on('data', (data) => {
  console.log(`Server: ${data.toString().trim()}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`Server Error: ${data.toString().trim()}`);
});

serverProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Server started successfully');
  } else {
    console.log(`❌ Server exited with code ${code}`);
  }
});

// Kill the server after 5 seconds
setTimeout(() => {
  serverProcess.kill();
  console.log('Test completed');
}, 5000);
