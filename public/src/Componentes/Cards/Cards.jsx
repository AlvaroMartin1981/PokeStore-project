import { Link } from 'react-router-dom';
import { useCarrito } from '../../usecontext/CarritoContext';
import { FaCartShopping } from "react-icons/fa6";
import { useState } from 'react';
import './Cards.css';

const Cards = ({ products}) => {
  const { añadir, mensaje } = useCarrito(); 
  const [productosOrdenados, setProductosOrdenados] = useState(products); 
  const [orden, setOrden] = useState('nombreAsc'); 
  const [productoAñadido, setProductoAñadido] = useState(null);

  const handleClick = (id) => {
    setProductoAñadido(id);
  };
  const handleChangeOrden = (e) => {
    setOrden(e.target.value);
    ordenarProductos(e.target.value);
  };

  const ordenarProductos = (tipoOrden) => {
    let sortedProducts = [...products];
    if (tipoOrden === 'nombreAsc') {
      sortedProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (tipoOrden === 'nombreDesc') {
      sortedProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else if (tipoOrden === 'precioAsc') {
      sortedProducts.sort((a, b) => a.precio - b.precio);
    } else if (tipoOrden === 'precioDesc') {
      sortedProducts.sort((a, b) => b.precio - a.precio);
    }
    setProductosOrdenados(sortedProducts);
  };
 if (!productosOrdenados) { 
    return <div>Cargando...</div>;
  }
  return ( 
  <>
  <section  className="container">
    <div className='cards_select'>
      <label htmlFor="orden">Ordenar por:</label>
      <select id="orden" value={orden} onChange={handleChangeOrden}>
        <option value="nombreAsc">Nombre (A-Z)</option>
        <option value="nombreDesc">Nombre (Z-A)</option>
        <option value="precioAsc">Precio (Menor a Mayor)</option>
        <option value="precioDesc">Precio (Mayor a Menor)</option>
      </select>
    </div>
      <div className="container_cards">
        {productosOrdenados.map((product) => (
          <div className="card" key={product._id}>
            <div>
              <Link to={`/product/${product.nombre}`}>
                <img src={product.imagen} alt={product.nombre} width='300px'/>
              </Link>
            </div>
            <div className="text_card">
              <h3>
                <Link to={`/product/${product.nombre}`}>
                  {product.id} - {product.nombre}
                </Link>
              </h3>
              <Link to={`/product/${product.categoria}`}>
              <h4 className='card_categoria'>{product.categoria}</h4>
              </Link>
              {typeof product.precio === "number" ? (
                <>
                <div className="card_carro">
                 <h4>{product.precio} €</h4>
                      <FaCartShopping className='cart-shopping' onClick={() => {
                        añadir(product);
                        handleClick(product.id);
                      }} /> 
                      </div>
                      <div className='mensaje'>
                    {productoAñadido === product.id && mensaje && <p>{mensaje}</p>}
                   
                </div>
                </>
              ) : (
                <div className='card_carro'>
                <h4>No disponible</h4>
                </div>
              )}
            </div>
          </div> 
        ))}
      </div>
      </section>
      ;
    </>
  );
};

export default Cards;