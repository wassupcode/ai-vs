const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// @route    POST api/auth/register
// @desc     Регистрация пользователя
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Проверка существования пользователя
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: 'Пользователь с таким email уже существует'
      });
    }

    // Создание пользователя
    user = new User({
      email,
      password,
      name
    });

    await user.save();

    // Генерация токена
    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера при регистрации'
    });
  }
});

// @route    POST api/auth/login
// @desc     Авторизация пользователя
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Неверные учетные данные'
      });
    }

    // Проверка пароля
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Неверные учетные данные'
      });
    }

    // Обновление времени последнего входа
    user.lastLogin = Date.now();
    await user.save();

    // Генерация токена
    const token = user.generateAuthToken();

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера при авторизации'
    });
  }
});

// @route    GET api/auth/me
// @desc     Получение данных текущего пользователя
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера при получении профиля'
    });
  }
});

module.exports = router;