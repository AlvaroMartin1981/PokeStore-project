import React from 'react';
import { useProducts } from '../usecontext/ContextCard.jsx';
import Cards from './Cards.jsx';

const Mythical = () => {
  const { pokemon } = useProducts();

  // Filtrar Pokémon legendarios
  const mythicalPokemon = pokemon.filter(pokemon => pokemon.pokemonAttributes.mythical);

  // Verificar si no hay Pokémon legendarios
  if (!mythicalPokemon.length) {
    return <div>No hay Pokémon Misticos disponibles.</div>;
  }

  return (<Cards products={mythicalPokemon} />)
};

export default Mythical;
