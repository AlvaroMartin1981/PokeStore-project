import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../usecontext/UserContext.jsx'

const LoginForm = () => {
  const { user, setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2999/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }
      const data = await response.json();
      console.log('Inicio de sesión exitoso:', data);
      localStorage.setItem('token', 'your_token_here')
      setUser(data.user);
      navigate('/pokemon'); // Redirige al usuario a la ruta '/pokemon' después del inicio de sesión
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;