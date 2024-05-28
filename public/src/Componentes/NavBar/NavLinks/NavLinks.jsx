import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../../usecontext/ProductContext.jsx';
import './NavLinks.css';

const NavLinks = ({ isMenuOpen }) => {
  const products = useProducts();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const typesSet = new Set();
    products.forEach(product => {
      product.tipo.forEach(type => typesSet.add(type));
    });
    setProductTypes([...typesSet]);
  }, [products]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='navLinks'>
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
    </div>
  );
};

export default NavLinks;
