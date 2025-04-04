const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require('../Models/User'); // Если настройки хранятся у пользователя

const router = express.Router();

// --- Настройка Gemini ---
let genAI;
if (process.env.GOOGLE_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
} else {
    console.warn("GOOGLE_API_KEY is not set. Gemini API will not be available.");
}

// --- Подготовка для Grok (когда API будет доступно) ---
// const GrokClient = require('grok-sdk'); // Примерное имя
// let grokClient;
// if (process.env.GROK_API_KEY) {
//    grokClient = new GrokClient(process.env.GROK_API_KEY);
// } else {
//    console.warn("GROK_API_KEY is not set. Grok API will not be available.");
// }


// Эндпоинт для отправки сообщения AI
router.post('/send', async (req, res) => {
    const { message /*, model */ } = req.body; // Получаем сообщение и опционально модель
    const userId = req.user.id; // ID пользователя из middleware/auth.js

    if (!message) {
        return res.status(400).json({ message: "Сообщение не может быть пустым" });
    }

    try {
        // --- Получение настроек пользователя (пример) ---
        // const user = await User.findById(userId).select('aiSettings');
        // const selectedModel = model || user?.aiSettings?.defaultModel || 'gemini'; // Определяем модель
        // const modelSettings = user?.aiSettings?.[selectedModel] || {}; // Настройки для конкретной модели

        // Пока используем только Gemini по умолчанию
        const selectedModel = 'gemini';

        let reply = "Извините, я не могу сейчас ответить."; // Ответ по умолчанию

        if (selectedModel === 'gemini') {
            if (!genAI) {
                return res.status(503).json({ message: "Gemini API недоступен. Проверьте API ключ на сервере." });
            }
             // Настройки модели Gemini (можно сделать настраиваемыми)
             const geminiModel = genAI.getGenerativeModel({
                 model: "gemini-1.5-flash", // Или другая подходящая модель
                 // generationConfig: {
                 //     temperature: modelSettings.temperature || 0.9,
                 //     topK: modelSettings.topK || 1,
                 //     topP: modelSettings.topP || 1,
                 //     maxOutputTokens: modelSettings.maxTokens || 2048,
                 // },
             });
            const result = await geminiModel.generateContent(message);
            const response = result.response;
            reply = response.text();

        } else if (selectedModel === 'grok') {
            // --- Логика для Grok API (когда будет доступно) ---
            if (!process.env.GROK_API_KEY) { // Используем переменную окружения напрямую, т.к. клиент не инициализирован
                 return res.status(503).json({ message: "Grok API недоступен. Проверьте API ключ на сервере." });
            }
             reply = "Интеграция с Grok еще не реализована.";
             // const grokResponse = await grokClient.generate({ prompt: message, ...modelSettings });
             // reply = grokResponse.text;
        } else {
             return res.status(400).json({ message: "Неизвестная модель AI выбрана." });
        }

        // TODO: Сохранить сообщение пользователя и ответ AI в историю чата в БД

        res.json({ reply });

    } catch (error) {
        console.error(`Error processing ${selectedModel} request:`, error);
        res.status(500).json({ message: `Ошибка при обработке запроса к ${selectedModel}.` });
    }
});

// Эндпоинт для получения истории чата (пример)
router.get('/history', async (req, res) => {
     const userId = req.user.id;
     try {
         // TODO: Загрузить историю из БД для userId
         const messages = [
             // { sender: 'ai', text: 'Привет! Чем могу помочь?' } // Пример
         ];
         res.json({ messages });
     } catch (error) {
         console.error("Error fetching chat history:", error);
         res.status(500).json({ message: "Ошибка при загрузке истории чата." });
     }
 });


module.exports = router;