import React from 'react';
import { useCarrito } from '../../usecontext/CarritoContext';
import './CarritoPage.css';
import { Link } from 'react-router-dom';

const CarritoPage = () => {
  const { carrito, eliminar, vaciarCarrito } = useCarrito();

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

  return (
    <div className="carrito-page">
      <h1>Mi Carrito</h1>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito. <Link to="/">Vuelve a la tienda</Link></p>
      ) : (
        <div>
          <ul className="carrito-list">
            {carrito.map((producto, index) => (
              <li key={index} className="carrito-item">
                <img src={producto.imagen} alt={producto.nombre} width="100px" />
                <div>
                  <h2>{producto.nombre}</h2>
                  <p>{producto.descripcion}</p>
                  <p>Precio: {producto.precio} €</p>
                  <p>Cantidad: {producto.cantidad}</p>
                  <button onClick={() => eliminar(producto.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: {calcularTotal()} €</h3>
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
          <button>Proceder al Pago</button>
        </div>
      )}
    </div>
  );
};

export default CarritoPage;
