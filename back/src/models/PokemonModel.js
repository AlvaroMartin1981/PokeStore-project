const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: [String],
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
  altura: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  estadisticas: {
    type: [
      {
        nombre: String,
        valor: Number,
      },
    ],
    required: true,
  },
  id_pokedex: {
    type: Number,
    required: true,
  },
  legendario: {
    type: Boolean,
    required: true,
  },
  mythical: {
    type: Boolean,
    required: true,
  },
  habilidades: {
    type: [
      {
        nombre: String,
        descripcion: String,
      },
    ],
    required: true,
  },
  ratio_captura: {
    type: Number,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  base_experience: {
    type: Number,
  },
  cadena_evoluciones: {
    type: [
      {
        especie: String,
        nivel: Number,
      },
    ],
  },
  categoria:{
    type: String,
    required: true
  },
  evolucionDe: String,
});


// Crear el modelo de Pokémon
const PokemonModel = mongoose.model('Pokemon', PokemonSchema);

module.exports = PokemonModel;

