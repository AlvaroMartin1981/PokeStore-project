import { useProducts } from '../usecontext/ProductContext.jsx';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { products } = useProducts();
  const { nombre } = useParams();

  const product = products.find(product => product.nombre === nombre);
  
  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  return (
    <>
    <div className="product-detail">
      <div>
        <img src={product.imagen} alt={product.nombre} width='150px'/>
      </div>
      <div className='text_card'>
        <h2>{product.id} - {product.nombre}</h2>
        <h2>{product.categoria}</h2>
        <h3>{product.descripcion}</h3>
        <p>{product.tipo.map(tipo => `${tipo}`).join(' ')}</p>
        {typeof product.precio === 'number' ? (
          <h3>{product.precio} €</h3>
        ) : (
          <h3>No disponible</h3>
        )}
        {product.categoria === 'Pokemon' && (
          <div>
            <p>Habilidades:</p>
            <ul>
              {product.pokemonAttributes.habilidades.map((habilidad, index) => (
                <li key={index}>{habilidad.nombre}: {habilidad.descripcion}</li>
              ))}
            </ul>
            <p>Estadísticas:</p>
            <ul>
              {product.pokemonAttributes.estadisticas.map((stat, index) => (
                <li key={index}>
                  {stat.nombre}: {stat.valor}
                  <progress value={stat.valor} max="200"></progress>
                </li>
              ))}
            </ul>
            <p>Cadena Evolutiva:</p>
              <ul>
                {product.pokemonAttributes.cadena_evoluciones.map((evolucion, index) => (
                  <li key={index}>
                 <Link to={`/product/${evolucion.especie.charAt(0).toUpperCase() + evolucion.especie.slice(1)}`}>{evolucion.especie.charAt(0).toUpperCase() + evolucion.especie.slice(1)}</Link> Nivel: {evolucion.nivel === null ? 0 : evolucion.nivel}
                  </li>
                ))}
              </ul><p>Peso: {product.pokemonAttributes.peso} kg</p>
            <p>Altura: {product.pokemonAttributes.altura} m</p>
            <p>Ratio de captura:{product.pokemonAttributes.ratio_captura}</p>
            <p>Pokemon Legendario: {product.pokemonAttributes.legendario === true ? 'Sí' : 'No'}</p>
            <p>Pokemon Místico: {product.pokemonAttributes.mythical === true ? 'Sí' : 'No'}</p>
            <p>Experiencia Base: {product.pokemonAttributes.base_experience} puntos</p>
          </div>
        )}
      </div>
    <div className='card_likes'>
      {product.likes.length > 0 && <p>Likes: {product.likes.length}</p>}
            {product.reviews.length > 0 && <p>Reviews: {product.reviews.length}</p>}
            {product.likes.length === 0 && product.reviews.length === 0 && <p>Este producto aun no tiene ni likes ni reviews</p>}
            </div>
    </div>
    </>
  );
};

export default ProductDetail;
