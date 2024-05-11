import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    if (!product) {
        return <div>Cargando...</div>;
    }

    const { nombre, tipo, imagen, categoria, pokemonAttributes } = product;
    let categoryLink = '';

    if (categoria === 'Item') {
        categoryLink = `/items/tipo/${tipo}`;
    } else {
        if (pokemonAttributes && pokemonAttributes.legendario) {
            categoryLink = '/pokemon/legendarios';
        } else if (pokemonAttributes && pokemonAttributes.mythical) {
            categoryLink = '/pokemon/misticos';
        } else {
            categoryLink = `/pokemon/tipo/${tipo[0]}`;
        }
    }

    const displayTipo = categoria === 'Item' ? product.tipo :
        (pokemonAttributes && pokemonAttributes.legendario) ? 'Legendario' :
        (pokemonAttributes && pokemonAttributes.mythical) ? 'Místico' : tipo && tipo.length > 0 ? tipo[0] : '';

    return (
        <div className='container_home' key={nombre}>
            <Link to={categoryLink}>
                <img src={imagen} alt={nombre} style={{ width: '300px' }} />
                <div className='container_home_text'>
                    <h3>{categoria} - {displayTipo}</h3>
                </div>
            </Link>
        </div>
    );
};

export default Product;
