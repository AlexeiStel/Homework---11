import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    await login(username, password);
    navigate('/notes');
  };
  

  return (
    <div className='login'>
      <h2>Вход в Заметки</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Логин" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />

      <Button type="primary" onClick={handleLogin}>
        Войти
      </Button>
    </div>
  );
};

export default Login;
