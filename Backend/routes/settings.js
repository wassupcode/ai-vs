const express = require('express');
const User = require('../Models/User');

const router = express.Router();

// Получить текущие настройки пользователя
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('aiSettings');
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json(user.aiSettings || {}); // Возвращаем настройки или пустой объект
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: 'Ошибка при получении настроек' });
    }
});

// Обновить настройки пользователя
router.put('/', async (req, res) => {
    const { defaultModel, gemini, grok } = req.body; // Получаем новые настройки из тела запроса

    // Простая валидация (можно расширить)
    const validModels = ['gemini', 'grok'];
    if (defaultModel && !validModels.includes(defaultModel)) {
        return res.status(400).json({ message: 'Недопустимая модель по умолчанию' });
    }

    try {
        // Используем findByIdAndUpdate для атомарного обновления
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: { // Используем $set для обновления только переданных полей
                    'aiSettings.defaultModel': defaultModel,
                    'aiSettings.gemini': { ...gemini }, // Обновляем все настройки gemini
                    'aiSettings.grok': { ...grok }     // Обновляем все настройки grok
                    // Добавьте более гранулярное обновление при необходимости
                }
            },
            { new: true, runValidators: true, select: 'aiSettings' } // Возвращаем обновленный документ
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.json(updatedUser.aiSettings); // Возвращаем обновленные настройки

    } catch (error) {
        console.error("Error updating settings:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Ошибка валидации данных', errors: error.errors });
        }
        res.status(500).json({ message: 'Ошибка при обновлении настроек' });
    }
});

module.exports = router;