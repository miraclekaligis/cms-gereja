const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (!process.env.ADMIN_PASSWORD_HASH) {
    return res.status(500).json({ message: 'ADMIN_PASSWORD_HASH is not configured' });
  }

  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);

  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return res.json({
    token,
    user: { email, role: 'admin' },
  });
};

const verify = (req, res) => {
  return res.json({ valid: true, user: req.user });
};

module.exports = {
  login,
  verify,
};
