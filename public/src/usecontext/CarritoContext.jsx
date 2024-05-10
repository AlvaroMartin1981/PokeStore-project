import { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {

  const [carrito, setCarrito] = useState(() => {
    try {
      const storedCarrito = localStorage.getItem('carrito');
      return storedCarrito ? JSON.parse(storedCarrito) : [];
    } catch (error) {
      return [];
    }
  });

  const [mensaje, setMensaje] = useState('');
  const añadir = (producto) => {
    let productosEnCarrito = carrito.find((p) => p.id === producto.id);

    if (!productosEnCarrito) {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      setMensaje(`Has añadido ${producto.nombre} al carrito.`);
    } else {
      productosEnCarrito.cantidad += 1;
      const index = carrito.indexOf(productosEnCarrito);
      const nuevoCarrito = [...carrito];
      nuevoCarrito[index] = productosEnCarrito;
      setCarrito(nuevoCarrito);
      setMensaje(`Has añadido un ${producto.nombre} más al carrito.`);
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
    <CarritoContext.Provider value={{ carrito, añadir, eliminar, vaciarCarrito,mensaje }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};
