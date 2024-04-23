import React, { useState, useEffect } from 'react';
import { useCarrito } from '../usecontext/CarritoContext';

const CartList = () => {
  const { carrito, eliminar, vaciarCarrito } = useCarrito(); 
  const [mostrarCarrito, setMostrarCarrito] = useState(false);



  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const handleEliminarProducto = (id) => {
    eliminar(id); // Llamamos a la función eliminar con el ID del producto a eliminar
  };

  const totalPrecio = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

  return (
    <div className="cart-container"  onMouseLeave={toggleCarrito}>
      <button className="cart-toggle" onMouseEnter={toggleCarrito} >
        Carrito ({carrito.length})
      </button>
      {mostrarCarrito && (
        <>
          <table className="cart-items">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Uds</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto) => (
                <tr key={producto.id}>
                  <td><img src={producto.imagen} alt={producto.nombre} width="50" /></td>
                  <td>{producto.nombre}</td>
                  <td>{producto.precio} €</td>
                  <td>{producto.cantidad}</td>
                  <td><button className="btn_carrito" onClick={() => handleEliminarProducto(producto.id)}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {carrito.length > 0 && (
            <button onClick={vaciarCarrito} className="empty-cart-button">
              Vaciar Carrito
            </button>
          )}
          <div className="cart-total">Total:  {totalPrecio} €</div>
        </>
      )}
    </div>
  );
};

export default CartList;
