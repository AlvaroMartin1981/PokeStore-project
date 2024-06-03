import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductForm.css'; // Importa las CSS aquí

const ProductForm = ({ isEdit }) => {
    const { nombre } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        imagen: '',
        precio: '',
        tipo: [],
        id_pokedex: '',
        peso: '',
        altura: '',
        estadisticas: [
            { nombre: 'hp', valor: '' },
            { nombre: 'attack', valor: '' },
            { nombre: 'defense', valor: '' },
            { nombre: 'special-attack', valor: '' },
            { nombre: 'special-defense', valor: '' },
            { nombre: 'speed', valor: '' },
        ],
        legendario: false,
        mythical: false,
        habilidades: [],
        ratio_captura: '',
        base_experience: '',
        cadena_evoluciones: [],
        evolucionDe: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [maxIdPokedex, setMaxIdPokedex] = useState(null);

    useEffect(() => {
        const fetchMaxIdPokedex = async () => {
            try {
                const response = await fetch('http://localhost:2999/productos');
                const data = await response.json();
                const maxId = Math.max(...data.map(product => product.id_pokedex));
                setMaxIdPokedex(maxId);
                setLoading(false);
            } catch (error) {
                console.error("Hubo un error al obtener el producto!", error);
                setLoading(false);
            }
        };

        fetchMaxIdPokedex();

        if (isEdit && nombre) {
            fetch(`http://localhost:2999/productos/nombre/${nombre}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Producto no encontrado');
                    }
                    return response.json();
                })
                .then(data => {
                    setProduct({
                        nombre: data.nombre || '',
                        descripcion: data.descripcion || '',
                        imagen: data.imagen || '',
                        precio: data.precio || '',
                        tipo: data.tipo || [],
                        id_pokedex: data.id_pokedex || '',
                        peso: data.peso || '',
                        altura: data.altura || '',
                        estadisticas: data.estadisticas.map(est => ({ nombre: est.nombre, valor: est.valor })) || [],
                        legendario: data.legendario || false,
                        mythical: data.mythical || false,
                        habilidades: data.habilidades || [],
                        ratio_captura: data.ratio_captura || '',
                        base_experience: data.base_experience || '',
                        cadena_evoluciones: data.cadena_evoluciones || [],
                        evolucionDe: data.evolucionDe || ''
                    });
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Hubo un error al obtener el producto!", error);
                    setLoading(false);
                });
        }
    }, [isEdit, nombre]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setProduct({ ...product, [name]: checked });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleAddHabilidad = () => {
        setProduct({
            ...product,
            habilidades: [...product.habilidades, { nombre: '', descripcion: '' }]
        });
    };

    const handleHabilidadChange = (index, field, value) => {
        const updatedHabilidades = product.habilidades.map((habilidad, i) =>
            i === index ? { ...habilidad, [field]: value } : habilidad
        );
        setProduct({ ...product, habilidades: updatedHabilidades });
    };

    const handleEstadisticaChange = (index, value) => {
        const updatedEstadisticas = product.estadisticas.map((estadistica, i) =>
            i === index ? { ...estadistica, valor: value } : estadistica
        );
        setProduct({ ...product, estadisticas: updatedEstadisticas });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product.id_pokedex <= maxIdPokedex) {
            setError(`El id_pokedex debe ser superior a ${maxIdPokedex}`);
            return;
        }

        const url = isEdit ? `http://localhost:2999/productos/edit/${nombre}` : 'http://localhost:2999/productos/crear';
        const method = isEdit ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const data = await response.json();
            if (isEdit) {
                navigate(`http://localhost:5173/productos/${nombre}`);
            } else {
                navigate(`http://localhost:5173/productos/${data.nombre}`);
            }
        } catch (error) {
            console.error("Hubo un error al procesar el producto!", error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="product-form">
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={product.nombre}
                    onChange={handleChange}
                    required
                    disabled={isEdit}
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    value={product.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Imagen:</label>
                <input
                    type="text"
                    name="imagen"
                    value={product.imagen}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
    <label>Id_pokedex</label>
    <input 
        type="number"
        name="id_pokedex" 
        value={product.id_pokedex} 
        onChange={handleChange}
        required
    />
</div>
            <div>
                <label>Precio:</label>
                <input
                    type="text"
                    name="precio"
                    value={product.precio}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Peso:</label>
                <input
                    type="number"
                    name="peso"
                    value={product.peso}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Altura:</label>
                <input
                    type="number"
                    name="altura"
                    value={product.altura}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Legendario:</label>
                <input
                    type="checkbox"
                    name="legendario"
                    checked={product.legendario}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Mythical:</label>
                <input
                    type="checkbox"
                    name="mythical"
                    checked={product.mythical}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Habilidades:</label>
                {product.habilidades.map((habilidad, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name={`habilidad-nombre-${index}`}
                            placeholder="Nombre de la habilidad"
                            value={habilidad.nombre}
                            onChange={(e) => handleHabilidadChange(index, 'nombre', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name={`habilidad-descripcion-${index}`}
                            placeholder="Descripción de la habilidad"
                            value={habilidad.descripcion}
                            onChange={(e) => handleHabilidadChange(index, 'descripcion', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddHabilidad}>Añadir Habilidad</button>
            </div>
            <div>
                <label>Estadísticas:</label>
                {product.estadisticas.map((estadistica, index) => (
                    <div key={index}>
                        <label>{estadistica.nombre}:</label>
                        <input
                            type="number"
                            value={estadistica.valor}
                            onChange={(e) => handleEstadisticaChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}
            </div>
            <div>
                <label>Ratio de Captura:</label>
                <input
                    type="number"
                    name="ratio_captura"
                    value={product.ratio_captura}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Base Experience:</label>
                <input
                    type="number"
                    name="base_experience"
                    value={product.base_experience}
                    onChange={handleChange}
                    required
                />
            </div>

            {error && <div className="error">{error}</div>}
            <button type="submit">{isEdit ? 'Actualizar Producto' : 'Crear Producto'}</button>
        </form>
        </>
    );
};

export default ProductForm;
