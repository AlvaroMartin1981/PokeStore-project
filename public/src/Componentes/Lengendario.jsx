import { useProducts } from '../usecontext/ProductContext.jsx';
import Cards from './Cards/Cards.jsx';

const Legendarios = () => {
  const { pokemon } = useProducts();

  const legendaryPokemon = pokemon.filter(pokemon => pokemon.pokemonAttributes.legendario);

  if (!legendaryPokemon.length) {
    return <div>No hay Pokémon legendarios disponibles.</div>;
  }

  return (<Cards products={legendaryPokemon} />)
};

export default Legendarios;
