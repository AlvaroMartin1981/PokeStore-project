const itemModel= require('../../models/itemModel');

async function  itemsTipo (req, res){
    const categoria = req.params.categoria;
    console.log(categoria);
    try {
        // Buscar items por categoría en la base de datos
        const items = await itemModel.find({ categoria: categoria });
        console.log(items)
        res.json(items);
      } catch (error) {
        console.error('Error al obtener items por categoría:', error);
        res.status(500).json({ error: 'Error al obtener items por categoría' });
      }
    }
    ;
  module.exports =itemsTipo