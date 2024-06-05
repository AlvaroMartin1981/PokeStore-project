import { useProducts } from '../../usecontext/ProductContext';
import { useCarrito } from '../../usecontext/CarritoContext';
import { useUser } from '../../usecontext/UserContext';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCommentForm from '../ProductComment/PorductComment.jsx';
import './ProductDetail.css';

const ProductDetail = () => {
  const { añadir } = useCarrito();
  const products = useProducts();
  const { nombre } = useParams();
  const { user } = useUser();
  const [comments, setComments] = useState([]);

  const product = products.find(product => product.nombre === nombre);
  
  useEffect(() => {
    if (product) {
      setComments(product.reviews);
    }
  }, [product]);

  if (!product) {
    return <div><h2>Producto no encontrado.</h2></div>;
  }

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className="modal">
      <div className="modal_pokemon">
        <div className="modal_content">
          <div className="basica_modal">
            <h3>{product.id_pokedex} - {product.nombre}</h3>
            <img src={product.imagen} alt={product.nombre} className="modal_img"/>
          </div>
          <div className="modal_descripcion">
            <h4>{product.descripcion}</h4>
          </div>
          <div className="modal_medidas">
            <div className="m_medida">{product.peso} kg</div>
            <div className="m_medida">{product.altura} m</div>
          </div>
          <div className="modal_tipos">
            {product.tipo.map((tipo, index) => (
              <div key={index} className={`tipo_texto ${tipo.toLowerCase()}`}>{tipo}</div>
            ))}
          </div>
          <div className="habModal">
            <h3>Habilidades:</h3>
            <div className="hab">
              {product.habilidades.map((habilidad, index) => (
                <div key={index}>
                  <h4>{habilidad.nombre}</h4>
                  <p>{habilidad.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="modal_estadisticas">
            <h3>Estadísticas:</h3>
            {product.estadisticas.map((stat, index) => (
              <div key={index}>
                <label>{stat.nombre}</label>
                <progress value={stat.valor} max="200"></progress> {stat.valor}
              </div>
            ))}
          </div>
          {product.cadena_evoluciones.length > 1 && (
            <div className="modal_masinfo">
              <h3>Cadena Evolutiva:</h3>
              <ul>
                {product.cadena_evoluciones.map((evolucion, index) => (
                  <li key={index}>
                    <Link to={`/product/${evolucion.especie.charAt(0).toUpperCase() + evolucion.especie.slice(1)}`}>
                      {evolucion.especie.charAt(0).toUpperCase() + evolucion.especie.slice(1)}
                    </Link>
                    <span> Nivel: {evolucion.nivel === null ? 0 : evolucion.nivel}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="card_likes">
            {product.likes.length > 0 && <p>Valor: {product.likes[0].star} Likes: {product.likes[0].likesCount}</p>}
            {comments.length > 0 && (
              <div>
                <h3>Reviews:</h3>
                {comments.map((review, index) => (
                  <div key={index}>
                    <p><strong>{review.username || 'Usuario desconocido'}</strong>: {review.comment}</p>
                    <p>{review.rating}</p>
                  </div>
                ))}
              </div>
            )}
            {!comments.length && !product.likes.length && ( 
              <div className='no_reviews'>
                <h4>Este producto aún no tiene ni likes ni reviews.<Link to='/register'> Regístrate</Link> o <Link to='/login'> inicia sesión </Link>para ser el primero.</h4>
              </div>
            )}
          </div>
          <div className="btn">
            <button id="btnModal" onClick={() => añadir(product)}>Añadir a la lista</button>
          </div>
          {user && <ProductCommentForm productId={product._id} onCommentSubmit={handleCommentSubmit} />}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
