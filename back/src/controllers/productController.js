const itemModel= require('../models/itemModel');
const PokemonModel = require('../models/PokemonModel');
const PokeBallModel= require('../models/PokeBallModel')

const productController=  {

    async obtenerProduct(req,res){
        try{
            const TodosPokemon = await PokemonModel.find();
            const TodasPokeBall = await PokeBallModel.find();
            const items = await itemModel.find();
            const productos =TodosPokemon + TodasPokeBall + items 
            res.json(productos)
        }  catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener todos los productos' });
          }
    }
}
module.exports = productController;
