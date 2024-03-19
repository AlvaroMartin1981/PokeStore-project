const mongoose = require('mongoose');


// Definir el esquema para el modelo de Pokémon
const PokemonSchema = new Schema({
    nombre: { 
        type: String,
         required: true 
        },
    tipo: [
        { type: String,
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
    descripcion: String,
    estadisticas: {
        type: Map,
        of: {
            nombre: String,
            valor: Number
        }
    },
    id_pokedex: Number,
    legendario: { 
        type: Boolean, 
        default: false 
    },
    base_experience: Number,
    habilidad: String,
    precio:Number
});

// Crear el modelo de Pokémon
const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
