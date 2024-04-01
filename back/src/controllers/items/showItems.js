const itemModel= require('../../models/itemModel');

 async function  showItems (req, res){
    try {
      const items = await itemModel.find();
        res.json(items)
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener todos los items' });
    }
  }

module.exports =showItems