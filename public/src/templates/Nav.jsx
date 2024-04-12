import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from  './Nav.module.css'

const Navbar = () => {
  const [showPokemonDropdown, setShowPokemonDropdown] = useState(false);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [mode, setMode] = useState('light'); // Mode state (light/dark)

  const handlePokemonClick = () => {
    setShowPokemonDropdown(!showPokemonDropdown);
  };

  const handleItemsClick = () => {
    setShowItemsDropdown(!showItemsDropdown);
  };

  const handleLoginClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
    document.body.classList.toggle('dark-mode'); // Apply mode to body
  };

  const tipos = [
    "normal",
    "lucha",
    "volador",
    "veneno",
    "tierra",
    "roca",
    "bicho",
    "fantasma",
    "acero",
    "fuego",
    "agua",
    "planta",
    "eléctrico",
    "psíquico",
    "hielo",
    "dragón",
    "siniestro",
    "hada",
  ];

  return (
  <>
    <nav className={style.navbar}> {/* Apply mode class */}
      <ul>
        <li>
          <NavLink to="/pokemon" onClick={handlePokemonClick}>
            Pokémon
          </NavLink>
          {showPokemonDropdown && (
            <ul className={"dropdown"}>
              {tipos.map((type) => (
                <li key={type}>
                  <Link to={`/pokemon/${type}`}>{type}</Link>
                </li>
              ))}
              <li>
                <Link to="/pokemon/misteriosos">Pokémon misteriosos</Link>
              </li>
              <li>
                <Link to="/pokemon/legendarios">Pokémon legendarios</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/pokeballs">Pokeballs</Link>
        </li>
        <li>
          <NavLink to="/items" onClick={handleItemsClick}>
            Items
          </NavLink>
          {showItemsDropdown && (
            <ul className="dropdown">
              <li>
                <NavLink to="/items/batalla">Objetos de batalla</NavLink>
              </li>
              <li>
                <NavLink to="/items/curativos">Objetos curativos</NavLink>
              </li>
              {/* ... other item categories */}
            </ul>
          )}
        </li>
        <li className="nav-right"> {/* Right-aligned elements */}
          {isLoggedIn ? (
            <button onClick={handleLoginClick}>Cerrar sesión</button>
          ) : (
            <button onClick={handleLoginClick}>Iniciar sesión</button>
          )}

          <select value={mode} onChange={handleModeChange}>
            <option value="light">Día</option>
            <option value="dark">Noche</option>
            <option value="green">verde</option>
            <option value="yellow">Amarillo</option>
            <option value="blue">Azul</option>
            <option value="red">Rojo</option>
          </select>
        </li>
      </ul>
    </nav>
</>
  );
};

export default Navbar;
