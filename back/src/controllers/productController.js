const ProductoModel= require('../models/Producto')

const productController = {
    // Obtener todos los productos
   async getAll  (req, res){
        try {
            const products = await ProductoModel.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un producto por su ID
    async getById  (req, res){
        try {
            const product = await ProductoModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Buscar productos por nombre
   async getProductsByName  (req, res){
        try {
            let nombre = req.params.nombre;
            nombre = new RegExp('^' + nombre + '$', 'i');
            const pokemon = await ProductoModel.findOne({ nombre });
            res.json(pokemon);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Editar un producto
    async edit (req, res) {
        try {
            const product = await ProductoModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            product.nombre = req.body.nombre;
            product.descripcion = req.body.descripcion;
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un producto
   async update  (req, res){
        try {
            const product = await ProductoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un producto
    async delete  (req, res) {
        try {
            const product = await ProductoModel.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Insertar un comentario en un producto
    async insertComment  (req, res){
        try {
            const product = await ProductoModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            product.reviews.push({ userId: req.body.userId, comment: req.body.comment,name:req.body.name });
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Dar "Me gusta" a un producto
    async like  (req, res){
        try {
            const product = await ProductoModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            product.likes.push(req.body.userId);
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un producto
    async create (req, res) {
        try {
            const { nombre, descripcion, imagen, precio, tipo, categoria, pokemonAttributes, pokeballAttributes, itemAttributes } = req.body;
            const newProduct = new ProductoModel({
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