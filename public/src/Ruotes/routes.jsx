import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import { useProducts } from '../usecontext/ContextCard.jsx';
import Cards from '../componetes/Cards.jsx';
import Nav from '../componetes/Nav.jsx'; 
import ProductDetail from '../componetes/productDetail.jsx'

import { useParams } from 'react-router-dom';


function Rutas() {
    const { pokemon, items } = useProducts();
    const { tipo } = useParams(); // Obtener el ID y el tipo de la ruta

    // Función para filtrar los productos por tipo de Pokemon o tipo de Item
    const filterProductsByType = (products, tipo) => {
        return products.filter(product => {
            // Verificar si product.pokemonAttributes y product.pokemonAttributes.tipo están definidos
            if (product.pokemonAttributes && product.pokemonAttributes.tipo) {
                // Verificar si alguno de los tipos del Pokemon coincide con los tipos seleccionados
                return product.pokemonAttributes && product.pokemonAttributes.tipo && product.pokemonAttributes.tipo.some(t => tipo && tipo.includes(t)) || tipo && tipo.includes(product.tipo);

            }
            // Si product.pokemonAttributes.tipo no está definido, no lo incluyas en el filtro
            return false;
        });
    };
    

    return (
        <Router>
            <Nav /> {/* Agrega el componente de navegación */}
            <Routes>
                <Route path="/pokemon" element={<Cards products={pokemon} />} />
                <Route path="/items" element={<Cards products={items} />} />
                {/* Rutas para los tipos específicos de Pokemon e Items */}
                <Route path="/pokemon/tipo/:tipo" element={<Cards products={filterProductsByType(pokemon, tipo)} />} />
                <Route path="/items/tipo/:tipo" element={<Cards products={filterProductsByType(items, tipo)} />} />
                <Route path="/product/:id" element={<ProductDetail/>} />
            </Routes>
        </Router>
    );
}

export default Rutas;
