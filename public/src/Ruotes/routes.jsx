import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useProducts } from '../usecontext/ProductContext.jsx';
import {useUser} from '../usecontext/UserContext.jsx'
import Cards from '../Componentes/Cards/Cards.jsx';
import Nav from '../Componentes/NavBar/Nav.jsx';
import ProductDetail from '../Componentes/ProductDetail/productDetail.jsx';
import ProductType from '../Componentes/ProductType.jsx';
import Legendarios from '../Componentes/Lengendario.jsx';
import Mythical from '../Componentes/Mythical.jsx';
import Home from '../Pages/Home.jsx';
import Footer from '../Componentes/Footer/Footer.jsx';
import RegisterForm from '../Componentes/Forms/RegisterForm.jsx'

function Rutas() {
    const { pokemon, items } = useProducts();
    const { user } = useUser();

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
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
            <Footer/>   
        </Router>
        </>
    );
}

export default Rutas;
