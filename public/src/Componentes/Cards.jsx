import { Link } from 'react-router-dom';
import { useCarrito } from '../usecontext/CarritoContext' 
import { useState } from 'react';

const Cards = ({ products,searchTerm  }) => {
  const { añadir } = useCarrito(); 
  const [productosOrdenados, setProductosOrdenados] = useState(products); 
  const [orden, setOrden] = useState('nombreAsc'); 

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
    <div>
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
                <img src={product.imagen} alt={product.nombre} width="150px" />
              </Link>
            </div>
            <div className="text_card">
              <h2>
                <Link to={`/product/${product.nombre}`}>
                  {product.id} - {product.nombre}
                </Link>
              </h2>
              <h2>{product.categoria}</h2>
              {typeof product.precio === "number" ? (
                <div className="card_carro">
                  <h3>{product.precio}€</h3>
                  <button className="card_btn" onClick={() => añadir(product)}>
                    Añadir
                  </button>
                </div>
              ) : (
                <h3>No disponible</h3>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
