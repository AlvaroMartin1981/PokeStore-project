import { useParams } from 'react-router-dom';
import { useProducts } from '../usecontext/ProductContext.jsx';
import Cards from './Cards.jsx';

const ProductType = () => {
  const { products } = useProducts();
  const { tipo } = useParams();

  const filteredProducts = products.filter(product => product.tipo.includes(tipo));

  if (!filteredProducts.length) {
    return <div>No hay productos disponibles.</div>;
  }

  return (<Cards products={filteredProducts} />);
};

export default ProductType;
