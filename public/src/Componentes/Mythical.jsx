import { useProducts } from '../usecontext/ProductContext.jsx';
import Cards from './Cards/Cards.jsx';

const Mythical = () => {
  const products = useProducts();

  const mythicalPokemon = products.filter(pokemon => pokemon.mythical);

  if (!mythicalPokemon.length) {
    return <div>No hay Pokémon Misticos disponibles.</div>;
  }

  return (<Cards products={mythicalPokemon} showSort={true}/>)
};

export default Mythical;
