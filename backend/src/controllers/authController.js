const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@ravishagroups2.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'RavishaAdmin@2024!';

    // Direct check for admin credentials to guarantee login
    if (email.toLowerCase() === adminEmail && password === adminPassword) {
      const token = generateToken('admin_static_id_1');
      return res.json({
        token,
        user: { id: 'admin_static_id_1', email: adminEmail, name: 'Admin', role: 'admin' },
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ user: { id: req.user._id, email: req.user.email, name: req.user.name, role: req.user.role } });
};

// PUT /api/auth/password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe, changePassword };
