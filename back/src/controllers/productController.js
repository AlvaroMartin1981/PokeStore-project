const ProductModel = require('../models/productoModel');


const productController = {
    // Obtener todos los productos
    getAll: async (req, res) => {
        try {
            const products = await ProductModel.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un producto por su ID
    getById: async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Buscar productos por nombre
    getProductsByName: async (req, res) => {
        try {
            const { nombre } = req.query;
            const products = await ProductModel.find({ nombre: new RegExp(nombre, 'i') });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Editar un producto
    edit: async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            // Realizar las modificaciones necesarias en el producto
            // Aquí puedes actualizar los campos que necesites
            // Por ejemplo:
            product.nombre = req.body.nombre;
            product.descripcion = req.body.descripcion;
            // Guardar los cambios
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un producto
    update: async (req, res) => {
        try {
            const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un producto
    delete: async (req, res) => {
        try {
            const product = await ProductModel.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Insertar un comentario en un producto
    insertComment: async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            // Aquí puedes añadir la lógica para insertar un comentario en el producto
            // Por ejemplo:
            product.reviews.push({ userId: req.body.userId, comment: req.body.comment });
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Dar "Me gusta" a un producto
    like: async (req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            // Aquí puedes añadir la lógica para incrementar el contador de "Me gusta"
            // Por ejemplo:
            product.likes.push(req.body.userId);
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un producto
    create: async (req, res) => {
        try {
            const { nombre, descripcion, imagen, precio, tipo, categoria, pokemonAttributes, pokeballAttributes, itemAttributes } = req.body;
            const newProduct = new ProductModel({
                nombre,
                descripcion,
                imagen,
                precio,
                tipo,
                categoria,
                pokemonAttributes,
                pokeballAttributes,
                itemAttributes
            });
            await newProduct.save();
            res.json(newProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = productController;