const PokeBallModel= require('../models/PokeBallModel');

 async function showPokeballs (req, res){
    try {
      const TodasPokeBall = await PokeBallModel.find();
        res.json(TodasPokeBall)
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener todos los pokemons' });
    }
  }

module.exports = showPokeballs