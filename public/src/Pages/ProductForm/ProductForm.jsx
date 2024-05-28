// ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = ({ isEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        imagen: '',
        precio: '',
        categoria: 'Pokemon',
        tipo: [],
        id_pokedex: '',
        peso: '',
        altura: '',
        estadisticas: [],
        legendario: false,
        mythical: false,
        habilidades: [],
        ratio_captura: '',
        base_experience: '',
        cadena_evoluciones: [],
        evolucionDe: '',
        reviews: [],
        likes: [],
    });

    useEffect(() => {
        if (isEdit && id) {
            axios.get(`/api/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the product!", error);
                });
        }
    }, [isEdit, id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setProduct({ ...product, [name]: checked });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            axios.put(`/api/products/${id}`, product)
                .then(response => {
                    navigate(`/products/${id}`);
                })
                .catch(error => {
                    console.error("There was an error updating the product!", error);
                });
        } else {
            axios.post('/api/products', product)
                .then(response => {
                    navigate(`/products/${response.data._id}`);
                })
                .catch(error => {
                    console.error("There was an error creating the product!", error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={product.nombre}
                    onChange={handleChange}
                    required
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
                <label>Categoría:</label>
                <select
                    name="categoria"
                    value={product.categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="Pokemon">Pokemon</option>
                    <option value="Item">Item</option>
                </select>
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
            {/* Añadir otros campos según sea necesario */}
            <button type="submit">{isEdit ? 'Actualizar Producto' : 'Crear Producto'}</button>
        </form>
    );
};

export default ProductForm;
