const PokeBallModel= require('../models/PokeBallModel')

async function pokemonID(req,res){
    const pokeballID = req.params.pokeballID;
    try {
        const pokeball = await PokeBallModel.findById(pokeballID)
        console.log(pokeball)
        if (!pokeball) {
          return res.status(404).json({ error: 'Pokeball no encontrada' })
        }
        res.json(pokeball)
    
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al obtener el detalle del producto' })
      }
}

module.exports=pokemonID