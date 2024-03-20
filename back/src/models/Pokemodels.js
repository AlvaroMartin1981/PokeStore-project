const mongoose = require('mongoose');


// Definir el esquema para el modelo de Pokémon
const PokemonSchema = new Schema({
    nombre: { 
        type: String,
         required: true 
        },
    tipo: [{
         type: String,
        enum: ['Normal', 'Fuego', 'Agua', 'Planta', 'Eléctrico', 'Hielo', 'Lucha', 'Veneno', 'Tierra',
        'Volador', 'Psíquico', 'Bicho', 'Roca', 'Fantasma', 'Dragón', 'Siniestro', 'Acero', 'Hada']
        }],
    peso: {
        type: Number,
        required: true 
    },
    altura: { 
        type: Number,
         required: true 
        },
    imagen:{
        type:String,
        required:true
    },
    habilidades: [{
        nombre: String,
        descripcion:String,
        required:true
    }],
    descripcion: String,
    estadisticas: [{
            nombre: String,
            valor: Number
        }],
    id_pokedex: Number,
    legendario: { 
        type: Boolean, 
        default: false 
    },
    mythical: { 
        type: Boolean, 
        default: false 
    },
    base_experience: Number,
    precio:Number
});

// Crear el modelo de Pokémon
const PokemonModel = mongoose.model('Pokemon', PokemonSchema);

module.exports = PokemonModel;