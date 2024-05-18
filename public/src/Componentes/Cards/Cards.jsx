import { Link } from 'react-router-dom';
import { useCarrito } from '../../usecontext/CarritoContext';
import { useState, useEffect } from 'react';
import { useUser } from '../../usecontext/UserContext';
import './Cards.css';

const Cards = ({ products }) => {
  const { user } = useUser();
  const { añadir, mensaje } = useCarrito();
  const [productosOrdenados, setProductosOrdenados] = useState(products);
  const [orden, setOrden] = useState('idAsc');
  const [productoAñadido, setProductoAñadido] = useState(null);

  const handleChangeOrden = (e) => {
    setOrden(e.target.value);
  };

  useEffect(() => {
    ordenarProductos(orden);
  }, [orden, products]);

  const ordenarProductos = (tipoOrden) => {
    const sortedProducts = [...products];
    switch (tipoOrden) {
      case 'nombreAsc':
        sortedProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombreDesc':
        sortedProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'precioAsc':
        sortedProducts.sort((a, b) => a.precio - b.precio);
        break;
      case 'precioDesc':
        sortedProducts.sort((a, b) => b.precio - a.precio);
        break;
      case 'idAsc':
        sortedProducts.sort((a, b) => a.id_pokedex - b.id_pokedex);
        break;
      case 'idDesc':
        sortedProducts.sort((a, b) => b.id_pokedex - a.id_pokedex);
        break;
      case 'valorAsc':
        sortedProducts.sort((a, b) => a.likes[0].likes - b.likes[0].likes);
        break;
      case 'valorDesc':
        sortedProducts.sort((a, b) => b.likes[0].likes - a.likes[0].likes);
        break;
      default:
        break;
    }
    setProductosOrdenados(sortedProducts);
  };

  return (
    <>
      <section className="container">
        <div className='cards_select'>
          <label htmlFor="orden">Ordenar por:</label>
          <select id="orden" value={orden} onChange={handleChangeOrden}>
            <option value="nombreAsc">Nombre (A-Z)</option>
            <option value="nombreDesc">Nombre (Z-A)</option>
            <option value="precioAsc">Precio (Menor a Mayor)</option>
            <option value="precioDesc">Precio (Mayor a Menor)</option>
            <option value="idAsc">ID (Menor a Mayor)</option>
            <option value="idDesc">ID (Mayor a Menor)</option>
            <option value='valorAsc'>Valoraciones (Menor a Mayor)</option>
            <option value='valorDesc'>Valoraciones (Mayor a Menor)</option>
          </select>
        </div>
        <div className="container_cards">
          {productosOrdenados.map((product) => (
            <div className="card" key={product._id}>
              <img src={product.imagen} alt={product.nombre} width='200px' />
              <div className="text_card">
                <h3 className='card-title'>
                  <Link to={`/product/${product.nombre}`}>
                    {product.id_pokedex} - {product.nombre}
                  </Link>
                </h3>
              </div>
              <div>
                <div className="star-container">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`star ${index < Math.floor(product.likes[0].likes) ? 'filled' : ''}`}
                    >
                      ★
                      {index === Math.floor(product.likes[0].likes) - 1 && product.likes[0].likes % 1 !== 0 &&
                        <span className="star partial" style={{ width: `${(product.likes[0].likes % 1) * 100}%` }}>★</span>
                      }
                    </span>
                  ))}
                </div>
              </div>
              <div className="card_carro">
                <h4><span>Precio: </span>{product.precio} € *</h4>
                <div className='card_btn'>
                  {user && user.role === 'admin' ? (
                    <>
                      <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                      <button onClick={() => handleEdit(product.id)}>Editar</button>
                    </>
                  ) : (
                    <>
                      <Link to={`/product/${product.nombre}`}>
                        <button>Más Detalles</button>
                      </Link>
                      <button onClick={() => {
                        añadir(product);
                        setProductoAñadido(product.id_pokedex);
                      }}>Añadir al carrito</button>
                    </>
                  )}
                </div>
                {productoAñadido === product.id_pokedex && mensaje && (
                  <div className='mensaje'>
                    <p>{mensaje}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Cards;
