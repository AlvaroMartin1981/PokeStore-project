import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../usecontext/ProductContext.jsx';
import Carrito from  './Carrito.jsx'
import SearchBar from'./SearchBar.jsx'

const Nav = () => {
  const { pokemon, items } = useProducts();
  const [searchResults, setSearchResults] = useState([]);

  const pokemonTypes = Array.from(new Set(pokemon.map(p => p.tipo).flat()));
  const itemTypes = Array.from(new Set(items.map(i => i.tipo).flat()));

  const [showPokemonTypes, setShowPokemonTypes] = useState(false);
  const [showItemTypes, setShowItemTypes] = useState(false);
  const handleSearch = (term) => {
    // Filtrar los productos que coincidan con el término de búsqueda en el nombre
    const filteredPokemon = pokemon.filter((poke) =>
      poke.nombre.toLowerCase().includes(term.toLowerCase())
    );
    const filteredItems = items.filter((item) =>
      item.nombre.toLowerCase().includes(term.toLowerCase())
    );
  
    // Combinar los resultados de búsqueda de Pokémon e Items
    const searchResults = [...filteredPokemon, ...filteredItems];
  
    // Actualizar el estado searchResults con los resultados de la búsqueda
    setSearchResults(searchResults);
  };
  
  return (
  <>
  <header>
  <nav>
 
    <ul>
      <li>
        <Link to="/pokemon">Pokemon</Link>
        <ul>
          <li onClick={() => setShowPokemonTypes(!showPokemonTypes)}>
            <Link to='pokemon/tipo'>Tipos</Link>
            {showPokemonTypes && (
              <ul>
                {pokemonTypes.map((tipo, index) => (
                  <li key={index}><Link to={`/pokemon/tipo/${tipo}`}>{tipo}</Link></li>
                ))}
              </ul>
            )}
          </li>
          <li><Link to="/pokemon/legendarios">Legendarios</Link></li>
          <li><Link to="/pokemon/misticos">Místicos</Link></li>
        </ul>
      </li>
      <li>
        <Link to="/items">Items</Link>
        <ul>
          <li onClick={() => setShowItemTypes(!showItemTypes)}>
            <Link to ='/items/tipo'>Tipos</Link>
            {showItemTypes && (
              <ul>
                {itemTypes.map((tipo, index) => (
                  <li key={index}><Link to={`/items/tipo/${tipo}`}>{tipo}</Link></li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </li>
    </ul>
   </nav> 
   <SearchBar handleSearch={handleSearch} />
    <Carrito/>
  
  </header>
</>
)}   

 export default Nav