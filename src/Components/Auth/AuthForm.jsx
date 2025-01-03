import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import ErrorList from '../Common/ErrorList';
import { parseServerErrors } from '../../services/errorHandler';
import './AuthForm.css';

const AuthForm = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [thirdName, setThirdName] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Очищаем предыдущие ошибки

    const payload = isLoginMode
      ? { login: email, password }
      : { login: email, password, firstName, secondName, thirdName };

    try {
      if (isLoginMode) {
        const response = await axiosInstance.post('/api/net/User/Login', payload);
        localStorage.setItem('token', response.data.token);
        onAuthSuccess();
        navigate('/books');
      } else {
        await axiosInstance.post('/User/Register', payload);
        setIsLoginMode(true);
      }
    } catch (error) {
      const parsedErrors = parseServerErrors(error.response?.data);
      setErrors(parsedErrors);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrors([]);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLoginMode && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Second Name"
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Third Name"
                  value={thirdName}
                  onChange={(e) => setThirdName(e.target.value)}
                />
              </div>
            </>
          )}
          <button className="btn-submit" type="submit">
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>
        <ErrorList errors={errors} /> {/* Используем компонент для отображения ошибок */}
        <button className="btn-switch" onClick={toggleMode}>
          {isLoginMode ? 'Don’t have an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;