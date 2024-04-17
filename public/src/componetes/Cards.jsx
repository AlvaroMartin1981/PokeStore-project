import React from 'react';

const Cards = ({ products }) => {
  // Verificar si los productos son undefined o null
  if (!products) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className="projects__container container grid"> {/* Cambié 'class' por 'className' */}
      {products.map((product) => (
        <article key={product._id} className="projects__card"> {/* Agregué una 'key' única y cambié 'class' por 'className' */}
          <div className="projects__image"> {/* Cambié 'class' por 'className' */}
            <img src={product.imagen} alt={product.nombre} className="projects__img" width='150px'/> {/* Usé datos de 'product' para la URL de la imagen */}
          </div>
          <div className="projects__content"> {/* Cambié 'class' por 'className' */}
            <h2 className="projects__title">{product.nombre}</h2> {/* Usé datos de 'product' para el título */}
            <p className="projects__description">{product.descripcion}</p> {/* Usé datos de 'product' para la descripción */}
          </div>
        </article>
      ))}
    </div>
  );
};

export default Cards;

