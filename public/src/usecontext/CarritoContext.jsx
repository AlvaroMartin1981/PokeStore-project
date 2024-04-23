import { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      const storedCarrito = localStorage.getItem('carrito');
      return storedCarrito ? JSON.parse(storedCarrito) : [];
    } catch (error) {
      console.error('Error al recuperar el carrito del localStorage:', error);
      return [];
    }
  });

  const añadir = (producto) => {
    let productosEnCarrito = carrito.find((p) => p.id === producto.id);

    if (!productosEnCarrito) {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    } else {
      productosEnCarrito.cantidad += 1;
      const index = carrito.indexOf(productosEnCarrito);
      const nuevoCarrito = [...carrito];
      nuevoCarrito[index] = productosEnCarrito;
      setCarrito(nuevoCarrito);
    }
  };

  const eliminar = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const guardarCarritoLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  };

  useEffect(() => {
    guardarCarritoLocalStorage();
  }, [carrito]);

  return (
    <CarritoContext.Provider value={{ carrito, añadir, eliminar, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};
