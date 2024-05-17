const ProductoModel= require('../models/Producto')

function calcularStar(rating, likesCount) {
    // Calcula el promedio ponderado
    const promedio = rating / likesCount;

    // Asegúrate de que star esté dentro del rango del 1 al 5
    return Math.min(Math.max(promedio, 1), 5);
}

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
    async insertComment(req, res) {
        try {
            const product = await ProductoModel.findById(req.params.id);
            const { userId, comment, rating, username } = req.body;
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
    
            // Crea el nuevo comentario con el nombre del usuario (o un nombre de usuario predeterminado si no se proporciona)
            let newReview = {
                userId,
                comment,
                username,
                rating
            };
            product.reviews.push(newReview);
    
            // Incrementa el contador de likes
            product.likes[0].likesCount += 1;
            product.likes[0].likes += rating;
    
            // Calcula el nuevo valor de star basado en rating y likesCount
            const valor = calcularStar(rating, product.likes[0].likesCount);
    
            // Asigna el nuevo valor de star al producto
            product.likes[0].star = valor;
    
            // Guarda los cambios en la base de datos
            await product.save();
            res.json(product);
        } catch (error) {
            // Si ocurre un error, envía una respuesta de error con el mensaje de error
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