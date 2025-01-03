import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import UserList from './Components/UserList';
import axiosInstance from './services/axiosInstance';
import Header from './Components/Common/Header';
import AuthForm from './Components/Auth/AuthForm';

//import OrderList from './Components/OrderList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
  };
  return (
    
    <Router>
      
    <div>
      <Header />
      <div style={contentStyle}>
        <Routes>
          <Route path="/users" component={UserList} />
          <Route path="/auth" element={<AuthForm onAuthSuccess={handleAuthSuccess} />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}
const contentStyle = {
  padding: '20px',
};
export default App;
