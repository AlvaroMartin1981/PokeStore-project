import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategoryLink = ({ product }) => {
    const { categoria, nombre, imagen, pokemonAttributes, tipo } = product;

    let categoryText = '';
    let categoryLink = '';

    if (categoria === 'Item') {
        categoryText = 'Item';
        categoryLink = '/items';
    } else {
        if (pokemonAttributes && pokemonAttributes.legendario) {
            categoryText = 'Legendario';
            categoryLink = '/pokemon/legendarios';
        } else if (pokemonAttributes && pokemonAttributes.mythical) {
            categoryText = 'Místico';
            categoryLink = '/pokemon/misticos';
        } else {
            categoryText = tipo || 'Otro';
            categoryLink = '/otro';
        }
    }

    return (
        <div>
            <Link to={categoryLink}>
                <img src={imagen} alt={nombre} />
            </Link>
            <div>
                <Link to={categoryLink}>
                    <p>Nombre: {nombre}</p>
                </Link>
                <p>Categoría: {categoryText}</p>
            </div>
        </div>
    );
};

export default ProductCategoryLink;
