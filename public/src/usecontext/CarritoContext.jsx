import { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [mensaje, setMensaje] = useState('');
  const [carrito, setCarrito] = useState(() => {
    try {
      const storedCarrito = localStorage.getItem('carrito');
      return storedCarrito ? JSON.parse(storedCarrito) : [];
    } catch (error) {
      return [];
    }
  });

  const añadir = (producto) => {
    let productosEnCarrito = carrito.find((p) => p.id === producto.id_pokedex);
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
    const productoEliminado = carrito.find((producto) => producto.id === id);
    setCarrito(carrito.filter((producto) => producto.id !== id));
    if (productoEliminado) {
      setMensaje(`Has eliminado ${productoEliminado.nombre} del carrito.`);
    }
  };

  const ajustarCantidad = (id, cantidad) => {
    const nuevoCarrito = carrito.map((producto) => {
      if (producto.id_pokedex === id) {
        return { ...producto, cantidad: Math.max(cantidad, 1) }; // Asegurar que la cantidad no sea menor que 1
      }
      return producto;
    });
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setMensaje('Has vaciado el carrito.');
  };

  const guardarCarritoLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  };

  useEffect(() => {
    guardarCarritoLocalStorage();
  }, [carrito]);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  return (
    <CarritoContext.Provider value={{ carrito, añadir, eliminar, ajustarCantidad, vaciarCarrito, mensaje }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
