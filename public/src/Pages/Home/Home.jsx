import React, { useEffect, useState } from 'react';
import { useProducts } from '../../usecontext/ProductContext.jsx';
import pokemonBaner from '../../assets/Imagenes/pokemonBaner.jpeg';
import './Home.css';
import Product from '../../Componentes/Product.jsx';

const Home = () => {
    const products  = useProducts();
    const [randomPokemon1, setRandomPokemon1] = useState(null);
    const [randomPokemon2, setRandomPokemon2] = useState(null);
    const [randomPokemon3, setRandomPokemon3] = useState(null);
    const [legendaryPokemon, setLegendaryPokemon] = useState(null);
    const [mysticPokemon, setMysticPokemon] = useState(null);

    useEffect(() => {
        // Obtener una selección aleatoria de Pokémon
        const getRandomPokemon = () => {
            const randomIndex = Math.floor(Math.random() * products.length);
            return products[randomIndex];
        };


        // Obtener un Pokémon legendario aleatorio
        const getRandomLegendaryPokemon = () => {
            const legendaryPokemons = products.filter(p =>  p.legendario);
            const randomIndex = Math.floor(Math.random() * legendaryPokemons.length);
            return legendaryPokemons[randomIndex] || null;
        };

        // Obtener un Pokémon mítico aleatorio
        const getRandomMysticPokemon = () => {
            const mysticPokemons = products.filter(p => p.mythical);
            const randomIndex = Math.floor(Math.random() * mysticPokemons.length);
            return mysticPokemons[randomIndex] || null;
        };

        // Establecer los Pokémon aleatorios
        setRandomPokemon1(getRandomPokemon());
        setRandomPokemon2(getRandomPokemon());
        setRandomPokemon3(getRandomPokemon());

        // Establecer el Pokémon legendario aleatorio
        setLegendaryPokemon(getRandomLegendaryPokemon());

        // Establecer el Pokémon mítico aleatorio
        setMysticPokemon(getRandomMysticPokemon());
    }, []);

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
                </div>
            </section>
        </>
    );
};

export default Home;
