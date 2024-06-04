import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../usecontext/ProductContext';
import Cards from '../../Componentes/Cards/Cards.jsx';
import PokemonBaner from '../../assets/Imagenes/pokemonBaner.jpeg'; 
import './Home.css';

const Home = () => {
  const products = useProducts();
  const [bestRated, setBestRated] = useState([]);
  const [mostCommented, setMostCommented] = useState([]);
  const [newest, setNewest] = useState([]);
  const [topTypes, setTopTypes] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setBestRated(products.filter(p => p.likes[0].likesCount > 0).sort((a, b) => b.likes[0].likes - a.likes[0].likes).slice(0, 5));
      setMostCommented(products.filter(p => p.reviews.length > 0).sort((a, b) => b.reviews.length - a.reviews.length).slice(0, 5));
      setNewest(products.slice(-5).reverse());

      // Obtener tipos más vendidos al azar
      const uniqueTypes = [...new Set(products.map(product => product.tipo[0]))];
      const randomTypes = uniqueTypes.sort(() => 0.5 - Math.random()).slice(0, 5);
      const topTypesProducts = randomTypes.map(type => ({
        type,
        image: products.find(product => product.tipo.includes(type)).imagen
      }));
      setTopTypes(topTypesProducts);
    }
  }, [products]);

  return (
    <>
      <div className="home-container">
        <img src={PokemonBaner} alt="Background" className="background-image" />
        <section className="text">
          <h1 className="welcome-text">
            ¡Bienvenido a nuestra tienda exclusiva de Pokémon!
          </h1>
          <p className="intro-text">
            En nuestro mundo, los Pokémon son más que simples criaturas: son compañeros de aventuras, amigos leales y poderosos aliados en tu viaje para convertirte en el mejor entrenador. En nuestra tienda, te ofrecemos la oportunidad de llevar a casa a tus Pokémon favoritos, desde los más populares hasta los legendarios más raros.
          </p>
        </section>
        <section className="home-section">
          <h2>Novedades</h2>
          <Cards products={newest} />
        </section>
        <section className="home-section">
          <h2>Pokémon Mejor Valorados</h2>
          <Cards products={bestRated} />
        </section>
        <section className="home-section">
          <h2>Pokémon con Más Comentarios</h2>
          <Cards products={mostCommented} />
        </section>
        <section className="home-section">
          <h2>Tipos Más Vendidos</h2>
          <div className="types-container">
            {topTypes.map(({ type, image }) => (
              <div key={type} className="type-card">
                <Link to={`/pokemon/tipo/${type}`}>
                  <img src={image} alt={type} className="type-image" />
                  <h3 className="type-title">{type}</h3>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
