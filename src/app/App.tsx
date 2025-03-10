import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NoteProvider } from '../context/NoteContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Login from '../features/auth/components/Login';
import NotesPage from './components/NotesPage';
import '../styles/App.css';

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NoteProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={<PrivateRoute element={<NotesPage />} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </NoteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
