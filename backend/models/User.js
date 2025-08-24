import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  coinBalance: { type: Number, required: true, min: 0 },
  totalBadges: { type: Number, required: true, min: 0 },
  level: { type: Number, required: true, min: 1 },
  experiencePoints: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
