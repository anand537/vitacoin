import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  coinReward: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['available', 'in_progress', 'completed', 'expired'], required: true },
  deadline: { type: String, required: true },
  category: { type: String, enum: ['quiz', 'assignment', 'forum', 'project', 'reading', 'video'], required: true },
});

export default mongoose.model('Task', taskSchema);
