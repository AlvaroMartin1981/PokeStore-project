const mongoose = require('mongoose');

const PokeballSchema = new mongoose.Schema({
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
    }
});

const PokeballModel = mongoose.model('Pokeball', PokeballSchema);

module.exports = PokeballModel;
