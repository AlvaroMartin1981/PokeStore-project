const itemModel= require('../../models/itemModel');

const  ItemsUnico ={

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
    }
}

module.exports = ItemsUnico;
