import { createContext, useContext, useState,useEffect } from 'react';

const CardContext = createContext();


const fetchProducts = async () => {
    const response = await fetch('http://localhost:2993'); 
    const data = await response.json();
    return data;
  };

export const CardsProvider = ({ children }) => {
    const [products, setProducts] = useState([]); 


    useEffect(() => {
        const fetchProductData = async () => {
          const productsData = await fetchProducts();
          setProducts(productsData);
        };
        fetchProductData();
      }, [])

      const value = {
        products,
        setProducts, // Function to update product data (if needed)
      };
    
      return (
        <ProductContext.Provider value={value}>
          {children}
        </ProductContext.Provider>
      );
    };
    
    export default ProductProvider;