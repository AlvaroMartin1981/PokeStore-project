import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../usecontext/ProductContext';
import './TypesPages.css';
import PokemonBaner from '../../assets/Imagenes/pokemonBaner.jpeg'; 

const TypesPages = () => {
  const products = useProducts();
  const types = Array.from(new Set(products.map(product => product.tipo[0])));

  const getRandomImageByType = (type) => {
    const typeProducts = products.filter(product => product.tipo.includes(type));
    return typeProducts.length > 0 ? typeProducts[Math.floor(Math.random() * typeProducts.length)].imagen : '';
  };

  return (
    <>
    <div className="types-container-wrapper">
       <img src={PokemonBaner} alt="Background" className="background-image" />
      <div className="types-container">
        {types.map(type => (
          <div key={type} className="type-card">
            <Link to={`/pokemon/tipo/${type}`}>
              <img src={getRandomImageByType(type)} alt={type} className="type-image" />
              <h3 className="type-title">{type}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TypesPages;
