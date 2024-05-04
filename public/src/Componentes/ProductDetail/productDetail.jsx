import { useProducts } from '../../usecontext/ProductContext';
import { useCarrito } from '../../usecontext/CarritoContext';
import { useUser } from '../../usecontext/UserContext';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCommentForm from '../ProductComment/PorductComment.jsx'
import './ProductDetail.css';

const ProductDetail = () => {
  const { añadir } = useCarrito();
  const { products } = useProducts();
  const { nombre } = useParams();
  const { user } = useUser();
  const [comments, setComments] = useState([]);

  const product = products.find(product => product.nombre === nombre);
  
  if (!product) {
    return <div><h2>Producto no encontrado.</h2></div>;
  }
  const handleCommentSubmit = () => {

    setComments([]);
  };
  return (
    <>  
    <div className='detail'>
      <div className='detail_container'>
    
        <div className="product-detail"> 
           <div>
        <img src={product.imagen} alt={product.nombre} />
        </div>
        <div className='text_card_detail'>
          <h2>{product.id} - {product.nombre}</h2>
          <div className='descripcion_detail'>
            <h4>{product.categoria}</h4>
            <h4>{product.descripcion}</h4>
            <h4>{product.tipo.map(tipo => `${tipo}`).join(' ')}</h4>
            {typeof product.precio === 'number' ? (
              <div className='detail_precio'>
                <h3>Precio: {product.precio} €</h3>
                <div className='btn_detail'>
                  <button>Comprar ahora</button>
                  <button onClick={() => añadir(product)}>Añadir a la lista</button>
                </div>
              </div>
            ) : (
              <h3>No disponible</h3>
            )} 
          </div>
        </div>
      </div>
      </div>
      {product.categoria === 'Pokemon' && (
        <div className='detail_pokemon'>
          <div className='detail_habilidades'>
            <h4>Habilidades:</h4>
            <ul>
              {product.pokemonAttributes.habilidades.map((habilidad, index) => (
                <li key={index}><span className='detail_stats_nombre'>{habilidad.nombre}:</span> {habilidad.descripcion}</li>
              ))}
            </ul>
            <h4>Estadísticas:</h4>
            <ul>
              {product.pokemonAttributes.estadisticas.map((stat, index) => (
                <li key={index}>
                  <span className='detail_stats_nombre'>{stat.nombre}: </span>
                  <progress value={stat.valor} max="200"> </progress>{stat.valor}
                </li>
              ))}
            </ul>
          </div>
          <div className='detail_caracteristicas'>
            {product.pokemonAttributes.cadena_evoluciones.length > 1 && (
              <>
                <h4>Cadena Evolutiva:</h4>
                <ul>
                  {product.pokemonAttributes.cadena_evoluciones.map((evolucion, index) => (
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
            <h4>Peso:<span className='detail_result'> {product.pokemonAttributes.peso} kg</span></h4>
            <h4>Altura: <span className='detail_result'>{product.pokemonAttributes.altura} m</span></h4>
            <h4>Ratio de captura: <span className='detail_result'>{product.pokemonAttributes.ratio_captura}</span></h4>
            <h4>Pokemon Legendario: <span className='detail_result'> {product.pokemonAttributes.legendario === true ? 'Sí' : 'No'}</span></h4>
            <h4>Pokemon Místico: <span className='detail_result'>{product.pokemonAttributes.mythical === true ? 'Sí' : 'No'}</span></h4>
            <h4>Experiencia Base:<span className='detail_result'> {product.pokemonAttributes.base_experience} puntos</span></h4>
          </div>
        </div>
      )}
      </div>
      <div>
      <div>
  <div className='card_likes'>
    {product.likes.length > 0 && <p>Likes: {product.likes.length}</p>}
    {product.reviews.length > 0 && (
  <div>
    <h3>Reviews:</h3>
    {product.reviews.map((review, index) => (
      <div key={index}>
        <p><strong>{review.name || 'Usuario desconocido'}</strong>: {review.comment}</p>
      </div>
    ))}
  </div>

)}
    {!product.reviews.length && !product.likes.length &&( 
      <div className='no_reviews' >
          <h4>Este producto aún no tiene ni likes ni reviews.<Link to='/register'> Registrate</Link> o <Link to='/login'> logeate </Link>para ser el primero.</h4>
        </div>
      ) }
  </div>
</div>

    </div>
    {user && <ProductCommentForm productId={product._id} onCommentSubmit={handleCommentSubmit} />}
    </>
  );
};

export default ProductDetail;