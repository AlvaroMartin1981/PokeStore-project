import {useEffect,useState}from 'react';
import ProductForm from '../../Componentes/Forms/ProductForm/ProductFrom';
import axios from 'axios';

const UpdateProduct = ({ productId }) => {
  const [productToEdit, setProductToEdit] = useState(null);

 useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/productos/${productId}`);
        setProductToEdit(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        // Manejar el error de alguna manera (mostrar un mensaje de error, etc.)
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.put(`/api/productos/${productId}/editar`, formData);
      console.log('Producto actualizado:', response.data);
      // Manejar la respuesta, por ejemplo, redireccionar a otra página
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      // Manejar el error de alguna manera (mostrar un mensaje de error, etc.)
    }
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      {productToEdit && <ProductForm onSubmit={handleSubmit} productToEdit={productToEdit} />}
    </div>
  );
};

export default UpdateProduct;
