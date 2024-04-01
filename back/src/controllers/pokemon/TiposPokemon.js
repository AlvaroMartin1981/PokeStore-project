const PokemonModel= require('../../models/PokemonModel');

async function  pokeTipo (req, res){
    let tipos = req.params.tipo;
    tipos = tipos.toUpperCase(); 
    try {
        const tiposPokemon = await PokemonModel.find({ tipo: { $in: [tipos] } });
        res.json(tiposPokemon)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Error al obtener todos los pokemons de ${tipos}` });
    }
  }
  module.exports =pokeTipo