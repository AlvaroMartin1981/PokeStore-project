const ProductoModel = require('../models/Producto');

function calcularStar(rating, likesCount) {
    const promedio = rating / likesCount;
    return Math.min(Math.max(promedio, 1), 5);
}

const productController = {
    async getAll(req, res) {
        try {
            const products = await ProductoModel.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    async getProductsByName(req, res) {
        try {
            const nombre = req.params.nombre;
            const product = await ProductoModel.findOne({ nombre: new RegExp(`^${nombre}$`, 'i') });
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const nombre = req.params.nombre;
            const product = await ProductoModel.findOneAndUpdate({ nombre: new RegExp(`^${nombre}$`, 'i') }, req.body, { new: true });
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const nombre = req.params.nombre;
            const product = await ProductoModel.findOneAndDelete({ nombre: new RegExp(`^${nombre}$`, 'i') });
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async insertComment(req, res) {
        try {
            const nombre = req.params.nombre;
            const product = await ProductoModel.findOne({ nombre: new RegExp(`^${nombre}$`, 'i') });
            const { userId, comment, rating, username } = req.body;
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            let newReview = {
                userId,
                comment,
                username,
                rating
            };
            product.reviews.push(newReview);

            product.likes[0].likesCount += 1;
            product.likes[0].likes += rating;

            const valor = calcularStar(product.likes[0].likes, product.likes[0].likesCount);

            product.likes[0].star = valor;

            await product.save();

            res.json(newReview);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

        async create(req, res) {
            try {
                const {
                    nombre,
                    descripcion,
                    imagen,
                    precio,
                    tipo,
                    id_pokedex,
                    peso,
                    altura,
                    estadisticas,
                    legendario,
                    mythical,
                    habilidades,
                    ratio_captura,
                    base_experience
                } = req.body;

                const newProduct = {
                    nombre,
                    descripcion,
                    imagen,
                    precio,
                    tipo,
                    id_pokedex,
                    peso,
                    altura,
                    estadisticas,
                    legendario,
                    mythical,
                    habilidades,
                    ratio_captura,
                    likes: [{ likes: 0, likesCount: 0 }],
                    base_experience
                };
                 await ProductoModel.create(newProduct)
                 console.log(newProduct)
                 const products = await ProductoModel.find();
            res.json(products);
            } catch (error) {
                res.status(500).json({ error: error.message });
                console.log(error)
            }
        }
    };

module.exports = productController;
