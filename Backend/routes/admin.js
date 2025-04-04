const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.post('/register-admin', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Пользователь с таким email уже существует'
      });
    }

    const adminUser = new User({ 
      email, 
      password, 
      name,
      role: 'admin'
    });

    await adminUser.save();

    res.status(201).json({
      success: true,
      message: 'Администратор успешно создан',
      user: {
        id: adminUser._id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при создании администратора'
    });
  }
});

// Добавьте другие админские endpoint по аналогии

module.exports = router;