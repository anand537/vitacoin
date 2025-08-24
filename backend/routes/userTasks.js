import express from 'express';
import UserTask from '../models/UserTask.js';
const router = express.Router();

// Get all user tasks
router.get('/', async (req, res) => {
  try {
    const userTasks = await UserTask.find();
    res.json(userTasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user task by userId and taskId
router.get('/:userId/:taskId', async (req, res) => {
  try {
    const userTask = await UserTask.findOne({ userId: req.params.userId, taskId: req.params.taskId });
    if (!userTask) return res.status(404).json({ error: 'UserTask not found' });
    res.json(userTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create user task
router.post('/', async (req, res) => {
  try {
    const newUserTask = new UserTask(req.body);
    await newUserTask.save();
    res.status(201).json(newUserTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user task
router.put('/:userId/:taskId', async (req, res) => {
  try {
    const updatedUserTask = await UserTask.findOneAndUpdate(
      { userId: req.params.userId, taskId: req.params.taskId },
      req.body,
      { new: true }
    );
    if (!updatedUserTask) return res.status(404).json({ error: 'UserTask not found' });
    res.json(updatedUserTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user task
router.delete('/:userId/:taskId', async (req, res) => {
  try {
    const deletedUserTask = await UserTask.findOneAndDelete({ userId: req.params.userId, taskId: req.params.taskId });
    if (!deletedUserTask) return res.status(404).json({ error: 'UserTask not found' });
    res.json({ message: 'UserTask deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
