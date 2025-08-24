import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  type: { type: String, enum: ['earn', 'spend', 'penalty', 'bonus'], required: true },
  amount: { type: Number, required: true },
  category: { type: String, enum: ['quiz', 'forum', 'daily_claim', 'achievement', 'penalty', 'reward_purchase', 'bonus'], required: true },
  description: { type: String, required: true },
  metadata: { type: Object },
  creator: { type: String },
});

export default mongoose.model('Transaction', transactionSchema);
