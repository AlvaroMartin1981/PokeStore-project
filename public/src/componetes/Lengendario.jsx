import React from 'react';
import { useProducts } from '../usecontext/ContextCard.jsx';
import Cards from './Cards.jsx';

const Legendarios = () => {
  const { pokemon } = useProducts();

  // Filtrar Pokémon legendarios
  const legendaryPokemon = pokemon.filter(pokemon => pokemon.pokemonAttributes.legendario);

  // Verificar si no hay Pokémon legendarios
  if (!legendaryPokemon.length) {
    return <div>No hay Pokémon legendarios disponibles.</div>;
  }

  return (<Cards products={legendaryPokemon} />)
};

export default Legendarios;
