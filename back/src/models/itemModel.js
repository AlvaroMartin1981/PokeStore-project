const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  precio: {
    type: mongoose.Schema.Types.Mixed,
    required: true
},
  tipo: {
    type: String,
    required: true
  },
  categoria:{
    type: String,
    required: true
  }
});

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;
