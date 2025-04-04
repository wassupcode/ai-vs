const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    defaultModel: { type: String, enum: ['gemini', 'grok'], default: 'gemini' },
    gemini: {
        apiKey: { type: String }, // Хранить ключи пользователя НЕ рекомендуется на сервере напрямую
        temperature: { type: Number, default: 0.9 },
        // другие настройки Gemini
    },
    grok: {
         apiKey: { type: String },
         // другие настройки Grok
    }
}, { _id: false }); // Не создаем отдельный ID для вложенной схемы

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    aiSettings: { type: settingsSchema, default: () => ({}) } // Добавляем поле настроек
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);