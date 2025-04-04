const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return { valid: true, user };
  } catch (err) {
    return { valid: false, error: err.message };
  }
};

module.exports = {
  generateToken,
  verifyToken
};