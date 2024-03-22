const PokemonModel= require('../models/PokemonModel');

 async function  showProducts (req, res){
    try {
      const TodosPokemon = await PokemonModel.find();
        res.json(TodosPokemon)
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener todos los pokemons' });
    }
  }

module.exports =showProducts