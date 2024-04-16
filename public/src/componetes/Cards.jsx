import {Link} from 'react-router-dom'

const Cards = ({ products }) => {
  // Verificar si los productos son undefined o null
  if (!products) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className='container'>
      {products.map((product) => (
        <div className="card" key={product._id}>
          <h2>{product.nombre}</h2>
          <img src={product.imagen} alt={product.nombre} />
          <p>{product.precio}</p>
          {/* Mostrar otras propiedades del producto según sea necesario */}
        </div>
      ))}
    </div>
  );
};

export default Cards;
