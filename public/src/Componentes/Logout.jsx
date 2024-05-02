import { useState } from 'react';

const Logout = () => {
  const [logoutError, setLogoutError] = useState(null);

  const handleLogout = async () => {
    try {
      // Obtener el token almacenado en el frontend (ejemplo: desde el almacenamiento local)
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8080/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token // Enviar el token al backend
        },
      });
      
      if (response.ok) {
        // Manejar el logout exitoso y eliminar el token almacenado en el frontend
        localStorage.removeItem('token');
        console.log('Token enviado al backend:', token);

      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setLogoutError('Error al cerrar sesión. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <li>
      <button onClick={handleLogout}>Logout</button>
    </li>
  );
};

export default Logout;