import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    login(username, password);
    navigate('/notes'); 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Username" name="username">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default Auth;
