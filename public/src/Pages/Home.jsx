import React, { useEffect, useState } from 'react';
import { useProducts } from '../usecontext/ProductContext.jsx';
import { Link } from 'react-router-dom';
import pokemonBaner from '../assets/pokemonBaner.jpeg';
import './Home.css';

const Home = () => {
    const { pokemon, items } = useProducts();
    const [randomPokemon1, setRandomPokemon1] = useState(null);
    const [randomPokemon2, setRandomPokemon2] = useState(null);
    const [randomPokemon3, setRandomPokemon3] = useState(null);
    const [randomItem1, setRandomItem1] = useState(null);
    const [randomItem2, setRandomItem2] = useState(null);
    const [randomItem3, setRandomItem3] = useState(null);
    const [legendaryPokemon, setLegendaryPokemon] = useState(null);
    const [mysticPokemon, setMysticPokemon] = useState(null);

    useEffect(() => {
        // Obtener una selección aleatoria de Pokémon
        const getRandomPokemon = () => {
            const randomIndex = Math.floor(Math.random() * pokemon.length);
            return pokemon[randomIndex];
        };

        // Obtener una selección aleatoria de ítems
        const getRandomItem = () => {
            const randomIndex = Math.floor(Math.random() * items.length);
            return items[randomIndex];
        };

        // Obtener un Pokémon legendario aleatorio
        const getRandomLegendaryPokemon = () => {
            const legendaryPokemons = pokemon.filter(p => p.pokemonAttributes && p.pokemonAttributes.legendario);
            const randomIndex = Math.floor(Math.random() * legendaryPokemons.length);
            return legendaryPokemons[randomIndex] || null;
        };

        // Obtener un Pokémon mítico aleatorio
        const getRandomMysticPokemon = () => {
            const mysticPokemons = pokemon.filter(p => p.pokemonAttributes && p.pokemonAttributes.mythical);
            const randomIndex = Math.floor(Math.random() * mysticPokemons.length);
            return mysticPokemons[randomIndex] || null;
        };

        // Establecer los Pokémon aleatorios
        setRandomPokemon1(getRandomPokemon());
        setRandomPokemon2(getRandomPokemon());
        setRandomPokemon3(getRandomPokemon());

        // Establecer los ítems aleatorios
        setRandomItem1(getRandomItem());
        setRandomItem2(getRandomItem());
        setRandomItem3(getRandomItem());

        // Establecer el Pokémon legendario aleatorio
        setLegendaryPokemon(getRandomLegendaryPokemon());

        // Establecer el Pokémon mítico aleatorio
        setMysticPokemon(getRandomMysticPokemon());
    }, [pokemon, items]);

    function renderProduct(product) {
        if (!product) {
            return <div>Cargando...</div>;
        }

        const { nombre, tipo, imagen, categoria, pokemonAttributes } = product;
        let categoryLink = '';

        if (categoria === 'Item') {
            categoryLink = '/items';
        } else {
            if (pokemonAttributes && pokemonAttributes.legendario) {
                categoryLink = '/pokemon/legendarios';
            } else if (pokemonAttributes && pokemonAttributes.mythical) {
                categoryLink = '/pokemon/misticos';
            } else {
                categoryLink = '/pokemon/tipo';
            }

        }

        const displayTipo = categoria === 'Item' ? product.tipo : 
                           (pokemonAttributes && pokemonAttributes.legendario) ? 'Legendario' : 
                           (pokemonAttributes && pokemonAttributes.mythical) ? 'Místico' : tipo && tipo.length > 0 ? tipo[0] : '';

        return (
            <div className='container_home'key={nombre}>
                <Link to={categoryLink}>
                    <img src={imagen} alt={nombre} style={{ width: '300px' }} />
                    <div className='container_home_text'>
                    <h3>{nombre}</h3>
                    <h4>{categoria}</h4>
                    <p>{displayTipo}</p>
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <>
            <section className='front_page'>
                <img src={pokemonBaner} alt='Pokemon_baner' />
            </section>
             <section>
                    <h2>  NOVEDADES</h2>
              
            <div className='container_home'>
                {renderProduct(legendaryPokemon)}
                {renderProduct(mysticPokemon)}
                {renderProduct(randomPokemon1)}
                {renderProduct(randomPokemon2)}
                {renderProduct(randomPokemon3)}
                {renderProduct(randomItem1)}
                {renderProduct(randomItem2)}
                {renderProduct(randomItem3)}
            </div>
            </section>
        </>
    );
};

export default Home;
