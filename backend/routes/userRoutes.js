const express = require('express');
const router = express.Router();
const User = require('../models/user');

// List Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ deleted: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add User
router.post('/', async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  const user = new User({ email, firstName, lastName, password });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.deleted = true;
      await user.save();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
