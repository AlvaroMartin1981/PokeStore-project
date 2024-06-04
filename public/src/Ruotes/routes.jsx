import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useProducts } from '../usecontext/ProductContext.jsx';
import Cards from '../Componentes/Cards/Cards.jsx';
import Nav from '../Componentes/NavBar/Navbar.jsx';
import ProductDetail from '../Componentes/ProductDetail/productDetail.jsx';
import ProductType from '../Componentes/ProductType.jsx';
import Legendarios from '../Componentes/Lengendario.jsx';
import Mythical from '../Componentes/Mythical.jsx';
import Home from '../Pages/Home/Home.jsx';
import Footer from '../Componentes/Footer/Footer.jsx';
import RegisterForm from '../Pages/Auht/RegisterForm.jsx';
import LoginForm from '../Pages/Auht/LoginPages.jsx';
import TypeComponent from '../Pages/TypesPages/TypesPages.jsx';
import ProductForm from '../Pages/ProductForm/ProductForm.jsx';
import TypePages from '../Pages/TypesPages/TypesPages.jsx';
import CarritoPages from '../Pages/CarritoPages/CarritoPages.jsx';


const ScrollTop=()=>{
    const location = useLocation(); 

    useEffect(()=>{
        window.scrollTo(0, 0);
      },[location.pathname])
      return null
    }

function Rutas() {
    const products = useProducts();

    return (
        <>
        <Router>
            <ScrollTop/>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todos" element={<Cards products={products} showSort={true} />} />
                <Route path="/pokemon/legendarios" element={<Legendarios />} />
                <Route path="/pokemon/misticos" element={<Mythical />} />
                <Route path="/pokemon/tipo" element={ <TypeComponent/>} />
                <Route path="/tipos" element={<TypePages/>}/>
                <Route path="/pokemon/tipo/:tipo" element={<ProductType />} />
                <Route path="/pokemon/:nombre" element={<ProductDetail />} />
                <Route path="/user/register" element={<RegisterForm role='user'/>} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/admin/register" element={<RegisterForm role='admin' />} />
                <Route path="/pokemon/new" element={<ProductForm isEdit={false} />} />
                <Route path="/pokemon/edit/:nombre" element={<ProductForm isEdit={true} />} />
                <Route path='/carrito' element={<CarritoPages/>}/>
            </Routes>
            <Footer/>   
        </Router>
        </>
    );
}

export default Rutas;
