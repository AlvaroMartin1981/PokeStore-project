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
    <>  
      <div className='detail'>
        <div className='detail_container'>
           <h2>{product.id_pokedex} - {product.nombre}</h2>
           <h4>Legendario: <span className='detail_result'> {product.legendario === true ? 'Sí' : 'No'}</span></h4>
            <h4>Místico: <span className='detail_result'>{product.mythical === true ? 'Sí' : 'No'}</span></h4>
            
          <div className="product-detail"> 
            <div>
              <img src={product.imagen} alt={product.nombre} width='400px'/>
            </div>
              <div className='descripcion_detail'>
                <h4>{product.descripcion}</h4>
                <h4>{product.tipo.map(tipo => `${tipo}`).join('    ')}</h4>
                <div>
                <h4>{product.peso} kg</h4>
                <h4>{product.altura} m</h4>
                </div>
                <div className='detail_habilidades'>
            <h4>Habilidades:</h4>
            <ul>
              {product.habilidades.map((habilidad, index) => (
                <li key={index}><span className='detail_stats_nombre'>{habilidad.nombre}:</span> {habilidad.descripcion}</li>
              ))}
            </ul>
            </div>
            <h4>Ratio de captura: <span className='detail_result'>{product.ratio_captura}</span></h4>
            <h4>Experiencia Base:<span className='detail_result'> {product.base_experience} puntos</span></h4>
          
                <div className='detail_precio'>
                  <h3>Precio: {product.precio} €</h3>
                  <div className='btn_detail'>
                    <button>Comprar ahora</button>
                    <button onClick={() => añadir(product)}>Añadir a la lista</button>
                  </div>
                </div>
              </div>
        <div className='detail_pokemon'>
          <div className='detail_habilidades'>
            <h4>Estadísticas:</h4>
            <ul>
              {product.estadisticas.map((stat, index) => (
                <li key={index}>
                  <span className='detail_stats_nombre'>{stat.nombre}: </span>
                  <progress value={stat.valor} max="200"> </progress>{stat.valor}
                </li>
              ))}
            </ul>
          </div>
          </div>
          <div className='detail_caracteristicas'>
            {product.cadena_evoluciones.length > 1 && (
              <>
                <h4>Cadena Evolutiva:</h4>
                <ul>
                  {product.cadena_evoluciones.map((evolucion, index) => (
                    <li key={index}><span className='detail_stats_nombre'>
                      <Link to={`/product/${evolucion.especie.charAt(0).toUpperCase() + evolucion.especie.slice(1)}`}>
                        {evolucion.especie.charAt(0).toUpperCase() + evolucion.especie.slice(1)}
                      </Link> </span>
                      Nivel: {evolucion.nivel === null ? 0 : evolucion.nivel}
                    </li>
                  ))}
                </ul>
              </>
            )}
         </div>
        </div>
      <div>
        <div className='card_likes'>
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
      </div>
      </div>
          </div>
        <div></div>
      {user && <ProductCommentForm productId={product._id} onCommentSubmit={handleCommentSubmit} />}
    </>
  );
};

export default ProductDetail;
