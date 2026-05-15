const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Check credentials
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password with hash
    const passwordMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        email: process.env.ADMIN_EMAIL,
        role: 'admin',
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify token endpoint
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    message: 'Token is valid',
    user: req.user,
  });
});

module.exports = router;
