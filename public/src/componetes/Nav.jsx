import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../usecontext/ContextCard.jsx';

const Nav = () => {
  const { pokemon, items } = useProducts();

  // Obtener todos los tipos de Pokemon únicos
  const pokemonTypes = Array.from(new Set(pokemon.map(p => p.pokemonAttributes.tipo).flat()));
  // Obtener todos los tipos de Items únicos
  const itemTypes = Array.from(new Set(items.map(i => i.tipo)));

  // Estados locales para controlar la visibilidad de los desplegables
  const [showPokemonTypes, setShowPokemonTypes] = useState(false);
  const [showItemTypes, setShowItemTypes] = useState(false);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/pokemon">Pokemon</Link>
          <ul>
            <li onClick={() => setShowPokemonTypes(!showPokemonTypes)}> {/* Agregar evento onClick para mostrar/ocultar */}
              <span>Tipos</span>
              {showPokemonTypes && (
                <ul>
                  {/* Mapear sobre los tipos de Pokemon */}
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
            <li onClick={() => setShowItemTypes(!showItemTypes)}> {/* Agregar evento onClick para mostrar/ocultar */}
              <span>Tipos</span>
              {showItemTypes && (
                <ul>
                  {/* Mapear sobre los tipos de Items */}
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
  );
};

export default Nav;
