import React, { createContext, useContext, useEffect, useState } from 'react';

// Creamos el contexto
const ProductContext = createContext();

// Creamos el componente proveedor que almacenará los productos separados por categoría
export const ProductProvider = ({ children }) => {
  const [productsByCategory, setProductsByCategory] = useState({});


  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:2999/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      const filteredProductsByCategory = {
        pokemons: data[0], // Suponiendo que los datos de los pokemons están en la primera posición
        pokeballs: data[1],
        items: data[2],
        // Añadir más categorías si es necesario
      };
      setProductsByCategory(filteredProductsByCategory);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={productsByCategory}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de productos
export const useProducts = () => useContext(ProductContext);
