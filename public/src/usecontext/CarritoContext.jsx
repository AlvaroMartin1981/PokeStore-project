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
    let productosEnCarrito = carrito.find((p) => p.id === producto.id_pokedex);

    if (!productosEnCarrito) {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      setMensaje(`Has añadido ${producto.nombre} al carrito.`);
    } else {
      productosEnCarrito.cantidad += 1;
      const index = carrito.indexOf(productosEnCarrito);
      const nuevoCarrito = [...carrito];
      nuevoCarrito[index] = productosEnCarrito;
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
      if (producto.id === id) {
        return { ...producto, cantidad: Math.max(1, cantidad) }; // Asegurar que la cantidad no sea menor que 1
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

  // Opcional: Limpiar el mensaje después de un tiempo
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

export const useCarrito = () => {
  return useContext(CarritoContext);
};
