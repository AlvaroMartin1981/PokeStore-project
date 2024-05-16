import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../usecontext/UserContext.jsx'
import Cart from '../Cart/Cart.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import LoginForm from '../Forms/LoginForm.jsx';
import Logout from '../Logout.jsx';
import './Navbar.css';

const Nav = () => {
 const { user } = useUser();

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li> 
          <li><Link to="/pokemon">Pokemon</Link></li>
          <li><Link to='pokemon/tipo'>Tipos</Link></li>
          <li><Link to="/pokemon/legendarios">Legendarios</Link></li>
          <li><Link to="/pokemon/misticos">Místicos</Link></li>
        </ul>
        <SearchBar />
        <div className='nav_info_person'>
        <Cart />
        {user ? (
          <>
            <h3>Welcome, {user.name}
            </h3>
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
      {console.log(user)}
    </>
  );
};

export default Nav;