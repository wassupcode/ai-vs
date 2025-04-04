import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Пожалуйста, войдите в систему</div>;
  }

  return (
    <ProfileContainer>
      <h2>Профиль пользователя</h2>
      <ProfileInfo>
        <Avatar>
          {user.avatar ? (
            <img src={user.avatar} alt="Аватар" />
          ) : (
            <div>{user.name.charAt(0).toUpperCase()}</div>
          )}
        </Avatar>
        <Details>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
        </Details>
      </ProfileInfo>
      <LogoutButton onClick={logout}>Выйти</LogoutButton>
    </ProfileContainer>
  );
};

// Стили
const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: 8px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-right: 1.5rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Details = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
  }
`;

const LogoutButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.error};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export default Profile;