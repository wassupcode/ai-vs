import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios'; // Убедитесь, что axios установлен
import { AuthContext } from '../../context/AuthContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SettingsPanel from '../SettingsPanel'; // Или кнопка для открытия настроек
import './ChatInterface.css'; // Создайте этот файл

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSettings, setShowSettings] = useState(false); // Состояние для показа настроек
    const { token } = useContext(AuthContext); // Получаем токен для запросов

    // Функция для отправки сообщения на бэкенд
    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = { sender: 'user', text: text };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            // Получаем настройки пользователя (какую модель использовать)
            // const settingsResponse = await axios.get('/api/settings', { headers: { Authorization: `Bearer ${token}` } });
            // const selectedModel = settingsResponse.data.selectedModel || 'gemini'; // По умолчанию Gemini

            // Отправляем запрос на бэкенд
            const response = await axios.post('/api/chat/send', // Новый эндпоинт
             {
                 message: text,
                 // model: selectedModel // Передаем выбранную модель
             },
             {
                 headers: { Authorization: `Bearer ${token}` }
             });

            const aiMessage = { sender: 'ai', text: response.data.reply }; // Структура ответа от бэкенда
            setMessages(prev => [...prev, aiMessage]);

        } catch (err) {
            console.error("Error sending message:", err);
            const errorMessage = err.response?.data?.message || 'Ошибка при отправке сообщения.';
            setError(errorMessage);
            // Можно добавить сообщение об ошибке в чат
            setMessages(prev => [...prev, { sender: 'system', text: `Ошибка: ${errorMessage}` }]);
        } finally {
            setIsLoading(false);
        }
    };

     // Загрузка истории чата (если нужно)
     useEffect(() => {
         // TODO: Запрос к бэкенду для получения предыдущих сообщений
         // axios.get('/api/chat/history', { headers: { Authorization: `Bearer ${token}` } })
         //    .then(response => setMessages(response.data.messages))
         //    .catch(err => console.error("Error fetching history:", err));
     }, [token]);

    return (
        <div className="chat-layout">
             {/* Боковая панель (если есть в макете Чат.svg) */}
            {/* <div className="sidebar"> ... навигация, история чатов ... </div> */}

            <div className="chat-main">
                 {/* Кнопка настроек */}
                 <button onClick={() => setShowSettings(!showSettings)} className="settings-toggle-button">
                     Настройки
                 </button>

                <div className="chat-header">
                     {/* Заголовок чата, возможно имя AI */}
                     <h1>AI Assistant</h1>
                </div>

                <MessageList messages={messages} isLoading={isLoading} />

                {error && <div className="chat-error">Ошибка: {error}</div>}

                <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
            </div>

            {/* Модальное окно или панель настроек */}
            {showSettings && (
                <div className="settings-modal"> {/* Или встроить SettingsPanel напрямую */}
                    <SettingsPanel onClose={() => setShowSettings(false)} />
                </div>
            )}
        </div>
    );
};

export default ChatInterface;