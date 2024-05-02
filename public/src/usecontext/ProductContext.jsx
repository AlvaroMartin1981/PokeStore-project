import { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true)
  

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:2999/productos');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      const filteredPokemon = data.filter(product => product.categoria === 'Pokemon');
      const filteredItems = data.filter(product => product.categoria === 'Item');

      setPokemon(filteredPokemon);
      setItems(filteredItems);
      setProducts(data)
      } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, pokemon, items }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);