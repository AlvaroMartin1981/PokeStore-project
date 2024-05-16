import React from 'react';
import { useProducts } from '../../usecontext/ProductContext.jsx';
import Product from '../../Componentes/Product.jsx'; 
import './TypesPages.css'

const TypePages = () => {
    const products = useProducts();

    // Función para obtener todos los tipos de Pokémon
    const getAllPokemonTypes = () => {
        const allTypes = new Set();
        products.forEach(product => {
            product.tipo.forEach(type => {
                allTypes.add(type);
            });
        });
        return Array.from(allTypes);
    };

    const pokemonTypes = getAllPokemonTypes();


    return (
        <>
        <div >
            <h2>Tipos de Pokémon</h2>
            <div className='container_home'>
                {pokemonTypes.map((type, index) => (
                    <div key={index}>
                        <Product product={getPokemonOfType(type)} />
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default TypePages;
