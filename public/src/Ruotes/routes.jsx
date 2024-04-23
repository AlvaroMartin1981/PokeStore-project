import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useProducts } from '../usecontext/ProductContext.jsx';
import Cards from '../componetes/Cards.jsx';
import Nav from '../componetes/Nav.jsx';
import ProductDetail from '../componetes/ProductDetail.jsx';
import ProductType from '../componetes/ProductType.jsx';
import Legendarios from '../componetes/Lengendario.jsx';
import Mythical from '../componetes/Mythical.jsx';

function Rutas() {
    const { pokemon, items } = useProducts();
    
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/pokemon" element={<Cards products={pokemon} />} />
                <Route path="/items" element={<Cards products={items} />} />
                <Route path="/pokemon/legendarios" element={<Legendarios />} />
                <Route path="/pokemon/misticos" element={<Mythical />} />
                <Route path="/pokemon/tipo/:tipo" element={<ProductType />} />
                <Route path="/items/tipo/:tipo" element={<ProductType />} />
                <Route path="/product/:nombre" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
}

export default Rutas;
