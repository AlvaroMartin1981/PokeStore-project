import React from 'react';
import { Link } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = ({ isMenuOpen, handleMenuToggle }) => {
  return (
    <div className='navLinks'>
      <div className="hamburger" onClick={handleMenuToggle}>
        ☰
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/todos"> All Pokemon</Link></li>
        <li><Link to="/tipos">Tipos</Link></li>
        <li><Link to="/pokemon/legendarios">Legendarios</Link></li>
        <li><Link to="/pokemon/misticos">Místicos</Link></li>
      </ul>
    </div>
  );
};

export default NavLinks;
