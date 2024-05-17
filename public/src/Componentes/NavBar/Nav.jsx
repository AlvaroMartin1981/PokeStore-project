import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../usecontext/UserContext.jsx';
import { useProducts } from '../../usecontext/ProductContext.jsx';
import Cart from '../Cart/Cart.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import LoginForm from '../Forms/LoginForm.jsx';
import Logout from '../Logout.jsx';
import './Navbar.css';

const Nav = () => {
  const { user } = useUser();
  const products = useProducts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const typesSet = new Set();
    products.forEach(product => {
      product.tipo.forEach(type => typesSet.add(type));
    });
    setProductTypes([...typesSet]);
  }, [products]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="hamburger" onClick={handleMenuToggle}>
          ☰
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li> 
          <li><Link to="/pokemon">Pokemon</Link></li>
          <li 
            className="dropdown" 
            onMouseEnter={handleDropdownToggle} 
            onMouseLeave={handleDropdownToggle}
          >
            <span>Tipos</span>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                {productTypes.map((type, index) => (
                  <li key={index}><Link to={`/pokemon/tipo/${type.toLowerCase()}`}>{type}</Link></li>
                ))}
              </ul>
            )}
          </li>
          <li><Link to="/pokemon/legendarios">Legendarios</Link></li>
          <li><Link to="/pokemon/misticos">Místicos</Link></li>
        </ul>
        <SearchBar />
        <div className='nav-info-person'>
          <Cart />
          {user ? (
            <>
              <h3>Welcome, {user.name}</h3>
              <Link to="/myprofile" className="profile-icon">👤</Link>
              <Logout />
            </>
          ) : (
            <LoginForm />
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
