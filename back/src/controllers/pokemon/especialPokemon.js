const PokemonModel = require('../../models/PokemonModel');

const pokemonEspecial ={
    
    async obtenerLegendarios (req, res){
        try {
            const legendarios = await PokemonModel.find({ legendario: true });
            res.json(legendarios);
        } catch (error) {
            console.error('Error al obtener Pokémon legendarios:', error);
            res.status(500).json({ error: 'Error al obtener Pokémon legendarios' });
        }
    },
    async obtenerMísticos (req, res){
        try {
          const místicos = await PokemonModel.find({ mythical: true });
          res.json(místicos);
        } catch (error) {
          console.error('Error al obtener Pokémon míticos:', error);
          res.status(500).json({ error: 'Error al obtener Pokémon míticos' });
        }
      }

}

module.exports= pokemonEspecial