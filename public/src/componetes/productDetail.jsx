import React from 'react';
import { useProducts } from '../usecontext/ContextCard.jsx';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { products } = useProducts();
  const { id } = useParams();

  // Encontrar el producto por ID
  const product = products.find(product => product._id === id);

  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  return (
    <>
    {console.log(product)}
    <div className="product-detail">
      <div>
        <img src={product.imagen} alt={product.nombre} width='150px'/>
      </div>
      <div className='text_card'>
        <h2>{product.nombre}</h2>
        <h2>{product.categoria}</h2>
        <h3>{product.descripcion}</h3>
        {typeof product.precio === 'number' ? (
          <h3>{product.precio} €</h3>
        ) : (
          <h3>No disponible</h3>
        )}
        {product.categoria=== 'pokemon' && (
          <div>
           {console.log(product.tipo)}
           {/*<p>{product.pokemonAttributes.tipo.map(tipo=>`<div>${tipo}</div>`).join(' ')}</p>*/}
            <p>Cadena Evolutiva: {product.pokemonAttributes.cadena_evoluciones.map(evolucion => `${evolucion.especie} (Nivel: ${evolucion.nivel === null ? 0 : evolucion.nivel}))`).join(', ')}</p>
            <p>Peso: {product.pokemonAttributes.peso} kg</p>
            <p>Altura: {product.pokemonAttributes.altura} m</p>
            <p>Id_pokedex: {product.pokemonAttributes.id_pokedex}</p>
          </div>
        )}
      </div>
    <div className='card_likes'>
      {product.likes.length > 0 && <p>Likes: {product.likes.length}</p>}
            {product.reviews.length > 0 && <p>Reviews: {product.reviews.length}</p>}
            {product.likes.length === 0 && product.reviews.length === 0 && <p>Este producto aun no tiene ni likes ni reviews</p>}
            </div>
    </div>
    </>
  );
};

export default ProductDetail;
