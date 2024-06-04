import { useProducts } from '../usecontext/ProductContext.jsx';
import Cards from './Cards/Cards.jsx';

const Legendarios = () => {
  const products = useProducts();

  const legendaryPokemon = products.filter(pokemon => pokemon.legendario);

  if (!legendaryPokemon.length) {
    return <div>No hay Pokémon legendarios disponibles.</div>;
  }

  return (<Cards products={legendaryPokemon} showSort={true}/>)
};

export default Legendarios;
