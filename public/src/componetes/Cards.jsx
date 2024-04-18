import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ products }) => {
  if (!products) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className="container_cards"> 
      {products.map((product) => (
        <div className='card' key={product._id}> 
          <div>
            <Link to={`/product/${product._id}`}>
              <img src={product.imagen} alt={product.nombre} width='150px'/> 
            </Link>
          </div>
          <div className='text_card'> 
            <h2>
              <Link to={`/product/${product._id}`}>
                {product.nombre}
              </Link>
            </h2> 
            <h2>{product.categoria}</h2>
            {typeof product.precio === 'number' ? (
              <h3>{product.precio} €</h3>
            ) : (
              <h3>No disponible</h3>
            )} 
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
