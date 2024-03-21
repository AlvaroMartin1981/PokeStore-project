const mongoose = require('mongoose');


// Definir el esquema para el modelo de Pokémon
const PokemonSchema = new mongoose.Schema({
    nombre: { 
        type: String,
         required: true 
        },

    tipo: [{
         type: String
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
        descripcion:String
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
    ratio_captura:Number,
    base_experience: Number,
    precio:Number
});

// Crear el modelo de Pokémon
const PokemonModel = mongoose.model('Pokemon', PokemonSchema);

module.exports = PokemonModel;

