import express from 'express';
import Transaction from '../models/Transaction.js';
const router = express.Router();

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ transactionId: req.params.id });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create transaction
router.post('/', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update transaction
router.put('/:id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { transactionId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({ transactionId: req.params.id });
    if (!deletedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
