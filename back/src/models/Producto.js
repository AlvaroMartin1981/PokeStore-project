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
    tipo: [{
        type:String,
    enum:["Planta",
    "Veneno",
    "Fuego",
    "Volador",
    "Agua",
    "Bicho",
    "Normal",
    "Electrico",
    "Tierra",
    "Hada",
    "Lucha",
    "Psíquico",
    "Roca",
    "Acero",
    "Hielo",
    "Fantasma",
    "Dragón", 
    "Siniestro"]}],
    id_pokedex: {
        type:Number,
        required: true,
        unique: true
    },
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
    reviews: [{
        userId: { 
            type: ObjectId,
             ref: 'User' 
            },
        comment: String,
        username: String,
        rating:Number
    }],
    likes: [{ 
        likes: { 
            type: Number,
             default: 0
            },
        likesCount: {
            type: Number,
            default: 0
     },
        star:{
            type: Number,
            default: 0
        }}],
     }, { timestamps: true });

ProductSchema.index({
    nombre: "text",
});


const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;