import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useUser } from '../../usecontext/UserContext.jsx';
import './LoginForm.css';

const LoginForm = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
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
      localStorage.setItem('token', data.token);
      setUser(data.user); // Aquí actualizamos el estado del usuario después del inicio de sesión
      navigate('/pokemon');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
       <form onSubmit={handleSubmit} className="login-form">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
          <button type="submit">Iniciar sesión</button>
          <h4><Link to="/register">¿No estás registrado? </Link></h4>
        </form>
    </>
  );
};

export default LoginForm;