import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Удаляем токен
    navigate('/'); // Перенаправляем на страницу входа
  };

  const isAuthenticated = !!localStorage.getItem('token'); // Проверяем наличие токена

  return (
    <header className="header">
      <h1 className="header-title" onClick={() => navigate('/books')}>Bookstore</h1>
      <div className="header-actions">
        {isAuthenticated ? (
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="btn-login" onClick={() => navigate('/auth')}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
