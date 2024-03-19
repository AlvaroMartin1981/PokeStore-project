const mongoose = require('mongoose');

// Definimos el modelo de producto
const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    tipo: {
        type: [String],
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
        required: true
    },
    talla: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});



// Crear el modelo de Producto
const Product = mongoose.model('Product', productSchema);

//exportamos el modelo de Producto
module.exports = Product;