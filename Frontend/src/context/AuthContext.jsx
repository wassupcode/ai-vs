import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const { data } = await axios.get('/api/auth/me');
          if (data.success) {
            setUser(data.user);
          }
        }
      } catch (err) {
        logout();
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Регистрация
  const register = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/register', formData);
      
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      setError(null);
      
      navigate('/profile');
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return { success: false, error: err.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  // Логин
  const login = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/login', formData);
      
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      setError(null);
      
      navigate('/profile');
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return { success: false, error: err.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  // Выход
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        register, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);