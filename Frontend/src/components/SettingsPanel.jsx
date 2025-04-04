import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './SettingsPanel.css'; // Создайте файл стилей

const SettingsPanel = ({ onClose }) => {
    const [settings, setSettings] = useState({
        defaultModel: 'gemini',
        gemini: { temperature: 0.9 /* ...другие */ },
        grok: { /* ... */ }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { token } = useContext(AuthContext);

    // Загрузка настроек при открытии панели
    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/settings', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                // Устанавливаем значения по умолчанию, если они не пришли с бэкенда
                setSettings(prev => ({
                    ...prev, // Сохраняем структуру по умолчанию
                    ...response.data, // Перезаписываем тем, что пришло
                    gemini: { ...prev.gemini, ...response.data.gemini }, // Глубокое слияние для вложенных
                    grok: { ...prev.grok, ...response.data.grok }
                }));
            })
            .catch(err => {
                console.error("Error fetching settings:", err);
                setError('Не удалось загрузить настройки.');
            })
            .finally(() => setIsLoading(false));
    }, [token]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const [section, key] = name.split('.'); // Обработка вложенных полей типа "gemini.temperature"

        setSuccess(null); // Сброс сообщения об успехе при изменении

        if (key) { // Если поле вложенное (e.g., gemini.temperature)
            setSettings(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [key]: type === 'number' ? parseFloat(value) : value
                }
            }));
        } else { // Если поле верхнего уровня (e.g., defaultModel)
             setSettings(prev => ({
                 ...prev,
                 [name]: value
             }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.put('/api/settings', settings, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Настройки успешно сохранены!');
        } catch (err) {
            console.error("Error saving settings:", err);
            setError(err.response?.data?.message || 'Не удалось сохранить настройки.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="settings-panel">
             <button onClick={onClose} className="close-button">&times;</button>
             <h2>Настройки AI</h2>
             {isLoading && <p>Загрузка...</p>}
             {error && <p className="error-message">{error}</p>}
             {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label htmlFor="defaultModel">Модель по умолчанию:</label>
                    <select
                        id="defaultModel"
                        name="defaultModel"
                        value={settings.defaultModel || 'gemini'}
                        onChange={handleChange}
                    >
                        <option value="gemini">Gemini (Google)</option>
                        <option value="grok" disabled={!process.env.REACT_APP_GROK_ENABLED}> {/* Отключаем если недоступен */}
                            Grok (xAI) { !process.env.REACT_APP_GROK_ENABLED && "(Недоступно)"}
                        </option>
                    </select>
                </div>

                <fieldset>
                    <legend>Настройки Gemini</legend>
                    {/* Пример настройки температуры */}
                    <div className="form-group">
                         <label htmlFor="gemini.temperature">Температура:</label>
                         <input
                             type="number"
                             id="gemini.temperature"
                             name="gemini.temperature"
                             value={settings.gemini?.temperature || 0.9}
                             onChange={handleChange}
                             min="0" max="1" step="0.1"
                         />
                         <small>От 0 (более детерминировано) до 1 (более креативно)</small>
                    </div>
                     {/* Добавьте другие настройки Gemini (topK, topP, maxTokens), если нужно */}
                </fieldset>

                 <fieldset /* disabled={!process.env.REACT_APP_GROK_ENABLED} */ > {/* Отключаем если недоступен */}
                    <legend>Настройки Grok { !process.env.REACT_APP_GROK_ENABLED && "(Недоступно)"}</legend>
                     {/* Добавьте настройки Grok, когда они станут известны */}
                      <p><small>Настройки для Grok будут доступны позже.</small></p>
                </fieldset>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Сохранение...' : 'Сохранить настройки'}
                </button>
            </form>
        </div>
    );
};

export default SettingsPanel;