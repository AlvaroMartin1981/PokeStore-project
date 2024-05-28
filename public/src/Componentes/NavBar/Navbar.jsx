import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../usecontext/UserContext.jsx';
import Cart from './Cart/Cart.jsx';
import SearchBar from './SearchBar/SearchBar.jsx';
import LoginForm from './LoginForm/LoginForm.jsx';
import NavLinks from './NavLinks/NavLinks.jsx';

import './Navbar.css';

const Navbar = () => {
  const { user, Logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="hamburger" onClick={handleMenuToggle}>
        ☰
      </div>
      <NavLinks isMenuOpen={isMenuOpen} />
      <SearchBar />
      <div className='nav-info-person'>
        <Cart />
        {user ? (
          <>
            <h3>Welcome, {user.name}</h3>
            <Link to="/myprofile" className="profile-icon">👤</Link>
            <button onClick={() => Logout()}>Cerrar sesión</button>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default Navbar;
