import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  if (user?.role !== 'admin') {
    return <div>Доступ запрещен</div>;
  }

  return (
    <AdminContainer>
      <h2>Панель администратора</h2>
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <UserList>
          {users.map(user => (
            <UserItem key={user._id}>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.role}</div>
            </UserItem>
          ))}
        </UserList>
      )}
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const UserList = styled.div`
  margin-top: 2rem;
`;

const UserItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

export default AdminPanel;