import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../usecontext/UserContext.jsx';

const Logout = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <>
    <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Logout;
