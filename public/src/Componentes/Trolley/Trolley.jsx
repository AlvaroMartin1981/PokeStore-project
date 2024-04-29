import { useState } from 'react';
import { useCarrito } from '../../usecontext/CarritoContext';
import './Trolley.css';

const Trolley = () => {
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
    <div className="trolley-container"  onMouseLeave={toggleCarrito}>
      <button className="trolley-toggle" onMouseEnter={toggleCarrito} >
        Carrito ({carrito.length})
      </button>
      {mostrarCarrito && (
        <div className='trolley-table'>
          <table className="trolley-items">
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
                  <td><button className="btn_trolley" onClick={() => handleEliminarProducto(producto.id)}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {carrito.length > 0 && (
            <button onClick={vaciarCarrito} className="empty-trolley-button">
              Vaciar Carrito
            </button>
          )}
          <div className="trolley-total">Total:  {totalPrecio} €</div>
        </div>
      )}
    </div>
    </>
  );
};

export default Trolley;
