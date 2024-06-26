import { useState } from 'react';
import { Link} from 'react-router-dom';
import { useUser } from '../../../usecontext/UserContext.jsx';
import './LoginForm.css';

const LoginForm = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);


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
      console.log(data)
      localStorage.setItem('token', data.user.token);
      setUser(data.user);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div onMouseEnter={toggleForm} className="login-form-container">
      <button>Login</button>
      {showForm && (
        <form onSubmit={handleSubmit} className="login-form">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
          <button type="submit">Iniciar sesión</button>
          <h4><Link to="/user/register">¿No estás registrado? </Link></h4>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
