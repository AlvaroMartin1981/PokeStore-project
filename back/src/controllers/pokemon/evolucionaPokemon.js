const PokemonModel = require('../../models/PokemonModel');

async function obtenerPokemonConEvolucion(req, res) {
  try {
    // Buscar los Pokémon que tienen cadena de evolución con más de un paso
    const pokemonConEvolucion = await PokemonModel.find({ 'cadena_evoluciones': { $exists: true, $not: { $size: 1 } } });

    // Devolver la lista de Pokémon con evolución
    res.json(pokemonConEvolucion);
  } catch (error) {
    console.error('Error al obtener los Pokémon con evolución:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = obtenerPokemonConEvolucion;
