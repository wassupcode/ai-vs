import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: type === 'register' ? '' : undefined
  });
  const { register, login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = type === 'register' 
      ? await register(formData) 
      : await login(formData);
    
    if (result.success) {
      navigate('/profile');
    }
  };

  return (
    <FormContainer>
      <h2>{type === 'register' ? 'Регистрация' : 'Вход'}</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <FormGroup>
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
        )}
        <FormGroup>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : type === 'register' ? 'Зарегистрироваться' : 'Войти'}
        </SubmitButton>
      </form>
      <ToggleLink onClick={() => navigate(type === 'register' ? '/login' : '/register')}>
        {type === 'register' 
          ? 'Уже есть аккаунт? Войти' 
          : 'Нет аккаунта? Зарегистрироваться'}
      </ToggleLink>
    </FormContainer>
  );
};

// Стили (можно вынести в отдельный файл)
const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 4px;
`;

const ToggleLink = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default AuthForm;