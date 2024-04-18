const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ProductSchema = new mongoose.Schema({
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
    precio: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    // Atributos específicos de cada tipo de producto
    // Para diferenciar entre Pokeball, Pokemon e Item
    pokemonAttributes: {
        // Atributos específicos de Pokémon
        tipo: [String],
        peso: Number,
        altura: Number,
        estadisticas: [
            {
                nombre: String,
                valor: Number,
            },
        ],
        id_pokedex: Number,
        legendario: Boolean,
        mythical: Boolean,
        habilidades: [
            {
                nombre: String,
                descripcion: String,
            },
        ],
        ratio_captura: Number,
        base_experience: Number,
        cadena_evoluciones: [
            {
                especie: String,
                nivel: Number,
            },
        ],
        evolucionDe: String,
    },
    pokeballAttributes: {
        // Atributos específicos de Pokeball
        // No hay atributos adicionales en este caso
    },
    itemAttributes: {
        // Atributos específicos de Item
        // No hay atributos adicionales en este caso
    },
    reviews: [{
        userId: { type: ObjectId, ref: 'User' },
        comment: String
    }],
    likes: [{ type: ObjectId }],
}, { timestamps: true });

ProductSchema.index({
    nombre: "text",
});

// Crear el modelo de producto
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
