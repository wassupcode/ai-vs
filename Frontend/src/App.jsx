import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// --- Основные страницы и компоненты ---
import AuthForm from './components/auth/AuthForm'; // Форма входа/регистрации
import PrivateRoute from './components/auth/PrivateRoute'; // Защита маршрутов
import MainLayout from './components/layout/MainLayout'; // Новый компонент основного макета с сайдбаром
import ChatInterface from './components/chat/ChatInterface'; // Компонент интерфейса чата
import SettingsPanel from './components/settings/SettingsPanel'; // Компонент настроек (перемещен для логики)
import AdminPanel from './components/admin/AdminPanel'; // Панель администратора (убедитесь, что имя файла совпадает)

// --- Компоненты для новых инструментов (заглушки) ---
import WebsiteAnalysis from './components/tools/WebsiteAnalysis';
import TextGeneration from './components/tools/TextGeneration';
import ImageGeneration from './components/tools/ImageGeneration';
import VideoProcessing from './components/tools/VideoProcessing';
import CodeAssistant from './components/tools/CodeAssistant';

// --- Стили ---
import './index.css'; // Глобальные стили или стили App

// Компонент для редиректа после входа
function HomeRedirect() {
    // Редирект на основной макет приложения после входа
    // Можно добавить логику для редиректа админа на /admin, если нужно
    // const { user } = useContext(AuthContext);
    // if (user?.isAdmin) {
    //     return <Navigate to="/admin" replace />;
    // }
    // По умолчанию перенаправляем в основной раздел приложения (например, первый чат или дашборд)
    return <Navigate to="/app" replace />;
}

// Компонент-заглушка для страниц, которые еще не реализованы
const NotImplemented = ({ featureName }) => (
    <div style={{ padding: '20px' }}>
        <h2>{featureName || 'Функционал в разработке'}</h2>
        <p>Эта страница или функция скоро появится!</p>
    </div>
);

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* --- Публичные маршруты --- */}
                    <Route path="/login" element={
                        <AuthContext.Consumer>
                            {({ user, loading }) => {
                                if (loading) return <div>Загрузка...</div>;
                                return user ? <Navigate to="/" replace /> : <AuthForm isRegister={false} />;
                            }}
                        </AuthContext.Consumer>
                    } />
                    <Route path="/register" element={
                        <AuthContext.Consumer>
                             {({ user, loading }) => {
                                if (loading) return <div>Загрузка...</div>;
                                return user ? <Navigate to="/" replace /> : <AuthForm isRegister={true} />;
                            }}
                        </AuthContext.Consumer>
                    } />

                    {/* --- Главный редирект --- */}
                    <Route path="/" element={
                        <AuthContext.Consumer>
                            {({ user, loading }) => {
                                if (loading) return <div>Загрузка...</div>; // Или использовать спиннер/скелет
                                return user ? <HomeRedirect /> : <Navigate to="/login" replace />;
                            }}
                        </AuthContext.Consumer>
                    } />

                    {/* --- Основное приложение (защищенные маршруты) --- */}
                    <Route
                        path="/app"
                        element={
                            <PrivateRoute>
                                <MainLayout /> {/* Основной макет с сайдбаром и областью контента */}
                            </PrivateRoute>
                        }
                    >
                        {/* Вложенные маршруты, которые будут отображаться внутри MainLayout */}
                        <Route index element={<Navigate to="chat" replace />} /> {/* Редирект по умолчанию на /app/chat */}
                        <Route path="chat" element={<ChatInterface />} />
                        <Route path="chat/:chatId" element={<ChatInterface />} /> {/* Маршрут для конкретного чата */}
                        <Route path="settings" element={<SettingsPanel />} />

                        {/* Маршруты для новых инструментов из сайдбара */}
                        <Route path="website-analysis" element={<WebsiteAnalysis />} />
                        <Route path="text-generation" element={<TextGeneration />} />
                        <Route path="image-generation" element={<ImageGeneration />} />
                        <Route path="video-processing" element={<VideoProcessing />} />
                        <Route path="code-assistant" element={<CodeAssistant />} />
                         {/* Можно добавить другие разделы, если нужно */}
                    </Route>

                    {/* --- Админ панель (отдельный защищенный маршрут) --- */}
                    <Route
                        path="/admin"
                        element={
                            // Добавьте проверку роли 'admin' в PrivateRoute или создайте AdminRoute
                            <PrivateRoute requiredRole="admin">
                                <AdminPanel />
                            </PrivateRoute>
                        }
                    />
                     {/* Добавьте сюда другие маршруты админки, если нужно */}


                    {/* --- Страница не найдена (404) --- */}
                    <Route path="*" element={
                         <div style={{ padding: '50px', textAlign: 'center' }}>
                             <h1>404 - Страница не найдена</h1>
                             <p>Извините, запрошенная страница не существует.</p>
                             {/* Можно добавить ссылку на главную */}
                             <a href="/">На главную</a>
                         </div>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;