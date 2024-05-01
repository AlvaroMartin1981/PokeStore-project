import { useState } from 'react';
import { useCarrito } from '../../usecontext/CarritoContext';
import './Cart.css';

const Cart = () => {
  const { carrito, eliminar, vaciarCarrito } = useCarrito(); 
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const handleEliminarProducto = (id) => {
    eliminar(id); 
  };

  const totalPrecio = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

  return (
    <>
    <div className="Cart-container"  onMouseLeave={toggleCarrito}>
      <button className="Cart-toggle" onMouseEnter={toggleCarrito} >
      🛒 ({carrito.length})
      </button>
      {mostrarCarrito && (
        <div className='Cart-table'>
          <table className="Cart-items">
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
                  <td><button className="btn_Cart" onClick={() => handleEliminarProducto(producto.id)}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='Cart_text'>
          {carrito.length > 0 && (
            <button onClick={vaciarCarrito} className="empty-Cart-button">
              Vaciar Carrito
            </button>
          )}
          <div className="Cart-total">Total:  {totalPrecio} €</div>
        </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Cart;
