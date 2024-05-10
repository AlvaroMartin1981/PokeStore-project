import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../usecontext/ProductContext.jsx';
import { useUser } from '../../usecontext/UserContext.jsx'
import Cart from '../Cart/Cart.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import LoginForm from '../Forms/LoginForm.jsx';
import Logout from '../Logout.jsx';
import './Navbar.css';

const Nav = () => {
  const { pokemon, items } = useProducts();
  const { user } = useUser();
  const [showPokemonTypes, setShowPokemonTypes] = useState(false);
  const [showItemTypes, setShowItemTypes] = useState(false);

  const pokemonTypes = Array.from(new Set(pokemon.map(p => p.tipo).flat()));
  const itemTypes = Array.from(new Set(items.map(i => i.tipo).flat()));

 
  const getUsernameFromEmail = (email) => {
    return email.split('@')[0];
  };


  return (
    <>
      <nav>
        <ul>
          <li onMouseEnter={() => setShowPokemonTypes(true)} onMouseLeave={() => setShowPokemonTypes(false)}>
            <Link to="/pokemon">Pokemon</Link>
            <ul className={showPokemonTypes ? 'show' : ''}>
              <li><Link to='pokemon/tipo'>Tipos</Link></li>
              <li><Link to="/pokemon/legendarios">Legendarios</Link></li>
              <li><Link to="/pokemon/misticos">Místicos</Link></li>
              {pokemonTypes.map((tipo, index) => (
                <li key={index}><Link to={`/pokemon/tipo/${tipo}`}>{tipo}</Link></li>
              ))}
            </ul>
          </li>
          <li onMouseEnter={() => setShowItemTypes(true)} onMouseLeave={() => setShowItemTypes(false)}>
            <Link to="/items">Items</Link>
            <ul className={showItemTypes ? 'show' : ''}>
              {itemTypes.map((tipo, index) => (
                <li key={index}><Link to={`/items/tipo/${tipo}`}>{tipo}</Link></li>
              ))}
            </ul>
          </li>
        </ul>
        <SearchBar />
        <div className='nav_info_person'>
        <Cart />
        {user ? (
          <>
            <li>Welcome, {getUsernameFromEmail(user.email)}</li>
            {console.log(user)}
            <Logout />
          </>
        ) : (
          <>
             <LoginForm />
          </>
        )}
        </div>
      </nav>
    </>
  );
};

export default Nav;