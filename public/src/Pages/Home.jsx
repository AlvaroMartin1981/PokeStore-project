import React, { useEffect, useState } from 'react';
import { useProducts } from '../usecontext/ProductContext.jsx';
import pokemonBaner from '../assets/Imagenes/pokemonBaner.jpeg';
import './Home.css';
import Product from '../Componentes/Product.jsx';

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

    return (
        <>
            <section className='front_page'>
                <img src={pokemonBaner} alt='Pokemon_baner' />
            </section>
            <section>
                <h2>NOVEDADES</h2>
                <div className='container_home'>
                    <Product product={legendaryPokemon} />
                    <Product product={mysticPokemon} />
                    <Product product={randomPokemon1} />
                    <Product product={randomPokemon2} />
                    <Product product={randomPokemon3} />
                    <Product product={randomItem1} />
                    <Product product={randomItem2} />
                    <Product product={randomItem3} />
                </div>
            </section>
        </>
    );
};

export default Home;
