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
    categoria: {
        type: String,
        enum: ["Pokemon", "Item"],
        required: true
    }, 
    tipo: [String],
    id: Number,
    pokemonAttributes: {
        peso: Number,
        altura: Number,
        estadisticas: [
            {
                nombre: String,
                valor: Number,
            },
        ],
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

    reviews: [{
        userId: { type: ObjectId, ref: 'User' },
        comment: String,
        name: String
    }],
    likes: [{ type: ObjectId }],
}, { timestamps: true });

ProductSchema.index({
    nombre: "text",
});


const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;