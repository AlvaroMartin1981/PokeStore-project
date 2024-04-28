import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useProducts } from '../usecontext/ProductContext.jsx';
import Cards from '../Componentes/Cards/Cards.jsx';
import Nav from '../Componentes/NavBar/Nav.jsx';
import ProductDetail from '../Componentes/productDetail.jsx';
import ProductType from '../Componentes/ProductType.jsx';
import Legendarios from '../Componentes/Lengendario.jsx';
import Mythical from '../Componentes/Mythical.jsx';
import Home from '../Pages/Home.jsx';
import Footer from '../Componentes/Footer/Footer.jsx';

function Rutas() {
    const { pokemon, items } = useProducts();
    
    return (
        <>
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon" element={<Cards products={pokemon} />} />
                <Route path="/items" element={<Cards products={items} />} />
                <Route path="/pokemon/legendarios" element={<Legendarios />} />
                <Route path="/pokemon/misticos" element={<Mythical />} />
                <Route path="/pokemon/tipo/:tipo" element={<ProductType />} />
                <Route path="/items/tipo/:tipo" element={<ProductType />} />
                <Route path="/product/:nombre" element={<ProductDetail />} />
            </Routes>
            <Footer/>   
        </Router>
        </>
    );
}

export default Rutas;
