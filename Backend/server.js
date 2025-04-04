// --- Импорты ---
require('dotenv').config(); // Загружает переменные окружения из файла .env в process.env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- Импорт маршрутов ---
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const chatRoutes = require('./routes/chat'); // Маршруты для чата и AI
const settingsRoutes = require('./routes/settings'); // Маршруты для настроек пользователя
// TODO: Возможно понадобятся маршруты для профиля пользователя, если не управляются через auth или settings
// const profileRoutes = require('./routes/profile');

// --- Импорт Middleware ---
const authMiddleware = require('./middleware/auth'); // Проверка JWT токена
const adminMiddleware = require('./middleware/admin'); // Проверка прав администратора

// --- Инициализация Express приложения ---
const app = express();

// --- Базовое Middleware ---

// CORS (Cross-Origin Resource Sharing)
// Для разработки можно оставить так, для продакшена лучше настроить более строго:
// const corsOptions = {
//   origin: 'YOUR_FRONTEND_URL', // Укажите URL вашего фронтенда
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
app.use(cors()); // Разрешает запросы со всех источников (удобно для разработки)

// Парсер JSON тел запросов
app.use(express.json());

// Логгирование запросов (опционально, для отладки)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// --- Подключение к базе данных MongoDB ---
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('FATAL ERROR: MONGO_URI is not defined in .env file.');
    process.exit(1); // Выход из приложения, если строка подключения отсутствует
}

mongoose.connect(mongoUri)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        // Можно добавить логику повторного подключения или завершить процесс
        process.exit(1);
    });

// --- Определение маршрутов API ---

// Маршруты аутентификации (вход, регистрация) - обычно публичные
app.use('/api/auth', authRoutes);

// Маршруты чата - требуют аутентификации пользователя
app.use('/api/chat', authMiddleware, chatRoutes);

// Маршруты настроек - требуют аутентификации пользователя
app.use('/api/settings', authMiddleware, settingsRoutes);

// Маршруты администрирования - требуют аутентификации и прав администратора
app.use('/api/admin', authMiddleware, adminMiddleware, adminRoutes);

// Маршруты профиля пользователя (если нужны) - требуют аутентификации
// app.use('/api/profile', authMiddleware, profileRoutes);

// --- Обработка маршрута не найдено (404) ---
// Должна идти после всех определённых маршрутов
app.use((req, res, next) => {
    res.status(404).json({ message: `Маршрут не найден: ${req.method} ${req.originalUrl}` });
});

// --- Централизованный обработчик ошибок ---
// Должен быть последним middleware в цепочке
// Express определяет его как обработчик ошибок по наличию 4 аргументов
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err); // Логируем полную ошибку на сервере

    // Определяем статус код ошибки
    const statusCode = err.statusCode || 500; // По умолчанию 500 Internal Server Error

    // Формируем сообщение об ошибке для клиента
    // В продакшене лучше не отправлять детали системных ошибок клиенту
    const message = (process.env.NODE_ENV === 'production' && statusCode === 500)
        ? 'Внутренняя ошибка сервера.'
        : err.message || 'Произошла неизвестная ошибка.';

    res.status(statusCode).json({
        message: message,
        // Можно добавить поле 'errors' для ошибок валидации и т.п.
        ...(err.errors && { errors: err.errors }),
        // В режиме разработки можно добавить stack trace (не для продакшена!)
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
});


// --- Запуск сервера ---
const PORT = process.env.PORT || 5000; // Используем порт из .env или 5000 по умолчанию

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// --- Обработка сигналов для корректного завершения ---
const gracefulShutdown = (signal) => {
    console.log(`\nReceived ${signal}. Closing server gracefully.`);
    server.close(() => {
        console.log('HTTP server closed.');
        mongoose.connection.close(false).then(() => {
            console.log('MongoDB connection closed.');
            process.exit(0);
        }).catch(err => {
             console.error('Error closing MongoDB connection:', err);
             process.exit(1);
        });
    });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Сигнал завершения от системы (например, Docker, systemd)
process.on('SIGINT', () => gracefulShutdown('SIGINT')); // Сигнал прерывания (Ctrl+C)