import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
const router = express.Router();

// Get user coin balance
router.get('/balance/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      userId: user.userId,
      coinBalance: user.coinBalance,
      username: user.username
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add coins to user
router.post('/add', async (req, res) => {
  try {
    const { userId, amount, description, category, metadata } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user balance
    user.coinBalance += amount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      transactionId: `tx_${Date.now()}`,
      userId,
      type: 'earn',
      amount,
      category: category || 'bonus',
      description: description || 'Coin reward',
      metadata: metadata || {}
    });

    await transaction.save();

    res.json({
      message: 'Coins added successfully',
      newBalance: user.coinBalance,
      transactionId: transaction.transactionId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deduct coins from user
router.post('/deduct', async (req, res) => {
  try {
    const { userId, amount, description, category, metadata } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user has sufficient balance
    if (user.coinBalance < amount) {
      return res.status(400).json({ error: 'Insufficient coin balance' });
    }

    // Update user balance
    user.coinBalance -= amount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      transactionId: `tx_${Date.now()}`,
      userId,
      type: 'spend',
      amount: -amount,
      category: category || 'penalty',
      description: description || 'Coin deduction',
      metadata: metadata || {}
    });

    await transaction.save();

    res.json({
      message: 'Coins deducted successfully',
      newBalance: user.coinBalance,
      transactionId: transaction.transactionId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user transaction history
router.get('/transactions/:userId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find({ userId: req.params.userId })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments({ userId: req.params.userId });

    res.json({
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalTransactions: total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Transfer coins between users
router.post('/transfer', async (req, res) => {
  try {
    const { fromUserId, toUserId, amount, description } = req.body;

    const fromUser = await User.findOne({ userId: fromUserId });
    const toUser = await User.findOne({ userId: toUserId });

    if (!fromUser || !toUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (fromUser.coinBalance < amount) {
      return res.status(400).json({ error: 'Insufficient coin balance' });
    }

    // Perform transfer
    fromUser.coinBalance -= amount;
    toUser.coinBalance += amount;

    await fromUser.save();
    await toUser.save();

    // Create transaction records
    const fromTransaction = new Transaction({
      transactionId: `tx_${Date.now()}_from`,
      userId: fromUserId,
      type: 'spend',
      amount: -amount,
      category: 'transfer',
      description: description || `Transfer to ${toUser.username}`,
      metadata: { toUserId }
    });

    const toTransaction = new Transaction({
      transactionId: `tx_${Date.now()}_to`,
      userId: toUserId,
      type: 'earn',
      amount: amount,
      category: 'transfer',
      description: description || `Transfer from ${fromUser.username}`,
      metadata: { fromUserId }
    });

    await fromTransaction.save();
    await toTransaction.save();

    res.json({
      message: 'Transfer successful',
      fromUserBalance: fromUser.coinBalance,
      toUserBalance: toUser.coinBalance,
      transactionIds: {
        from: fromTransaction.transactionId,
        to: toTransaction.transactionId
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
