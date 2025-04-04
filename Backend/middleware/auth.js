const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // 1. Получаем токен из заголовков
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Пожалуйста, авторизуйтесь для доступа'
      });
    }

    // 2. Верифицируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Находим пользователя
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    // 4. Добавляем пользователя в запрос
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Невалидный токен авторизации'
    });
  }
};