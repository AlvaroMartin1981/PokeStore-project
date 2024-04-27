import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'; 
import { UserContext } from './UserProvider';

const RegisterForm = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToProducts, setRedirectToProducts] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2999/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }
      const data = await response.json();
      console.log('Registro exitoso:', data);
      setUser(data.user);
      setRedirectToProducts(true); 
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  
return redirectToProducts ? <Redirect to="/productos" /> : (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Registrarse</button>
    </form>
  );
};  
export default RegisterForm;
