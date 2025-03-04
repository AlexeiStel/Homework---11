import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useAuth } from '../../../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    await login(); 
    navigate('/notes');
  };

  return (
    <div className='login'>
      <h2>Вход в Заметки</h2>
      <Button type="primary" onClick={handleLogin}>
        Войти
      </Button>
    </div>
  );
};

export default Login;
