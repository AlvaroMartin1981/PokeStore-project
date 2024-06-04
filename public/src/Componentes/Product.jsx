import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ tipos }) => {
    if (!tipos || tipos.length === 0) {
        return <div>No hay tipos disponibles.</div>;
    }

    return (
        <div className="product-container">
            {tipos.map((tipo, index) => (
                <div className="product-card" key={index}>
                    <Link to={`/pokemon/tipo/${tipo}`}>
                        <img src={`imagen/${tipo}.jpg`} alt={tipo} className="product-image" />
                        <div className="product-text-container">
                            <h3 className="product-type">{tipo}</h3>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Product;
