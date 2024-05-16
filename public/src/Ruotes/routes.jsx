import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useProducts } from '../usecontext/ProductContext.jsx';
import Cards from '../Componentes/Cards/Cards.jsx';
import Nav from '../Componentes/NavBar/Nav.jsx';
import ProductDetail from '../Componentes/ProductDetail/productDetail.jsx';
import ProductType from '../Componentes/ProductType.jsx';
import Legendarios from '../Componentes/Lengendario.jsx';
import Mythical from '../Componentes/Mythical.jsx';
import Home from '../Pages/Home/Home.jsx';
import Footer from '../Componentes/Footer/Footer.jsx';
import RegisterForm from '../Componentes/Forms/RegisterForm.jsx';
import LoginForm from '../Componentes/Forms/LoginForm.jsx';
import TypeComponent from '../Pages/TypesPages/TypesPages.jsx';
import CreateProduct from '../Pages/Product/CreateProduct.jsx';
import UpdateProduct from '../Pages/Product/UpdateProduct.jsx'


const ScrollTop=()=>{
    const location = useLocation(); 

    useEffect(()=>{
        window.scrollTo(0, 0);
      },[location.pathname])
      return null
    }

function Rutas() {
    const  products  = useProducts();

    return (
        <>
        <Router>
            <ScrollTop/>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon" element={<Cards products={products} />} />
                <Route path="/pokemon/legendarios" element={<Legendarios />} />
                <Route path="/pokemon/misticos" element={<Mythical />} />
                <Route path="/pokemon/tipo" element={ <TypeComponent/>} />
                <Route path="/pokemon/tipo/:tipo" element={<ProductType />} />
                <Route path="/product/:nombre" element={<ProductDetail />} />
                <Route path="/user/register" element={<RegisterForm role='user'/>} />
                <Route path="/user/login" element={<LoginForm />} />
                <Route path="/admin/register" element={<RegisterForm role='admin' />} />
                <Route path='/admin/edit/:id' element={<UpdateProduct/>}/>

            </Routes>
            <Footer/>   
        </Router>
        </>
    );
}

export default Rutas;
