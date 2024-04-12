const itemModel= require('../models/ItemModel');

const  itemController ={

    async itemsId(req, res) {
        try {
        const ItemsId = req.params.ItemsId ;
        const items = await itemModel.findById(ItemsId );
console.log(items)
        if (!items) {
            return res.status(404).json({ error: 'Item no encontrado' });
        }
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle del ITems' });
    }
    },

    async  itemsPorNombre(req, res) {
        try {
            let nombre = req.params.nombre;
            const items = await itemModel.findOne({ nombre });
    
            if (!items) {
                return res.status(404).json({ error: 'items no encontrado' });
            }
    
            res.json(items);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el detalle del items' });
        }
    },
    async  showItems (req, res){
        try {
          const items = await itemModel.find();
            res.json(items)
         
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al obtener todos los items' });
        }
    },  
    async itemsTipo (req, res){
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

}

module.exports = itemController;
