import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, productToEdit }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [precio, setPrecio] = useState('');
  const [idPokedex, setIdPokedex] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [estadisticas, setEstadisticas] = useState([]);
  const [legendario, setLegendario] = useState(false);
  const [mythical, setMythical] = useState(false);
  const [habilidades, setHabilidades] = useState([]);
  const [ratioCaptura, setRatioCaptura] = useState('');
  const [baseExperience, setBaseExperience] = useState('');
  const [cadenaEvoluciones, setCadenaEvoluciones] = useState([]);
  const [evolucionDe, setEvolucionDe] = useState('');
  
  useEffect(() => {
    if (productToEdit) {
      setNombre(productToEdit.nombre);
      setDescripcion(productToEdit.descripcion);
      setImagen(productToEdit.imagen);
      setPrecio(productToEdit.precio);
      setIdPokedex(productToEdit.id_pokedex);
      setPeso(productToEdit.peso);
      setAltura(productToEdit.altura);
      setEstadisticas(productToEdit.estadisticas || []);
      setLegendario(productToEdit.legendario || false);
      setMythical(productToEdit.mythical || false);
      setHabilidades(productToEdit.habilidades || []);
      setRatioCaptura(productToEdit.ratio_captura);
      setBaseExperience(productToEdit.base_experience);
      setCadenaEvoluciones(productToEdit.cadena_evoluciones || []);
      setEvolucionDe(productToEdit.evolucionDe || '');
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombre,
      descripcion,
      imagen,
      precio,
      id_pokedex: idPokedex,
      peso,
      altura,
      estadisticas,
      legendario,
      mythical,
      habilidades,
      ratio_captura: ratioCaptura,
      base_experience: baseExperience,
      cadena_evoluciones: cadenaEvoluciones,
      evolucionDe,
    });
    // Limpia los campos después de enviar el formulario
    setNombre('');
    setDescripcion('');
    setImagen('');
    setPrecio('');
    setIdPokedex('');
    setPeso('');
    setAltura('');
    setEstadisticas([]);
    setLegendario(false);
    setMythical(false);
    setHabilidades([]);
    setRatioCaptura('');
    setBaseExperience('');
    setCadenaEvoluciones([]);
    setEvolucionDe('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>
      <label>
        Descripción:
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </label>
      <label>
        Imagen:
        <input
          type="text"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          required
        />
      </label>
      <label>
        Precio:
        <input
          type="text"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
      </label>
      {/* Agrega los campos restantes aquí */}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ProductForm;
