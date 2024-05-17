import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../usecontext/UserContext.jsx';
import './AuthForm.css';

const RegisterForm = ({ role }) => {
  const { user,setUser,register } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  let rol = role;

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: rol,
    wishList: [],
    comments:[]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'username' && !value.startsWith('@')) {
      formattedValue = '@' + value;
    }
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:2999/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }
      const userData = await response.json();
     register(userData.user,userData.token

     )
      setUser(userData.user);
      navigate('/myprofile');
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      setError(error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
    {user ?(
      <h3>No te puedes registrar dos veces</h3>
    ):(
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={isSubmitting}>Registrarse</button>
    </form>
    )}
    </>
  );
};

export default RegisterForm;
