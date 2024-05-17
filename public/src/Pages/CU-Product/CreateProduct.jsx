import React from 'react';
import ProductForm from '../../Componentes/Forms/ProductForm/ProductFrom';
import axios from 'axios';

const CreateProduct = () => {
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('/api/productos', formData);
      console.log('Producto creado:', response.data);
      // Manejar la respuesta, por ejemplo, redireccionar a otra página
    } catch (error) {
      console.error('Error al crear el producto:', error);
      // Manejar el error de alguna manera (mostrar un mensaje de error, etc.)
    }
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateProduct;
