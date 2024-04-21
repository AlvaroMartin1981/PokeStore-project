import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../usecontext/ContextCard.jsx';
import Cards from './Cards.jsx';

const ProductType = () => {
  const { products } = useProducts();
  const { tipo } = useParams();

  // Filtrar productos por tipo
  const filteredProducts = products.filter(product => product.tipo.includes(tipo));

  // Verificar si no hay productos disponibles
  if (!filteredProducts.length) {
    return <div>No hay productos disponibles.</div>;
  }

  return (<Cards products={filteredProducts} />);
};

export default ProductType;
