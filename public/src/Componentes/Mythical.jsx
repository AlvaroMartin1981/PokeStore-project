import { useProducts } from '../usecontext/ProductContext.jsx';
import Cards from './Cards/Cards.jsx';

const Mythical = () => {
  const { pokemon } = useProducts();

  const mythicalPokemon = pokemon.filter(pokemon => pokemon.pokemonAttributes.mythical);

  if (!mythicalPokemon.length) {
    return <div>No hay Pokémon Misticos disponibles.</div>;
  }

  return (<Cards products={mythicalPokemon} />)
};

export default Mythical;
