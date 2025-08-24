import mongoose from 'mongoose';

const userTaskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  taskId: { type: String, required: true },
  status: { type: String, enum: ['accepted', 'in_progress', 'completed', 'expired'], required: true },
  progress: { type: Number, min: 0, max: 100 },
  acceptedAt: { type: String, required: true },
  completedAt: { type: String },
  submissionUrl: { type: String },
});

export default mongoose.model('UserTask', userTaskSchema);
