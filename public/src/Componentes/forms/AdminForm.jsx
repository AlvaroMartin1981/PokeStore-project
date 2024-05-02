import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminForm = () => {
  const [adminExistence, setAdminExistence] = useState(null);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const checkAdminExistence = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/admins');
      const data = await response.json();
      setAdminExistence(data.admins); // Actualiza el estado con el listado de administradores
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loginAsAdmin = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminCredentials),
      });
      if (response.ok) {
        navigate('/dashboard');
      } else {
        console.error('Error al iniciar sesión como administrador');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdminCredentials({ ...adminCredentials, [name]: value });
  };

  return (
    <div>
      <h2>Admin Form</h2>
      <label>
        Username:
        <input type="text" name="username" value={adminCredentials.username} onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={adminCredentials.password} onChange={handleInputChange} />
      </label>
      <button onClick={checkAdminExistence}>Check Admin Existence</button>
      {adminExistence && (
        <div>
          <h3>Administrators:</h3>
          <ul>
            {adminExistence.map((admin, index) => (
              <li key={index}>{admin.username}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={loginAsAdmin}>Login as Admin</button>
    </div>
  );
};

export default AdminForm;